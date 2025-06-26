using System.ComponentModel.DataAnnotations;

namespace BudgetPlannerApplication_2025.Models
{
    public class Role
    {
        [Key]
        public int UniqueId { get; set; }
        public string RoleName { get; set; } = string.Empty;
    }
}
