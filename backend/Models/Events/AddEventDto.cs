namespace backend.Models.Events;

public class AddEventDto
{
    public string Name { get; set; } = default!;
    public DateTimeOffset StartsAt { get; set; }
    public string? AdditionalInfo { get; set; }
    public string Location { get; set; } = default!;
}