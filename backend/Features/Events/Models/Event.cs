using backend.Features.Events.Models;

namespace backend.Models.Events;

public class Event
{
    public long Id { get; set; }
    public string Name { get; set; } = default!;
    public DateTimeOffset StartsAt { get; set; }
    public string? AdditionalInfo { get; set; }
    public string Location { get; set; } = default!;
    public DateTimeOffset CreatedAt { get; set; } =  DateTimeOffset.UtcNow;
    public List<EventAttendee> Attendees { get; set; } = [];
}