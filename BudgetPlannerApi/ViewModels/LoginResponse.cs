using BudgetPlannerApi.DB.Models.User;

namespace Bpst.API.ViewModels
{
    public class LoginResponse
    {
        public List<Roles>? userRoles; 
 
        public bool IsLoginSuccess { get; set; }
        public string Token { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public List<string>? ErrorMessages { get; set; }
        public string FName { get; set; } = string.Empty;
        public string LName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string FullName => $"{FName} {LName}";
         public DateTime IssuedAt { get;   set; }
    }
}
