using backend.Features.Attendees.Models;

namespace backend.Features.Attendees.Api.Dtos;

public class AddAttendeeRequest
{
    public AttendeeType Kind { get; set; }
    public string? PersonFirstName { get; set; }
    public string? PersonLastName { get; set; }
    public string? CompanyName { get; set; }
    public string? PersonalIdentificationNumber { get; set; }
    public string? RegistrationNumber { get; set; }
    public int? NumberOfAttendees { get; set; }
    public string PaymentMethod { get; set; } = default!;
    public string? AdditionalInfo { get; set; }
}