
using BudgetPlannerApplication_2025.Models;
using BudgetPlannerApplication_2025.EFDataBase.Appointment.EF;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BudgetPlannerApplication_2025.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController(AppDbContext context, IConfiguration config) : ControllerBase
{
    private readonly AppDbContext _context = context;
    private readonly IConfiguration _config = config;
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(AppUser request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (await _context.AppUsers.AnyAsync(u => u.Email == request.Email))
            return BadRequest("Email is already registered.");

        var user = new AppUser
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber ?? string.Empty,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender ?? string.Empty,
            CreatedDate = DateTime.UtcNow,
            LastUpdatedDate = DateTime.UtcNow,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        _context.AppUsers.Add(user);
        await _context.SaveChangesAsync();
        // ✅ Add roles if provided
        if (request.RoleIds != null && request.RoleIds.Any())
        {
            // Fetch valid role IDs from Role table
            var validRoleIds = _context.Roles
    .Where(r => request.RoleIds.Contains(r.UniqueId))
    .Select(r => r.UniqueId)
    .ToList();


            foreach (var roleId in validRoleIds)
            {
                var userRole = new UserRole
                {
                    UserId = user.UniqueId,
                    RoleId = roleId
                };
                _context.UserRoles.Add(userRole);
            }
            await _context.SaveChangesAsync();
        }




        return Ok(new { Message = "User registered successfully" });
    }







    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        var user = _context.AppUsers.SingleOrDefault(u => u.Email == request.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        var token = GenerateJwtToken(user);

        return Ok(new LoginResponse { IsSuccess = true, Token = token });
    }

    private string GenerateJwtToken(AppUser user)
    {
        var userClaims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.UniqueId.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim("FullName", user.FullName)
    };

        // ✅ Fetch role names for this user, including Role navigation property
        var roleNames = _context.UserRoles
            .Where(ur => ur.UserId == user.UniqueId)
            .Include(ur => ur.Role)
            .Select(ur => ur.Role!.RoleName)
            .ToList();

        // ✅ Add role claims
        foreach (var roleName in roleNames)
        {
            userClaims.Add(new Claim(ClaimTypes.Role, roleName));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["JwtSettings:Issuer"],
            audience: _config["JwtSettings:Audience"],
            claims: userClaims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }




    [Authorize]
    [HttpGet("roles")]
    public IActionResult GetMyRoles()
    {
        // Get the logged-in user's ID from JWT claims
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized("User ID not found in token");

        if (!int.TryParse(userIdClaim.Value, out int userId))
            return BadRequest("Invalid user ID in token");

        // Fetch roles linked to this user from DB
        var roles = _context.UserRoles
            .Where(ur => ur.UserId == userId)
            .Include(ur => ur.Role)
            .Select(ur => new
            {
                ur.Role.UniqueId,
                ur.Role.RoleName
            })
            .ToList();

        return Ok(roles);
    }


}
