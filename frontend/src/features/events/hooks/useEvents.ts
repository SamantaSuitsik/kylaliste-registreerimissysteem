import { fetchEvents } from "@/features/events/api.ts";
import {useEffect, useState} from "react";
import type {EventItem} from "@/features/events/types.ts";

export function useEvents() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();

    const fetchEventsData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchEvents();
            setEvents(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventsData();
    }, []);

    return { events, loading, error, refetch: fetchEventsData };
}
