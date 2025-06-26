using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BudgetPlannerApplication_2025.EFDataBase.Appointment.EF;
using BudgetPlannerApplication_2025.Models;

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

        // GET: api/Expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            return await _context.Expenses.ToListAsync();
        }

        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);

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
            else
            {
                // Update existing expense
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
        }


        // DELETE: api/Expenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
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
