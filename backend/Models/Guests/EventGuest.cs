using backend.Models.Events;
using backend.Models.People;

namespace backend.Models.Guests;

public class EventGuest
{
    public long EventId { get; set; }
    public Event Event { get; set; } = default!;
    
    public long PersonId { get; set; }
    public Person Person { get; set; } = default!;
    
    public string PaymentMethod { get; set; } = default!;
    public string? AdditionalInfo { get; set; }
}