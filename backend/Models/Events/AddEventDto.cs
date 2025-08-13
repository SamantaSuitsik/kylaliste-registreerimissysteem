namespace backend.Models.Events;

public record AddEventDto(
    string Name,
    DateTimeOffset StartsAt,
    string Location,
    string? AdditionalInfo
);