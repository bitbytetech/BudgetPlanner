
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetPlannerApplication_2025.Models
{
    public class Category
    {
       [Key]
        public int UniqueId { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdatedDate { get; set; }
        // Foreign key property
        public int UserId { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        public AppUser? AppUser { get; set; }

    }
}
