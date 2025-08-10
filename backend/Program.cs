var builder = WebApplication.CreateBuilder(args);
var app = WebApplication.Create();

app.MapGet("/api/events", () => new[] {
    new { id = 1, title = "Demo Event", time = DateTimeOffset.UtcNow.AddDays(1) }
});

app.Run();;