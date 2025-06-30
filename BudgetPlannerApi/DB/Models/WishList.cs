
using BudgetPlannerApi.DB.Models.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetPlannerApplication_2025.Models
{
    public class WishList
    {
        [Key]
        public int UniqueId { get; set; }
        [Required]
        public string Item { get; set; }
        public string URl { get; set; }
        public string Purpose { get; set; }
        // Foreign key property
        public int UserId { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        public AppUser? AppUser { get; set; }
    }
}
