namespace BudgetPlannerApplication_2025.EFDataBase.Appointment.EF
{
    using BudgetPlannerApplication_2025.Models;
    using Microsoft.EntityFrameworkCore;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<BudgetPlan> BudgetPlans { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<WishList> WishLists { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Role> Roles { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Role>().HasData(
       new Role { UniqueId = 1, RoleName = "Admin" },
       new Role { UniqueId = 2, RoleName = "User" }
   );

            // Disable cascade delete on BudgetPlan → Category
            modelBuilder.Entity<BudgetPlan>()
                .HasOne(bp => bp.Category)
                .WithMany()
                .HasForeignKey(bp => bp.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Disable cascade delete on BudgetPlan → AppUser
            modelBuilder.Entity<BudgetPlan>()
                .HasOne(bp => bp.AppUser)
                .WithMany()
                .HasForeignKey(bp => bp.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Disable cascade delete on Category → AppUser
            modelBuilder.Entity<Category>()
                .HasOne(c => c.AppUser)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
