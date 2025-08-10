import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table.tsx"
import {Button} from "@/components/ui/button.tsx";
import type {EventItem} from "@/features/avaleht/types.ts";
import removeIcon from "@/assets/remove.svg"
import {NavLink} from "react-router-dom";

function EventsTable({ events }: { events: EventItem[] }) {

    return (
        <div>
            <div className="flex p-5 items-center justify-center bg-primary text-primary-foreground">
                <h1 className="text-2xl">Tulevased üritused</h1>
            </div>
            <Table>
                <TableBody className="bg-white">
                    {events.map((event, i) => (
                        <TableRow key={event.id} className="text-left">
                            <TableCell className="whitespace-normal">
                                <NavLink to={`yritus/${event.id}`}>{ i+1 }. {event.name}</NavLink>
                            </TableCell>
                            <TableCell>{event.startsAt}</TableCell>
                            <TableCell className="flex justify-end items-center">
                                <Button variant="link">
                                    <NavLink to={`yritus/${event.id}/osavotjate-lisamine`}>
                                        Lisa osavõtja
                                    </NavLink>
                                </Button>
                                <img src={removeIcon} alt="remove icon" className="w-5"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
export default EventsTable;
