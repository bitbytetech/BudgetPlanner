
using BudgetPlannerApi.DB.Models.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetPlannerApplication_2025.Models
{
    public class Expense
    {
        [Key]
        public int UniqueId { get; set; }
        // Foreign key property
        public int? UserId { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        public AppUser? AppUser { get; set; }
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

    }
}
