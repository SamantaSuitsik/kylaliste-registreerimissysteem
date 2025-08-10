import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

function AddGuestForm() {
    const navigate = useNavigate();
    function addGuest(formData: FormData) {
        console.log("data", formData.get("first-name"));
    }

    return (
        <div className="flex flex-col justify-around items-center">
            <div className="w-1/3">
                <h1 className="text-2xl text-left text-primary mb-10">Osavõtjate lisamine</h1>
            </div>
            <form action={addGuest} className="flex flex-col gap-3 w-1/3">
                <div className="flex justify-between items-center w-full mb-2 ">
                    <div aria-hidden="true"/>
                    <RadioGroup defaultValue="private-person" className="flex gap-9 w-7/12">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private-person" id="private-person" />
                            <Label className="text-md" htmlFor="private-person">Eraisik</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="company" id="company" />
                            <Label className="text-md" htmlFor="company">Ettevõte</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="flex justify-between">
                    <Label>Eesnimi:</Label>
                    <Input name="first-name" className="w-7/12"></Input>
                </div>
                <div className="flex justify-between">
                    <Label>Perenimi:</Label>
                    <Input name="last-name" className="w-7/12"></Input>
                </div>
                <div className="flex justify-between">
                    <Label>Isikukood:</Label>
                    <Input name="personal-identification-number" className="w-7/12"></Input>
                </div>
                <div className="flex justify-between">
                    <Label>Maksmisviis:</Label>
                    <Input name="payment-method" className="w-7/12"></Input>
                </div>
                <div className="flex justify-between items-start">
                    <Label>Lisainfo:</Label>
                    <Textarea name="additional-info" className="w-7/12"></Textarea>
                </div>
                <div className="self-start flex gap-3 mt-9">
                    <Button onClick={() => navigate(-1)} variant="outline" type="button" className="w-fit" >Tagasi</Button>
                    <Button type="submit" className="w-fit">Salvesta</Button>
                </div>
            </form>
        </div>
    )
}
export default AddGuestForm;
