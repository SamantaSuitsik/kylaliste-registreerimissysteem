namespace backend.Features.Attendees.Api.Dtos;

public class AddAttendeeRequest
{
    public string EventId { get; set; }
    public string Kind { get; set; }
    public string? PersonFirstName { get; set; }
    public string? PersonLastName { get; set; }
    public string? CompanyName { get; set; }
    public string? PersonalIdentificationNumber { get; set; }
    public string? RegistrationNumber { get; set; }
    public int? NumberOfGuests { get; set; }
    public string PaymentMethod { get; set; }
    public string? AdditionalInfo { get; set; }
}