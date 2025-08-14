import type {AttendeeRequest, EventAttendeeResponse, GetAttendeeResponse} from "@/features/attendees/types.ts";
const BASE = 'http://localhost:5050';

export async function AddAttendee(eventId: string, payload: AttendeeRequest): Promise<EventAttendeeResponse> {
    const res = await fetch(`${BASE}/api/attendees/${eventId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to create event: ${res.status}`);
    return res.json();
}

export async function GetAttendee(attendeeId: string): Promise<GetAttendeeResponse> {
    const res = await fetch(`${BASE}/api/attendees/${attendeeId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Failed to get attendee: ${res.status}`);
    return res.json();
}

export async function EditAttendee(attendeeId: string, payload: AttendeeRequest): Promise<void> {
    const res = await fetch(`${BASE}/api/attendees/${attendeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to update attendee: ${res.status}`);
}

export async function DeleteAttendee(attendeeId: string): Promise<void> {
    const res = await fetch(`${BASE}/api/attendees/${attendeeId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Failed to delete attendee: ${res.status}`);
}
