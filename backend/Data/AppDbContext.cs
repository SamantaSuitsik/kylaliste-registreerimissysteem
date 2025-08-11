using backend.Models.Events;
using backend.Models.Guests;
using backend.Models.People;

namespace backend.Data;
using Microsoft.EntityFrameworkCore;
public class AppDbContext(DbContextOptions<AppDbContext> options): DbContext(options)
{
    public DbSet<Event> Events => Set<Event>();
    public DbSet<Person> Persons => Set<Person>();
    public DbSet<EventGuest> EventGuests => Set<EventGuest>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        var e = b.Entity<Event>();
        e.HasKey(x => x.Id);
        e.Property(x => x.Name).IsRequired();
        e.Property(x => x.StartsAt).IsRequired();
        e.Property(x => x.Location).IsRequired();
        e.Property(x => x.AdditionalInfo);
        e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
        
        var p = b.Entity<Person>();
        p.HasKey(x => x.Id);
        p.Property(x => x.FirstName).IsRequired();
        p.Property(x => x.LastName).IsRequired();
        p.Property(x => x.PersonalIdentificationNumber).IsRequired();
        p.HasIndex(x => x.PersonalIdentificationNumber).IsUnique();

        var g = b.Entity<EventGuest>();
        g.HasKey(x => new { x.EventId, x.PersonId });
        g.HasOne(x => x.Event).WithMany(ev => ev.Guests).HasForeignKey(x => x.EventId).OnDelete(DeleteBehavior.Cascade);
        g.HasOne(x => x.Person).WithMany(pe => pe.EventLinks).HasForeignKey(x => x.PersonId).OnDelete(DeleteBehavior.Cascade);

        g.Property(x => x.PaymentMethod).IsRequired();
        g.HasIndex(x => new { x.EventId, x.PersonId }).IsUnique();
    }
}