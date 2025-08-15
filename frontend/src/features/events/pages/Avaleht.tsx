import IntroBlock from "@/components/standard/IntroBlock.tsx";
import EventsTable from "@/features/events/components/EventsTable.tsx";
import {useEvents} from "@/features/events/hooks/useEvents.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {deleteEvent} from "@/features/events/api.ts";
import { useState } from "react";
import { useSeparatedEvents } from "../hooks/useSeparatedEvents";

function Avaleht() {
    const { events, error, refetch } = useEvents();
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const { pastEvents, futureEvents } = useSeparatedEvents(events);


    async function handleEventDelete(eventId: number) {
        try {
            setDeleteError(null);
            await deleteEvent(eventId);
            await refetch();
        } catch (err: any) {
            setDeleteError(err.message ?? "ürituse kustutamisel ilmnes viga!");
        }
    }

    if (error || deleteError) return (
        <div>
            <Alert variant="destructive" className="w-fit flex items-center gap-5">
                <AlertTitle>Viga</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        </div>
    );

    return (
        <div>
            <IntroBlock introText={["Lorem ipsum dolor sit ", <strong key="strong1">amet</strong>, ", consectetur adipiscing elit. Sed dapibus, ", <strong key="strong2">felis eget dignissim fermentum </strong>, ", magna massa ", <strong key="strong3">pretium</strong>, " mauris, gravida varius ", <strong key="strong4">nunc sapien </strong>, " at libero. "]}/>
            <div className="flex gap-5 mt-7 flex-grow">
                <div className="flex-1/2">
                    <EventsTable events={futureEvents} hasFutureEvents={true} onEventDelete={handleEventDelete} />
                </div>
                <div className="flex-1/2">
                    <EventsTable events={pastEvents} hasFutureEvents={false} onEventDelete={handleEventDelete} />
                </div>
            </div>
        </div>
    )
}
export default Avaleht;
