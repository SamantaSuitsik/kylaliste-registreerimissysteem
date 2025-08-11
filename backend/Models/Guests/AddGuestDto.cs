namespace backend.Models.Guests;

public class AddGuestDto
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string PersonalIdentificationNumber { get; set; } = default!;
    public string PaymentMethod { get; set; } = default!;
    public string? AdditionalInfo { get; set; }
}