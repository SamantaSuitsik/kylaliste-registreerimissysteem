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
import {AddAttendee} from "@/features/attendees/api.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AttendeeType, PaymentMethod} from "@/features/attendees/types.ts";
import {isPersonalIdentificationNumberValid} from "@/lib/validation.ts";

interface AddAttendeeFormProps {
    eventId: string;
}

function AddAttendeeForm({ eventId } : AddAttendeeFormProps) {
    const navigate = useNavigate();
    const [attendeeType, setAttendeeType] = useState<AttendeeType>(AttendeeType.Person);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.BankTransfer);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        const formdata = new FormData(e.currentTarget);

        const id_code = String(formdata.get("personal-identification-number"));
        if (!isPersonalIdentificationNumberValid(id_code)) {
            setSubmitting(false);
            setError("Vigane isikukood!");
            return;
        }
        const additinalInfoRaw = formdata.get("additinal-info");
        const additionalInfo = additinalInfoRaw === null || String(additinalInfoRaw).trim() === ""
            ? null : String(additinalInfoRaw);

        let payload;

        if (attendeeType === AttendeeType.Company) {
            payload = {
                kind: AttendeeType.Company,
                companyName: String(formdata.get("company-name")),
                registrationNumber: String(formdata.get("registration-number")),
                numberOfAttendees: Number(formdata.get("number-of-attendees")),
                paymentMethod: paymentMethod,
                additionalInfo: additionalInfo,
            };
        } else {
            payload = {
                kind: AttendeeType.Person,
                personFirstName: String(formdata.get("first-name")),
                personLastName: String(formdata.get("last-name")),
                personalIdentificationNumber: id_code,
                paymentMethod: paymentMethod,
                additionalInfo: additionalInfo,
            };
        }

        try {
            await AddAttendee(eventId, payload);
            navigate("/");
        } catch (err: any) {
            setError(err.message ?? "Failed to add an Attendee");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col justify-around items-center">
            <div className="w-1/3">
                <h1 className="text-2xl text-left text-primary mb-10">Osavõtjate lisamine</h1>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3 w-2/5">
                <div className="flex justify-between items-center w-full mb-2 ">
                    <div aria-hidden="true"/>
                    <RadioGroup
                        value={attendeeType.toString()}
                        onValueChange={(value) => setAttendeeType(Number(value) as AttendeeType)}
                        className="flex gap-9 w-7/12"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={AttendeeType.Person.toString()} id="person" />
                            <Label className="text-md" htmlFor="person">Eraisik</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={AttendeeType.Company.toString()} id="company" />
                            <Label className="text-md" htmlFor="company">Ettevõte</Label>
                        </div>
                    </RadioGroup>
                </div>

                {attendeeType === AttendeeType.Person && (
                    <>
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
                            <Input required name="personal-identification-number" className="w-7/12" minLength={11} maxLength={11}></Input>
                        </div>
                    </>
                )}

                {attendeeType === AttendeeType.Company && (
                    <>
                        <div className="flex justify-between">
                            <Label>Ettevõtte nimi:</Label>
                            <Input required name="company-name" className="w-7/12"></Input>
                        </div>
                        <div className="flex justify-between">
                            <Label>Registreerimisnumber:</Label>
                            <Input required name="registration-number" className="w-7/12"></Input>
                        </div>
                        <div className="flex justify-between">
                            <Label>Osavõtjate arv:</Label>
                            <Input
                                required
                                name="number-of-attendees"
                                type="number"
                                min="1"
                                className="w-7/12"
                            ></Input>
                        </div>
                    </>
                )}

                <div className="flex justify-between">
                    <Label>Maksmisviis:</Label>
                    <div className="w-7/12">
                        <Select
                            value={paymentMethod.toString()}
                            onValueChange={(value) => setPaymentMethod(Number(value) as PaymentMethod)}
                            required
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={PaymentMethod.BankTransfer.toString()}>Pangaülekanne</SelectItem>
                                    <SelectItem value={PaymentMethod.Cash.toString()}>Sularaha</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-between items-start">
                    <Label>Lisainfo:</Label>
                    <Textarea name="additional-info" maxLength={1500} className="w-7/12"></Textarea>
                </div>
                {error &&
                <Alert variant="destructive" className="w-fit flex items-center gap-5">
                    <AlertTitle>Viga</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>}
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
export default AddAttendeeForm;
