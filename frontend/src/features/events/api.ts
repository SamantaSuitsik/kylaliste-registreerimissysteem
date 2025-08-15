import type {AddEventRequest, EventDetails, EventItem} from "@/features/events/types.ts";
const BASE = 'http://localhost:5050';


export async function fetchEvents(): Promise<EventItem[]> {
    const res = await fetch(`${BASE}/api/events`);
    if (!res.ok) throw new Error(`Ürituste laadimine ebaõnnestus: ${res.status}`);
    const data = await res.json() as Promise<EventItem[]>;

    const events = (await data).map(event => ({
        id: event.id,
        name: event.name,
        startsAt: new Date(event.startsAt),
        location: event.location,
        additionalInfo: event.additionalInfo
    }));
    return events as EventItem[];
}

export async function createEvent(payload: AddEventRequest): Promise<EventItem> {
    const res = await fetch(`${BASE}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Ürituse loomine ebaõnnestus: ${res.status}`);
    return res.json();
}

export async function fetchEvent(id: string): Promise<EventDetails> {
    const res = await fetch(`${BASE}/api/events/${id}`);
    if (!res.ok) throw new Error(`Üritust ${id} ei leitud: ${res.status}`);
    const data = await res.json() as Promise<EventDetails>;

    const event = {
        id: (await data).id,
        name: (await data).name,
        startsAt: new Date((await data).startsAt),
        location: (await data).location,
        additionalInfo: (await data).additionalInfo,
        attendees: (await data).attendees,
    }
    return event as EventDetails;
}

export async function deleteEvent(id: number): Promise<void> {
    const res = await fetch(`${BASE}/api/events/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error(`Ürituse ${id} kustutamine ebaõnnestus: ${res.status}`);
}
