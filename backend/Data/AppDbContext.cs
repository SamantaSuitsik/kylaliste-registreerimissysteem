using backend.Domain.Events;

namespace backend.Data;
using Microsoft.EntityFrameworkCore;
public class AppDbContext(DbContextOptions<AppDbContext> options): DbContext(options)
{
    public DbSet<Event> Events => Set<Event>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        var e = b.Entity<Event>();
        e.HasKey(e => e.Id);
        e.Property(x => x.Name).IsRequired();
        e.Property(x => x.StartsAt).IsRequired();
        e.Property(x => x.Location).IsRequired();
        e.Property(x => x.AdditionalInfo);
        e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
    }
}