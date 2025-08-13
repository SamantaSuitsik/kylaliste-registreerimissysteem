using backend.Features.Events.Models;
using backend.Models.Events;

namespace backend.Features.Attendees.Models;

public class Attendee
{
    public long Id { get; set; }
    public List<EventAttendee> EventLinks { get; set; } = [];
}