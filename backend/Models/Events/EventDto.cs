using backend.Models.Guests;

namespace backend.Models.Events;

public record EventDto(
    long Id,
    string Name,
    string StartsAt,
    string Location,
    string? AdditionalInfo,
    List<EventGuestDto>? Guests = null
);