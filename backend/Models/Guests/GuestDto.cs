namespace backend.Models.Guests;

public class GuestDto
{
    public GuestDto(long personId, string firstName, string lastName, string personalIdentificationNumber, string paymentMethod, string? additionalInfo)
    {
        PersonId = personId;
        FirstName = firstName;
        LastName = lastName;
        PersonalIdentificationNumber = personalIdentificationNumber;
        PaymentMethod = paymentMethod;
        AdditionalInfo = additionalInfo;
        
    }

    public long PersonId { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string PersonalIdentificationNumber { get; set; } = default!;
    public string PaymentMethod { get; set; } = default!;
    public string? AdditionalInfo { get; set; }
}