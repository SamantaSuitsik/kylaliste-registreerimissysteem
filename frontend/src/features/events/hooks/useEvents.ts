import { fetchEvents } from "@/features/events/api.ts";
import {useEffect, useState} from "react";
import type {EventItem} from "@/features/events/types.ts";

export function useEvents() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        fetchEvents()
            .then(setEvents)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { events, loading, error };
}
