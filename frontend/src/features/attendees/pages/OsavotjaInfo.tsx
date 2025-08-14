import SmallIntroBlock from "@/components/standard/SmallIntroBlock.tsx";
import grass from "@/assets/libled.jpg";
import { useParams } from "react-router-dom";
import EditAttendeeForm from "@/features/attendees/components/EditAttendeeForm.tsx";

function OsavotjaInfo() {
    const { attendeeId } = useParams<{ attendeeId: string }>();

    if (!attendeeId) {
        return <div>Attendee ID not found</div>;
    }

    return (
        <div className="flex flex-col gap-7">
            <SmallIntroBlock imageLink={grass} name={"Osavõtja info"}/>
            <EditAttendeeForm attendeeId={attendeeId} />
        </div>
    );
}

export default OsavotjaInfo;
