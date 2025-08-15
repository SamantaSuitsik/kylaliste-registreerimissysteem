using backend.Data;
using Microsoft.AspNetCore.Mvc;
using backend.Features.Attendees.Models;
using backend.Features.Attendees.Api.Dtos;
using backend.Features.People;
using backend.Features.Companies.Models;
using backend.Features.Events.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
    public IActionResult AddAttendee(long eventId, AttendeeRequest attendeeRequest)
    {
        var existingEvent = dbContext.Events.Find(eventId);
        if (existingEvent is null)
        {
            return NotFound($"Event with id {eventId} not found");
        }
        
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

    [HttpGet("{attendeeId:long}")]
    public IActionResult GetAttendee(long attendeeId)
    {
        var attendee = dbContext.Attendees
            .Include(a => a.EventLinks)
            .ThenInclude(ea => ea.Event)
            .FirstOrDefault(a => a.Id == attendeeId);

        if (attendee is null)
        {
            return NotFound($"Attendee with id {attendeeId} not found");
        }

        var eventAttendee = attendee.EventLinks.FirstOrDefault();
        if (eventAttendee is null)
        {
            return NotFound($"Event attendee relationship not found for attendee {attendeeId}");
        }

        GetAttendeeResponse response;
        if (attendee is Person person)
        {
            response = new GetAttendeeResponse
            {
                Id = attendee.Id,
                Kind = AttendeeType.Person,
                PersonFirstName = person.FirstName,
                PersonLastName = person.LastName,
                PersonalIdentificationNumber = person.PersonalIdentificationNumber,
                PaymentMethod = eventAttendee.PaymentMethod,
                AdditionalInfo = eventAttendee.AdditionalInfo
            };
        }
        else if (attendee is Company company)
        {
            response = new GetAttendeeResponse
            {
                Id = attendee.Id,
                Kind = AttendeeType.Company,
                CompanyName = company.Name,
                RegistrationNumber = company.RegistrationNumber,
                NumberOfAttendees = company.NumberOfGuests,
                PaymentMethod = eventAttendee.PaymentMethod,
                AdditionalInfo = eventAttendee.AdditionalInfo
            };
        }
        else
        {
            return BadRequest("Invalid attendee type");
        }

        return Ok(response);
    }

    [HttpPut("{attendeeId:long}")]
    public IActionResult EditAttendee(long attendeeId, AttendeeRequest editRequest)
    {
        var attendee = dbContext.Attendees
            .Include(a => a.EventLinks)
            .FirstOrDefault(a => a.Id == attendeeId);

        if (attendee is null)
        {
            return NotFound($"Attendee with id {attendeeId} not found");
        }

        var eventAttendee = attendee.EventLinks.FirstOrDefault();
        if (eventAttendee is null)
        {
            return NotFound($"Event attendee relationship not found for attendee {attendeeId}");
        }

        if (editRequest.Kind == AttendeeType.Person)
        {
            if (attendee is not Person person)
            {
                return BadRequest("Cannot change attendee type from Company to Person");
            }

            person.FirstName = editRequest.PersonFirstName!;
            person.LastName = editRequest.PersonLastName!;
            person.PersonalIdentificationNumber = editRequest.PersonalIdentificationNumber!;
        }
        else if (editRequest.Kind == AttendeeType.Company)
        {
            if (attendee is not Company company)
            {
                return BadRequest("Cannot change attendee type from Person to Company");
            }

            company.Name = editRequest.CompanyName!;
            company.RegistrationNumber = editRequest.RegistrationNumber!;
            company.NumberOfGuests = editRequest.NumberOfAttendees!.Value;
        }
        else
        {
            return BadRequest("Invalid attendee kind. Must be 'Person' or 'Company'");
        }

        eventAttendee.PaymentMethod = editRequest.PaymentMethod;
        eventAttendee.AdditionalInfo = editRequest.AdditionalInfo;

        dbContext.SaveChanges();

        return Ok();
    }

    [HttpDelete("{attendeeId:long}")]
    public IActionResult DeleteAttendee(long attendeeId)
    {
        var attendee = dbContext.Attendees
            .Include(a => a.EventLinks)
            .FirstOrDefault(a => a.Id == attendeeId);

        if (attendee is null)
        {
            return NotFound($"Attendee with id {attendeeId} not found");
        }

        var eventAttendee = attendee.EventLinks.FirstOrDefault();
        if (eventAttendee is null)
        {
            return NotFound($"Event attendee relationship not found for attendee {attendeeId}");
        }

        dbContext.EventAttendees.Remove(eventAttendee);
        dbContext.Attendees.Remove(attendee);
        dbContext.SaveChanges();

        return Ok();
    }
}