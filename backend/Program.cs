using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var conn = Environment.GetEnvironmentVariable("ConnectionStrings__Default")
    ?? builder.Configuration.GetConnectionString("Default")
    ?? throw new InvalidOperationException("Missing DB connection string");

builder.Services.AddDbContext<AppDbContext>(o => o.UseNpgsql(conn));
builder.Services.AddControllers();
builder.Services.AddCors(o => o.AddPolicy("spa",
    p => p.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
}

app.UseCors("spa");
app.MapControllers();
app.Run();
