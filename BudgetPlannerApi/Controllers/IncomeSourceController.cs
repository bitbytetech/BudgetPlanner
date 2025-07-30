using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bpst.API.DB;
using BudgetPlannerApi.DB.Models;
using BudgetPlannerApplication_2025.Models;

namespace BudgetPlannerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeSourceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IncomeSourceController(AppDbContext context)
        {
            _context = context;
        }
        private int? GetLoggedInUserId()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                return userId;
            return null;
        }
        // GET: api/IncomeSource
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IncomeSource>>> GetIncomeSource()
        {
            return await _context.IncomeSource.ToListAsync();
        }

        // GET: api/IncomeSource/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IncomeSource>> GetIncomeSource(int id)
        {
            var incomeSource = await _context.IncomeSource.FindAsync(id);

            if (incomeSource == null)
            {
                return NotFound();
            }

            return incomeSource;
        }

        
       


        [HttpPost("CreateOrEdit")]
        public async Task<IActionResult> CreateOrEditIncome(IncomeSource IncomeSource)
        {
            if (IncomeSource == null)
                return BadRequest("Invalid IncomeSource data.");
            else if (IncomeSource.UserId == 0)
                IncomeSource.UserId = null;

            var userId = GetLoggedInUserId();
            if (userId == null)
                return Unauthorized("User ID not found in token.");
            IncomeSource.UserId = userId;

            var existingIncome = await _context.Categories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.UniqueId == IncomeSource.UniqueId);

            if (existingIncome == null)
            {
                IncomeSource.CreatedDate = DateTime.UtcNow;
                _context.IncomeSource.Add(IncomeSource);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetIncomeSource), new { id = IncomeSource.UniqueId }, IncomeSource);
            }
            else if (userId == existingIncome.UserId)
            {
                IncomeSource.LastUpdatedDate = DateTime.UtcNow;
                _context.Entry(IncomeSource).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!IncomeSourceExists(IncomeSource.UniqueId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return Ok(IncomeSource);
            }
            else
            {
                return Forbid("You do not have permission to edit this category.");
            }
        }




























        // DELETE: api/IncomeSource/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncomeSource(int id)
        {
            var incomeSource = await _context.IncomeSource.FindAsync(id);
            if (incomeSource == null)
            {
                return NotFound();
            }

            _context.IncomeSource.Remove(incomeSource);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IncomeSourceExists(int id)
        {
            return _context.IncomeSource.Any(e => e.UniqueId == id);
        }
    }
}
