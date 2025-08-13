namespace backend.Models.Events;

public record CreateEventRequest(
    string Name,
    DateTimeOffset StartsAt,
    string Location,
    string? AdditionalInfo
);