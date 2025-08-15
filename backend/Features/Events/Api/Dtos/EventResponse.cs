namespace backend.Features.Events.Api.Dtos;

public record EventResponse(
    long Id,
    string Name,
    DateTimeOffset StartsAt,
    string Location,
    string? AdditionalInfo,
    List<EventAttendeeResponse>? Attendees = null
);