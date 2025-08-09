import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

function addEventForm() {
    const navigate = useNavigate();
    function addEvent(formData: FormData) {
        const query = formData.get("name");
        alert(`'${query}'`);
    }

    return (
        <div className="flex flex-col w-1/2 gap-8">
            <h1 className="text-2xl text-left text-primary">Ürituse lisamine</h1>
            <form action={addEvent} className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <label>Ürituse nimi:</label>
                    <Input className="w-7/12" name="name"/>
                </div>
                <div className="flex justify-between items-center">
                    <label>Toimumiseaeg:</label>
                    <Input className="w-7/12 placeholder:italic" name="time" placeholder="pp.kk.aaaa hh:mm"/>
                </div>
                <div className="flex justify-between items-center">
                    <label>Koht:</label>
                    <Input className="w-7/12" name="location"/>
                </div>
                <div className="flex justify-between items-center">
                    <label>Lisainfo:</label>
                    <Input className="w-7/12" name="additional-info"/>
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
