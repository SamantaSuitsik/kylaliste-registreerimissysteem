import SmallIntroBlock from "@/components/standard/SmallIntroBlock.tsx";
import grass from "@/assets/libled.jpg"
import {useParams} from "react-router-dom";
import type {CustomEvent} from "@/features/avaleht/types.ts";

function Osavotjad() {
    const events: Array<CustomEvent> = [
        {
            id: "1",
            name: "Intsikurmu",
            time: "12-08-2025"
        },
        {
            id: "2",
            name: "Taevapargi avamine",
            time: "30-08-2025"
        }
    ];

    const { id } = useParams<{ id: string }>();
    const event = id ? findEvent(id) : undefined;
    function findEvent(id: string): CustomEvent {
        const event = events.find(e => e.id == id);
        if (!event) {
            throw new Error("Error finding event: " + id);
        }
        return event;
    }
    return (
        <div className="flex flex-col gap-7">
            <SmallIntroBlock imageLink={grass} name={"Osavõtjad"}/>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col gap-7 w-1/3">
                    <h1 className="text-2xl text-left text-primary">Osavõtjad</h1>
                    <div className="flex justify-between">
                        <p>Ürituse nimi:</p>
                        <p>{event?.name}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Toimumisaeg:</p>
                        <p>{event?.time}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Koht:</p>
                        <p>TODO!</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Osavõtjad:</p>
                        <p>TODO!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Osavotjad;
