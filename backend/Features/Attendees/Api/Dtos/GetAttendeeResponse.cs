using backend.Features.Attendees.Models;

namespace backend.Features.Attendees.Api.Dtos;

public class GetAttendeeResponse
{
    public long Id { get; set; }
    public AttendeeType Kind { get; set; }
    public string? PersonFirstName { get; set; }
    public string? PersonLastName { get; set; }
    public string? CompanyName { get; set; }
    public string? PersonalIdentificationNumber { get; set; }
    public string? RegistrationNumber { get; set; }
    public int? NumberOfAttendees { get; set; }
    public PaymentMethod PaymentMethod { get; set; }
    public string? AdditionalInfo { get; set; }
}
