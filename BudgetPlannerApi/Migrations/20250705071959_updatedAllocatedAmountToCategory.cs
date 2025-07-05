using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetPlannerApi.Migrations
{
    /// <inheritdoc />
    public partial class updatedAllocatedAmountToCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishLists_AppUsers_UserId",
                table: "WishLists");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "WishLists",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedDate",
                table: "WishLists",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Expenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedDate",
                table: "Expenses",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AllocatedAmount",
                table: "Categories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "BudgetPlans",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedDate",
                table: "BudgetPlans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "UniqueId",
                keyValue: 1,
                column: "AllocatedAmount",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "UniqueId",
                keyValue: 2,
                column: "AllocatedAmount",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "UniqueId",
                keyValue: 3,
                column: "AllocatedAmount",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "UniqueId",
                keyValue: 4,
                column: "AllocatedAmount",
                value: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_WishLists_AppUsers_UserId",
                table: "WishLists",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "UniqueId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishLists_AppUsers_UserId",
                table: "WishLists");

            migrationBuilder.DropColumn(
                name: "LastUpdatedDate",
                table: "WishLists");

            migrationBuilder.DropColumn(
                name: "LastUpdatedDate",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "AllocatedAmount",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "LastUpdatedDate",
                table: "BudgetPlans");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "WishLists",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Expenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "BudgetPlans",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WishLists_AppUsers_UserId",
                table: "WishLists",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "UniqueId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
