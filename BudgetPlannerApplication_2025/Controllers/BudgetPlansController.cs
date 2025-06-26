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
    public class BudgetPlansController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BudgetPlansController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/BudgetPlans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BudgetPlan>>> GetBudgetPlans()
        {
            return await _context.BudgetPlans.ToListAsync();
        }

        // GET: api/BudgetPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BudgetPlan>> GetBudgetPlan(int id)
        {
            var budgetPlan = await _context.BudgetPlans.FindAsync(id);

            if (budgetPlan == null)
            {
                return NotFound();
            }

            return budgetPlan;
        }

        [HttpPost("CreateOrEdit")]
        public async Task<IActionResult> CreateOrEditBudgetPlan(BudgetPlan budgetPlan)
        {
            if (budgetPlan == null)
                return BadRequest("Invalid data.");

            var existingPlan = await _context.BudgetPlans
                .AsNoTracking()
                .FirstOrDefaultAsync(b => b.UniqueId == budgetPlan.UniqueId);

            if (existingPlan == null)
            {
                // Add new
                _context.BudgetPlans.Add(budgetPlan);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetBudgetPlan), new { id = budgetPlan.UniqueId }, budgetPlan);
            }
            else
            {
                // Update existing
                _context.Entry(budgetPlan).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BudgetPlanExists(budgetPlan.UniqueId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return Ok(budgetPlan);
            }
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudgetPlan(int id)
        {
            var budgetPlan = await _context.BudgetPlans.FindAsync(id);
            if (budgetPlan == null)
            {
                return NotFound();
            }

            _context.BudgetPlans.Remove(budgetPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BudgetPlanExists(int id)
        {
            return _context.BudgetPlans.Any(e => e.UniqueId == id);
        }
    }
}
