using backend.Features.Attendees.Models;

namespace backend.Features.Companies.Models;

public class Company : Attendee
{
    public string Name { get; set; } = default!;
    public string RegistrationNumber { get; set; } = default!;
    public int NumberOfGuests { get; set; } = default!;
}