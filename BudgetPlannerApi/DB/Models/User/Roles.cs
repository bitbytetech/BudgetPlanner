using System.ComponentModel.DataAnnotations;

namespace BudgetPlannerApi.DB.Models.User
{
    public class Roles
    {
        [Key]
        [Display(Name = "Unique ID")]
        public int UniqueId { get; set; }
        public string RoleName { get; set; } = string.Empty;
    }
}
