using BudgetPlannerApi.DB.Models.User;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BudgetPlannerApi.DB.Models
{
    public class IncomeSource
    {
       [Key]
       public int UniqueId { get; set; }
        public int? UserId { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        [JsonIgnore]
        public AppUser? AppUser { get; set; }
        public string IncomeSourceName { get; set; } = string.Empty;
        public string OtherIncomeSource { get; set; } = string.Empty;
        public decimal? IncomeAmount { get; set; }
        public DateTime? ExpenseDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
    }
}
