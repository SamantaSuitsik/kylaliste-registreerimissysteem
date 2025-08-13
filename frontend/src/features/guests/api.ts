import type {AddAttendeeRequest, EventAttendeeResponse} from "@/features/guests/types.ts";
const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export async function addAttendee(eventId: string, payload: AddAttendeeRequest): Promise<EventAttendeeResponse> {
    const res = await fetch(`${BASE}/api/attendees/${eventId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to create event: ${res.status}`);
    return res.json();
}
