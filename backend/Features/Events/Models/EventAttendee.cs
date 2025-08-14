using backend.Features.Attendees.Models;
using backend.Models.Events;

namespace backend.Features.Events.Models;

public class EventAttendee
{
    public long EventId { get; set; }
    public Event Event { get; set; } = null!;
    public long AttendeeId { get; set; }
    public Attendee Attendee { get; set; } = null!;
    public PaymentMethod PaymentMethod { get; set; } = default!;
    public string? AdditionalInfo { get; set; }
}