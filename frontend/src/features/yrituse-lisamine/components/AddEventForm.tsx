import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {Textarea} from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label";

function addEventForm() {
    const navigate = useNavigate();
    function addEvent(formData: FormData) {
        const query = formData.get("name");

        alert(`'${query}'`);
    }

    const now = new Date();
    function localISO() {
        return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    }

    return (
        <div className="flex flex-col w-2/5 gap-8">
            <h1 className="text-2xl text-left text-primary">Ürituse lisamine</h1>
            <form action={addEvent} className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Label>Ürituse nimi:</Label>
                    <Input className="w-7/12" name="name"/>
                </div>
                <div className="flex justify-between items-center">
                    <Label>Toimumiseaeg:</Label>
                    <Input className="w-7/12 placeholder:italic" type="datetime-local" min={localISO()} name="time" />
                </div>
                <div className="flex justify-between items-center">
                    <Label>Koht:</Label>
                    <Input className="w-7/12" name="location"/>
                </div>
                <div className="flex justify-between items-center">
                    <Label>Lisainfo:</Label>
                    <Textarea className="w-7/12" name="additional-info" maxLength={1000}/>
                </div>
                <div className="self-start flex gap-3 mt-9">
                    <Button onClick={() => navigate(-1)} variant="outline" type="button" className="w-fit" >Tagasi</Button>
                    <Button type="submit" className="w-fit px-6">Lisa</Button>
                </div>
            </form>
        </div>
    )
}
export default addEventForm
