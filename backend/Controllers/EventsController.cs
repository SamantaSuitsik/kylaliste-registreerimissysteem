using backend.Data;
using backend.Models.Events;
using backend.Models.Guests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private AppDbContext dbContext;

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
                e.StartsAt.ToString("dd-MM-yyyy"),
                e.Location,
                e.AdditionalInfo,
                null
            )).ToList();
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

    [HttpGet("{eventId}")]
    public IActionResult GetEventById(long eventId)
    {
        var dto = dbContext.Events
            .Include(e => e.Guests)
            .ThenInclude(g => g.Person)
            .Where(e => e.Id == eventId)
            .Select(e => new EventDto(
                e.Id,
                e.Name,
                e.StartsAt.ToString("dd-MM-yyyy"),
                e.Location,
                e.AdditionalInfo,
                e.Guests.Select(g => new EventGuestDto(
                    g.PersonId,
                    g.Person.FirstName,
                    g.Person.LastName,
                    g.Person.PersonalIdentificationNumber,
                    g.PaymentMethod,
                    g.AdditionalInfo)
                ).ToList())
            ).SingleOrDefault();

        if (dto is null)
        {
            return NotFound($"Event with id {eventId} not found");
        }
        return Ok(dto);
    }
}