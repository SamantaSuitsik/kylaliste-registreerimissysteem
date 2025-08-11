using backend.Models.Guests;

namespace backend.Models.People;

public class Person
{
    public long Id { get; set; }
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string PersonalIdentificationNumber { get; set; } = default!;
    public List<EventGuest> EventLinks { get; set; } = [];
}