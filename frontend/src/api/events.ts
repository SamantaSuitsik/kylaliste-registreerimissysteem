import type {AddEventRequest, EventItem} from "@/features/avaleht/types.ts";
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
