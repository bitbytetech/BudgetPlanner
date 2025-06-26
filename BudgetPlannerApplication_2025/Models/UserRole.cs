using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BudgetPlannerApplication_2025.Models
{
    public class UserRole
    {
        [Key]
        public int UniqueId { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }

        [ForeignKey("UserId")]
        public AppUser? AppUser { get; set; }

        [ForeignKey("RoleId")]
        public Role? Role { get; set; }

    }
}
