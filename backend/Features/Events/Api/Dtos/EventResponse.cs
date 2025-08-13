namespace backend.Features.Events.Api.Dtos;

public record EventResponse(
    long Id,
    string Name,
    string StartsAt,
    string Location,
    string? AdditionalInfo,
    List<EventAttendeeResponse>? Attendees = null
);