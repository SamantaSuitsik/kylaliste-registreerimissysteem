import IntroBlock from "@/components/standard/IntroBlock.tsx";
import EventsTable from "@/features/events/components/EventsTable.tsx";
import {Loader} from "lucide-react";
import {useEvents} from "@/features/events/hooks/useEvents.ts";
import {Alert} from "@/components/ui/alert.tsx";
import {deleteEvent} from "@/features/events/api.ts";
import { useState } from "react";

function Avaleht() {
    const { events, loading, error, refetch } = useEvents();
    const [deleteError, setDeleteError] = useState<string | null>(null);

    async function handleEventDelete(eventId: number) {
        try {
            setDeleteError(null);
            await deleteEvent(eventId);
            await refetch();
        } catch (err: any) {
            setDeleteError(err.message ?? "Failed to delete event");
        }
    }

    if (loading) return <Loader />
    if (error) return <Alert variant="destructive">{error}</Alert>;

    return (
        <div>
            {deleteError && (
                <Alert variant="destructive">{deleteError}</Alert>
            )}
            <IntroBlock introText={["Lorem ipsum dolor sit ", <strong key="strong1">amet</strong>, ", consectetur adipiscing elit. Sed dapibus, ", <strong key="strong2">felis eget dignissim fermentum </strong>, ", magna massa ", <strong key="strong3">pretium</strong>, " mauris, gravida varius ", <strong key="strong4">nunc sapien </strong>, " at libero. "]}/>
            <div className="flex gap-5 mt-7 flex-grow">
                <div className="flex-1/2">
                    <EventsTable events={events} onEventDelete={handleEventDelete} />
                </div>
                <div className="flex-1/2">
                    <EventsTable events={events} onEventDelete={handleEventDelete} />
                </div>
            </div>
        </div>
    )
}
export default Avaleht;
