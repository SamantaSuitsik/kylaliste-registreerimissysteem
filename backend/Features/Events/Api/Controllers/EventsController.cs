using backend.Data;
using backend.Features.Companies.Models;
using backend.Features.Events.Api.Dtos;
using backend.Features.People;
using backend.Models.Events;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Events.Api.Controllers;

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
            .Select(e => new EventResponse(
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
    public IActionResult AddEvent(CreateEventRequest createEventRequest)
    {
        var eventEntity = new Event()
        {
            Name = createEventRequest.Name,
            Location = createEventRequest.Location,
            StartsAt = createEventRequest.StartsAt,
            AdditionalInfo = createEventRequest.AdditionalInfo,
        };
        
        dbContext.Events.Add(eventEntity);
        dbContext.SaveChanges();
        
        return Ok(eventEntity);
    }

    [HttpGet("{eventId:long}")]
    public IActionResult GetEventById(long eventId)
    {
        var eventData = dbContext.Events
            .Include(e => e.Attendees)
            .ThenInclude(a => a.Attendee)
            .Where(e => e.Id == eventId)
            .Select(e => new
            {
                e.Id,
                e.Name,
                e.StartsAt,
                e.Location,
                e.AdditionalInfo,
                Attendees = e.Attendees.Select(ea => new
                {
                    ea.AttendeeId,
                    ea.Attendee,
                    ea.PaymentMethod,
                    ea.AdditionalInfo
                }).ToList()
            }).SingleOrDefault();

        if (eventData is null)
        {
            return NotFound($"Event with id {eventId} not found");
        }

        var eventResponse = new EventResponse(
            eventData.Id,
            eventData.Name,
            eventData.StartsAt.ToString("dd-MM-yyyy"),
            eventData.Location,
            eventData.AdditionalInfo,
            eventData.Attendees.Select(ea =>
                new EventAttendeeResponse(
                    ea.AttendeeId,
                    ea.Attendee is Person ? "Person" : "Company",
                    ea.Attendee is Person p ? p.FirstName + " " + p.LastName : ((Company)ea.Attendee).Name,
                    ea.Attendee is Person pe ? pe.PersonalIdentificationNumber : null,
                    ea.Attendee is Company c ? c.RegistrationNumber : null,
                    ea.PaymentMethod,
                    ea.AdditionalInfo
                )
            ).ToList()
        );

        return Ok(eventResponse);
    }
}