import SmallIntroBlock from "@/components/standard/SmallIntroBlock.tsx";
import grass from "@/assets/libled.jpg"
import AddAttendeeForm from "@/features/attendees/components/AddAttendeeForm.tsx";
import {useParams} from "react-router-dom";

function OsavotjateLisamine() {
    const { id: eventId } = useParams();
    return (
        <div className="flex flex-col gap-7">
            <SmallIntroBlock imageLink={grass} name={"Osavõtjate Lisamine"} />
            <AddAttendeeForm eventId={eventId!}/>
        </div>
    )
}
export default OsavotjateLisamine;
