using backend.Data;
using backend.Models.Guests;
using backend.Models.People;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GuestsController: ControllerBase
{
    private AppDbContext dbContext;

    public GuestsController(AppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost("{eventId}")]
    public IActionResult AddGuest(long eventId, AddGuestDto addGuestDto)
    {
        var eventExists = dbContext.Events.Any(e => e.Id == eventId);
        if (!eventExists)
        {
            return NotFound($"Event with id {eventId} not found");
        }
        // Todo: validate personal Identification number!
        var person = dbContext.Persons.SingleOrDefault(p =>
            p.PersonalIdentificationNumber == addGuestDto.PersonalIdentificationNumber);

        if (person is null)
        {
            person = new Person
            {
                FirstName = addGuestDto.FirstName,
                LastName = addGuestDto.LastName,
                PersonalIdentificationNumber = addGuestDto.PersonalIdentificationNumber,
            };
            dbContext.Persons.Add(person);
            dbContext.SaveChanges();
        }

        var alreadyLinked = dbContext.EventGuests.Any(x => x.EventId == eventId && x.PersonId == person.Id);
        if (alreadyLinked)
        {
            return Conflict("Person is already added to this event");
        }

        var link = new EventGuest
        {
            EventId = eventId,
            PersonId = person.Id,
            PaymentMethod = addGuestDto.PaymentMethod,
            AdditionalInfo = addGuestDto.AdditionalInfo,
        };
        dbContext.EventGuests.Add(link);
        dbContext.SaveChanges();

        var guestDto = new GuestDto(
            person.Id,
            person.FirstName,
            person.LastName,
            person.PersonalIdentificationNumber,
            link.PaymentMethod,
            link.AdditionalInfo
        );
        return StatusCode(201, guestDto);
    }
}