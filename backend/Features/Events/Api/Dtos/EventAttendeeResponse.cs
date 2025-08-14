using backend.Features.Attendees.Models;

namespace backend.Features.Events.Api.Dtos;

public record EventAttendeeResponse(
    long AttendeeId,
    AttendeeType Kind,
    string Name,
    string? PersonalIdentificationNumber,
    string? RegistrationNumber,
    PaymentMethod PaymentMethod,
    string? AdditionalInfo
);    