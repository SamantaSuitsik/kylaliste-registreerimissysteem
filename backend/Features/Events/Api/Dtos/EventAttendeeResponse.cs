namespace backend.Features.Events.Api.Dtos;

public record EventAttendeeResponse(
    long AttendeeId,
    string Kind,
    string Name,
    string? PersonalIdentificationNumber,
    string? RegistrationNumber,
    string PaymentMethod,
    string? AdditionalInfo
);    