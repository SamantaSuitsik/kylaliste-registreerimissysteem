namespace backend.Models.Guests;

public record EventGuestDto(
    long PersonId,
    string FirstName,
    string LastName,
    string PersonalIdentificationNumber,
    string Paymentmethod,
    string? AdditionalInfo
);