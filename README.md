# Külaliste registreerimissüsteem

Külaliste registreerimissüsteemis on võimalik luua üritusi ning neid hallata. Üritustele saab lisada erinevat tüüpi osalejaid - eraisikuid või ettevõtteid. Selleks on loodud andmebaasi tabelid ürituste (Events), eraisikute (Persons) ja ettevõtete (Companies) jaoks. Kuna mõlemad on osavõtjad, on neil ka ülemtabel nimega Attendees. Ürituste ja osavõtjate vahel on mitu-mitmele seos. Seda aitab luua tabel nimega EventAttendees. 

Andmebaasiga suhtluseks tehakse tabelitele päringuid kontrolleritest EventsController.cs ja AttendeesController.cs. Kontrollerite otspunktidele saadab päringuid kasutajaliides.

### Juhised käivitamiseks

1. `cp .env.sample .env`
2. `docker compose up --build`

### Andmebaasi diagramm
<img width="1242" height="720" alt="Screenshot 2025-08-15 at 23 14 44" src="https://github.com/user-attachments/assets/b9b73794-e3eb-4b45-a37c-bfeceefcdcf6" />

