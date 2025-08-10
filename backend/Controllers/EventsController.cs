using backend.Data;
using backend.Domain.Events;
using backend.Models;
using backend.Models.Events;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private  AppDbContext dbContext;

    public EventsController(AppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetAllEvents()
    {
        var allEvents = dbContext.Events
            .Select(e => new EventDto(
                e.Id,
                e.Name,
                e.StartsAt.ToString("yyyy-MM-dd"),
                e.AdditionalInfo,
                e.Location
            ))
            .ToList();
        return Ok(allEvents);
    }

    [HttpPost]
    public IActionResult AddEvent(AddEventDto addEventDto)
    {
        var eventEntity = new Event()
        {
            Name = addEventDto.Name,
            Location = addEventDto.Location,
            StartsAt = addEventDto.StartsAt,
            AdditionalInfo = addEventDto.AdditionalInfo,
        };
        
        dbContext.Events.Add(eventEntity);
        dbContext.SaveChanges();
        
        return Ok(eventEntity);
    }
}