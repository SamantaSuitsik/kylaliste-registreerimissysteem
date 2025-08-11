namespace backend.Models.Guests;

public record EventGuestDto(
    long PersonId,
    string FirstName,
    string LastName,
    string PersonalIdentificationNumber,
    string PaymentMethod,
    string? AdditionalInfo
);