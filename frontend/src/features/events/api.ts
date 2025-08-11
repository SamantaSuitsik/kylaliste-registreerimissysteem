import type {AddEventRequest, EventDetails, EventItem} from "@/features/events/types.ts";
const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export async function fetchEvents(): Promise<EventItem[]> {
    const res = await fetch(`${BASE}/api/events`);
    if (!res.ok) throw new Error(`Failed to load events: ${res.status}`);
    return await res.json() as Promise<EventItem[]>;
}

export async function createEvent(payload: AddEventRequest): Promise<EventItem> {
    const res = await fetch(`${BASE}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to create event: ${res.status}`);
    return res.json();
}

export async function fetchEvent(id: string): Promise<EventDetails> {
    const res = await fetch(`${BASE}/api/events/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch event: ${res.status}`);
    return res.json();
}
