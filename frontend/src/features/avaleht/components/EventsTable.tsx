import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table.tsx"
import {Button} from "@/components/ui/button.tsx";
import type {CustomEvent} from "@/features/avaleht/types.ts";
import removeIcon from "@/assets/remove.svg"

function EventsTable() {
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
    ]

    return (
        <>
            <div>
                <div className="flex p-5 items-center justify-center bg-primary text-accent">
                    <h1 className="text-2xl">Tulevased üritused</h1>
                </div>
                <Table>
                    <TableBody className="bg-white">
                        {events.map((event, i) => (
                            <TableRow key={event.id} className="text-left">
                                <TableCell className="whitespace-normal">{ i+1 }. {event.name}</TableCell>
                                <TableCell>{event.time}</TableCell>
                                <TableCell className="flex justify-end items-center">
                                    <Button variant="link">Osavõtjad</Button>
                                    <img src={removeIcon} alt="remove icon" className="w-5"/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
export default EventsTable;
