
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using BudgetPlannerApplication_2025.Models;
using Bpst.API.DB;

namespace BudgetPlannerApplication_2025.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WishListsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/WishLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishList>>> GetWishLists()
        {
            return await _context.WishLists.ToListAsync();
        }

        // GET: api/WishLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WishList>> GetWishList(int id)
        {
            var wishList = await _context.WishLists.FindAsync(id);

            if (wishList == null)
            {
                return NotFound();
            }

            return wishList;
        }


        [HttpPost("CreateOrEdit")]
        public async Task<IActionResult> CreateOrEditWishList(WishList wishList)
        {
            if (wishList == null)
                return BadRequest("Invalid wish list data.");

            var existingWishList = await _context.WishLists
                .AsNoTracking()
                .FirstOrDefaultAsync(w => w.UniqueId == wishList.UniqueId);

            if (existingWishList == null)
            {
                // Add new wish list item
                _context.WishLists.Add(wishList);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetWishList), new { id = wishList.UniqueId }, wishList);
            }
            else
            {
                // Update existing wish list item
                _context.Entry(wishList).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!WishListExists(wishList.UniqueId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return Ok(wishList);
            }
        }


        // DELETE: api/WishLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishList(int id)
        {
            var wishList = await _context.WishLists.FindAsync(id);
            if (wishList == null)
            {
                return NotFound();
            }

            _context.WishLists.Remove(wishList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WishListExists(int id)
        {
            return _context.WishLists.Any(e => e.UniqueId == id);
        }
    }
}
