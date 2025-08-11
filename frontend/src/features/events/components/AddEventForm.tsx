import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {Textarea} from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import {type FormEvent, useState} from "react";
import {createEvent} from "@/features/events/api.ts";
import {Alert} from "@/components/ui/alert.tsx";

function addEventForm() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const formdata = new FormData(e.currentTarget);
        const name = String(formdata.get("name"));
        const location = String(formdata.get("location"));
        const startsAtRaw = String(formdata.get("starts-at"));
        const startsAt = new Date(startsAtRaw).toISOString();  // Convert to UTC
        const additinalInfoRaw = formdata.get("additinal-info");
        const additionalInfo = additinalInfoRaw === null || String(additinalInfoRaw).trim() === ""
        ? null : String(additinalInfoRaw);

        try {
            await createEvent({ name, location, startsAt, additionalInfo });
            navigate("/");
        } catch (err: any) {
            setError(err.message ?? "Failed to create event");
        } finally {
            setSubmitting(false);
        }
    }

    const now = new Date();
    function localISO() {
        return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    }

    return (
        <div className="flex flex-col w-2/5 gap-8">
            <h1 className="text-2xl text-left text-primary">Ürituse lisamine</h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Label>Ürituse nimi:</Label>
                    <Input required className="w-7/12" name="name"/>
                </div>
                <div className="flex justify-between items-center">
                    <Label>Toimumiseaeg:</Label>
                    <Input required className="w-7/12 placeholder:italic" type="datetime-local" min={localISO()} name="starts-at" />
                </div>
                <div className="flex justify-between items-center">
                    <Label>Koht:</Label>
                    <Input required className="w-7/12" name="location"/>
                </div>
                <div className="flex justify-between items-center">
                    <Label>Lisainfo:</Label>
                    <Textarea className="w-7/12" name="additional-info" maxLength={1000}/>
                </div>
                {error && <Alert variant="destructive">{error}</Alert>}
                <div className="self-start flex gap-3 mt-9">
                    <Button onClick={() => navigate(-1)} variant="outline" type="button" className="w-fit" disabled={submitting}>
                        Tagasi
                    </Button>
                    <Button type="submit" className="w-fit px-6" disabled={submitting}>
                        {submitting ? "Lisamine..." : "Lisa"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default addEventForm
