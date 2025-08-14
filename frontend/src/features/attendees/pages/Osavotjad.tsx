import SmallIntroBlock from "@/components/standard/SmallIntroBlock.tsx";
import grass from "@/assets/libled.jpg"
import {useParams} from "react-router-dom";
import {Loader} from "lucide-react";
import {Alert} from "@/components/ui/alert.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useEventDetails } from "@/features/events/hooks/useEventDetails";

function Osavotjad() {
    const { id } = useParams<{ id: string }>();
    const { event, loading, error } = useEventDetails(id);

    if (loading) return <Loader />
    if (error) return <Alert variant="destructive">{error}</Alert>;

    return (
        <div className="flex flex-col gap-7">
            <SmallIntroBlock imageLink={grass} name={"Osavõtjad"}/>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col gap-7 w-1/3 text-left">
                    <h1 className="text-2xl text-left text-primary">Osavõtjad</h1>
                    <div className="flex">
                        <p className="w-40 shrink-0">Ürituse nimi:</p>
                        <p>{event?.name}</p>
                    </div>
                    <div className="flex">
                        <p className="w-40 shrink-0">Toimumisaeg:</p>
                        <p>{event?.startsAt}</p>
                    </div>
                    <div className="flex">
                        <p className="w-40 shrink-0">Koht:</p>
                        <p>{event?.location}</p>
                    </div>
                    <p>Osavõtjad:</p>
                </div>
                <div className="w-7/12 self-end px-10">
                    <ul>
                        {event?.attendees.map((attendee, i) => (
                            <li key={attendee.id} className="flex justify-around items-center text-left">
                                <div className="w-1/3">
                                    {i+1}. {attendee.name}
                                </div>
                                <div className="w-1/3">
                                    {attendee.personalIdentificationNumber ?? attendee.registrationNumber}
                                </div>
                                <Button className="w-1/6" variant="link">VAATA</Button>
                                <Button className="w-1/6" variant="link">KUSTUTA</Button>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    )
}
export default Osavotjad;
