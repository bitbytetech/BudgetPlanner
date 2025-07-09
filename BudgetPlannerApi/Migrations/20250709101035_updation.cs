using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetPlannerApi.Migrations
{
    /// <inheritdoc />
    public partial class updation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "URl",
                table: "WishLists",
                newName: "Url");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "WishLists",
                newName: "URl");
        }
    }
}
