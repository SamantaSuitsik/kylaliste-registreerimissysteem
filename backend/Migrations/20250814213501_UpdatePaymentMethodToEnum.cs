using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePaymentMethodToEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaymentMethodNew",
                table: "EventAttendees",
                type: "integer",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.Sql(@"
            UPDATE ""EventAttendees"" 
            SET ""PaymentMethodNew"" = 
                CASE 
                    WHEN ""PaymentMethod"" = 'Pangaülekanne' THEN 1
                    WHEN ""PaymentMethod"" = 'Sularaha' THEN 2
                    ELSE 1
                END
            ");

            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "EventAttendees");

            migrationBuilder.RenameColumn(
                name: "PaymentMethodNew",
                newName: "PaymentMethod",
                table: "EventAttendees");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PaymentMethod",
                table: "EventAttendees",
                type: "text",
                nullable: false,
                defaultValue: "Pangaülekanne");
        }
    }
}
