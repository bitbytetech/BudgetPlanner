using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
 using BudgetPlannerApplication_2025.Models;
using Bpst.API.DB;

namespace BudgetPlannerApplication_2025.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpensesController(AppDbContext context)
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
        // GET: api/Expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            var userId = GetLoggedInUserId();

            return await _context.Expenses.Where(c => c.UserId.Equals(userId)).ToListAsync();
        }

        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var userId = GetLoggedInUserId();
            var expense = await _context.Expenses.Where(c => c.UserId == userId).FirstOrDefaultAsync();

            if (expense == null)
            {
                return NotFound();
            }

            return expense;
        }


        [HttpPost("CreateOrEdit")]
        public async Task<IActionResult> CreateOrEditExpense(Expense expense)
        {
            if (expense == null)
                return BadRequest("Invalid expense data.");

            var userId = GetLoggedInUserId();
            if (userId == null)
                return Unauthorized("User ID not found in token.");
            expense.UserId = userId;
            var existingExpense = await _context.Expenses
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.UniqueId == expense.UniqueId);

            if (existingExpense == null)
            {
                // Add new expense
                _context.Expenses.Add(expense);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetExpense), new { id = expense.UniqueId }, expense);
            }
            else if (userId == existingExpense.UserId)
            {
                expense.LastUpdatedDate = DateTime.UtcNow;
                _context.Entry(expense).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ExpenseExists(expense.UniqueId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return Ok(expense);
            }
            else
            {
                return Forbid("You do not have permission to edit this expense ");
            }
        }


        //// DELETE: api/Expenses/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteExpense(int id)
        //{
        //    var expense = await _context.Expenses.FindAsync(id);
        //    if (expense == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Expenses.Remove(expense);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishList(int id)
        {
            var userId = GetLoggedInUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var expense = await _context.Expenses
                .FirstOrDefaultAsync(w => w.UniqueId == id && w.UserId == userId);

            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool ExpenseExists(int id)
        {
            return _context.Expenses.Any(e => e.UniqueId == id);
        }
    }
}
