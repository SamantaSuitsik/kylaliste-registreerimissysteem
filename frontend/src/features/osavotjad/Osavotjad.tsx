import SmallIntroBlock from "@/components/standard/SmallIntroBlock.tsx";
import grass from "@/assets/libled.jpg"
import {useParams} from "react-router-dom";
import {useEventDetails} from "@/features/osavotjad/useEventDetails.ts";
import {Loader} from "lucide-react";
import {Alert} from "@/components/ui/alert.tsx";

function Osavotjad() {
    const { id } = useParams<{ id: string }>();
    const { event, loading, error } = useEventDetails(id);

    if (loading) return <Loader />
    if (error) return <Alert className="w-fit" variant="destructive">{error}</Alert>;

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
                    <div className="flex">
                        <p className="w-40 shrink-0">Osavõtjad:</p>
                        <ul>
                            {event?.guests.map((guest) => (
                                <li key={guest.id}>
                                    {guest.firstName} {guest.lastName} - {guest.paymentMethod}
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Osavotjad;
