using backend.Features.Attendees.Models;
using backend.Features.Companies.Models;
using backend.Features.Events.Models;
using backend.Features.People;
using backend.Models.Events;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
public class AppDbContext(DbContextOptions<AppDbContext> options): DbContext(options)
{
    public DbSet<Event> Events => Set<Event>();
    public DbSet<Person> Persons => Set<Person>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Attendee> Attendees => Set<Attendee>(); 
    public DbSet<EventAttendee> EventAttendees => Set<EventAttendee>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        var e = b.Entity<Event>();
        e.HasKey(x => x.Id);
        e.Property(x => x.Name).IsRequired();
        e.Property(x => x.StartsAt).IsRequired();
        e.Property(x => x.Location).IsRequired();
        e.Property(x => x.AdditionalInfo);
        e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
        
        var a = b.Entity<Attendee>();
        a.HasKey(x => x.Id);
        a.HasDiscriminator<string>("AttendeeType")
            .HasValue<Person>("Person")
            .HasValue<Company>("Company");
        
        var p = b.Entity<Person>();
        p.Property(x => x.FirstName).IsRequired();
        p.Property(x => x.LastName).IsRequired();
        p.Property(x => x.PersonalIdentificationNumber).IsRequired();
        p.HasIndex(x => x.PersonalIdentificationNumber).IsUnique();

        var c = b.Entity<Company>();
        c.Property(x => x.Name).IsRequired();
        c.Property(x => x.RegistrationNumber).IsRequired();
        c.HasIndex(x => x.RegistrationNumber).IsUnique();
        c.Property(x => x.NumberOfGuests).IsRequired();

        var ea = b.Entity<EventAttendee>();
        ea.HasKey(x => new { x.EventId, x.AttendeeId });
        ea.Property(x => x.PaymentMethod);
        ea.Property(x => x.AdditionalInfo);
        ea.HasOne(x => x.Event)
            .WithMany(x => x.Attendees)
            .HasForeignKey(x => x.EventId)
            .OnDelete(DeleteBehavior.Cascade);
        ea.HasOne(x => x.Attendee)
            .WithMany(x => x.EventLinks)
            .HasForeignKey(x => x.AttendeeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
}