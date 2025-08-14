using backend.Data;
using Microsoft.AspNetCore.Mvc;
using backend.Features.Attendees.Models;
using backend.Features.Attendees.Api.Dtos;
using backend.Features.People;
using backend.Features.Companies.Models;
using backend.Features.Events.Models;

namespace backend.Features.Attendees.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AttendeesController : ControllerBase
{
    private AppDbContext dbContext;

    public AttendeesController(AppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    
    [HttpPost("{eventId:long}")]
    public IActionResult AddAttendee(long eventId, AddAttendeeRequest attendeeRequest)
    {
        var existingEvent = dbContext.Events.Find(eventId);
        if (existingEvent is null)
        {
            return NotFound($"Event with id {eventId} not found");
        }

        // TODO: validate personal identification number!

        
        Attendee attendee;
        if (attendeeRequest.Kind == AttendeeType.Person)
        {
            attendee = new Person
            {
                FirstName = attendeeRequest.PersonFirstName!,
                LastName = attendeeRequest.PersonLastName!,
                PersonalIdentificationNumber = attendeeRequest.PersonalIdentificationNumber!
            };
        }
        else if (attendeeRequest.Kind == AttendeeType.Company)
        {
            attendee = new Company
            {
                Name = attendeeRequest.CompanyName!,
                RegistrationNumber = attendeeRequest.RegistrationNumber!,
                NumberOfGuests = attendeeRequest.NumberOfAttendees!.Value
            };
        }
        else
        {
            return BadRequest("Invalid attendee kind. Must be 'Person' or 'Company'");
        }

        // Create event-attendee relationship
        var eventAttendee = new EventAttendee
        {
            EventId = eventId,
            Attendee = attendee,
            PaymentMethod = attendeeRequest.PaymentMethod,
            AdditionalInfo = attendeeRequest.AdditionalInfo
        };

        dbContext.Attendees.Add(attendee);
        dbContext.EventAttendees.Add(eventAttendee);
        dbContext.SaveChanges();

        return Ok(eventAttendee.AttendeeId);
    }
}