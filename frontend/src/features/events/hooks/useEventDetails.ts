import {useEffect, useState} from "react";
import type {EventDetails} from "@/features/events/types.ts";
import {fetchEvent} from "@/features/events/api.ts";

export function useEventDetails(id: string | undefined) {
    const [event, setEvent] = useState<EventDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchEvent(id)
            .then(setEvent)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    return { event, loading, error };
}
