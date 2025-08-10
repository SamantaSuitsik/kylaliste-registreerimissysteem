namespace backend.Models.Events;

public class EventDto
{
    public EventDto(long id, string name, string startsAt, string? additionalInfo, string location)
    {
        Id = id;
        Name = name;
        StartsAt = startsAt;
        AdditionalInfo = additionalInfo;
        Location = location;
    }
    public long Id { get; set; }
    public string Name { get; set; } = default!;
    public string StartsAt { get; set; }
    public string? AdditionalInfo { get; set; }
    public string Location { get; set; } = default!;
}