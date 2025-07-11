using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetPlannerApi.Migrations
{
    /// <inheritdoc />
    public partial class updateddata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Purpose",
                table: "WishLists");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "WishLists",
                newName: "Description");

            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "WishLists",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "WishLists");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "WishLists",
                newName: "Url");

            migrationBuilder.AddColumn<string>(
                name: "Purpose",
                table: "WishLists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
