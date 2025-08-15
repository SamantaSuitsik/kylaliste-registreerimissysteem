import type {EventItem} from "@/features/events/types.ts";

export function useSeparatedEvents(events: EventItem[]) {
    const now = new Date();
    const pastEvents = events.filter((event) => event.startsAt < now);
    const futureEvents = events.filter((event) => event.startsAt > now);
    return {
        pastEvents,
        futureEvents
    }
}
