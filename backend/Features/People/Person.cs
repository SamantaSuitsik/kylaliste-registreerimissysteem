using backend.Features.Attendees.Models;

namespace backend.Features.People;

public class Person : Attendee
{ 
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string PersonalIdentificationNumber { get; set; } = default!;
}