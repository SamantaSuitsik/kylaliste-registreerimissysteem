import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {type FormEvent, useState} from "react";
import {createGuest} from "@/features/guests/api.ts";
import {Alert} from "@/components/ui/alert.tsx";

interface AddGuestFormProps {
    eventId: string;
}

function AddGuestForm({ eventId } : AddGuestFormProps) {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const formdata = new FormData(e.currentTarget);
        const firstName = String(formdata.get("first-name"));
        const lastName = String(formdata.get("first-name"));
        const personalIdentificationNumber = String(formdata.get("personal-identification-number"));
        const additinalInfoRaw = formdata.get("additinal-info");
        const additionalInfo = additinalInfoRaw === null || String(additinalInfoRaw).trim() === ""
            ? null : String(additinalInfoRaw);

        const payload = {
            firstName,
            lastName,
            personalIdentificationNumber,
            paymentMethod,
            additionalInfo,
        }

        try {
            await createGuest(eventId, payload);
            navigate("/");
        } catch (err: any) {
            setError(err.message ?? "Failed to add a Guest");
        } finally {
            setSubmitting(false);
        }


    }

    return (
        <div className="flex flex-col justify-around items-center">
            <div className="w-1/3">
                <h1 className="text-2xl text-left text-primary mb-10">Osavõtjate lisamine</h1>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3 w-1/3">
                <div className="flex justify-between items-center w-full mb-2 ">
                    <div aria-hidden="true"/>
                    <RadioGroup defaultValue="private-person" className="flex gap-9 w-7/12">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private-person" id="private-person" />
                            <Label className="text-md" htmlFor="private-person">Eraisik</Label>
                        </div>
                        {/*<div className="flex items-center space-x-2">*/}
                        {/*    <RadioGroupItem value="company" id="company" />*/}
                        {/*    <Label className="text-md" htmlFor="company">Ettevõte</Label>*/}
                        {/*</div>*/}
                    </RadioGroup>
                </div>
                <div className="flex justify-between">
                    <Label>Eesnimi:</Label>
                    <Input required name="first-name" className="w-7/12"></Input>
                </div>
                <div className="flex justify-between">
                    <Label>Perenimi:</Label>
                    <Input required name="last-name" className="w-7/12"></Input>
                </div>
                <div className="flex justify-between">
                    <Label>Isikukood:</Label>
                    <Input required name="personal-identification-number" className="w-7/12"></Input>
                </div>
                <div className="flex justify-between">
                    <Label>Maksmisviis:</Label>
                    <div className="w-7/12">
                        <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="bank transfer">Pangaülekanne</SelectItem>
                                    <SelectItem value="cash">Sularaha</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-between items-start">
                    <Label>Lisainfo:</Label>
                    <Textarea name="additional-info" maxLength={1500} className="w-7/12"></Textarea>
                </div>
                {error && <Alert variant="destructive">{error}</Alert>}
                <div className="self-start flex gap-3 mt-9">
                    <Button onClick={() => navigate(-1)} variant="outline" type="button" className="w-fit" disabled={submitting}>Tagasi</Button>
                    <Button type="submit" className="w-fit" disabled={submitting}>
                        {submitting ? "Salvestamine..." : "Salvesta"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default AddGuestForm;
