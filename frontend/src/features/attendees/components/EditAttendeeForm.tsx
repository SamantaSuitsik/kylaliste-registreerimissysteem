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
import {type FormEvent, useState, useEffect} from "react";
import {EditAttendee, GetAttendee} from "@/features/attendees/api.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AttendeeType, PaymentMethod} from "@/features/attendees/types.ts";
import type {AttendeeRequest} from "@/features/attendees/types.ts";

interface EditAttendeeFormProps {
    attendeeId: string;
}

function EditAttendeeForm({ attendeeId } : EditAttendeeFormProps) {
    const navigate = useNavigate();
    const [attendeeType, setAttendeeType] = useState<AttendeeType>(AttendeeType.Person);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.BankTransfer);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [personalIdentificationNumber, setPersonalIdentificationNumber] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [numberOfAttendees, setNumberOfAttendees] = useState(1);
    const [additionalInfo, setAdditionalInfo] = useState("");

    useEffect(() => {
        async function loadAttendee() {
            try {
                const attendee = await GetAttendee(attendeeId);
                setAttendeeType(attendee.kind);
                setPaymentMethod(Number(attendee.paymentMethod) as PaymentMethod);
                setAdditionalInfo(attendee.additionalInfo || "");

                if (attendee.kind === AttendeeType.Person) {
                    setFirstName(attendee.personFirstName || "");
                    setLastName(attendee.personLastName || "");
                    setPersonalIdentificationNumber(attendee.personalIdentificationNumber || "");
                } else {
                    setCompanyName(attendee.companyName || "");
                    setRegistrationNumber(attendee.registrationNumber || "");
                    setNumberOfAttendees(attendee.numberOfAttendees || 1);
                }
            } catch (err: any) {
                setError(err.message ?? "Osalejat ei leitud!");
            } finally {
                setLoading(false);
            }
        }

        loadAttendee();
    }, [attendeeId]);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        let payload: AttendeeRequest;

        if (attendeeType === AttendeeType.Company) {
            payload = {
                kind: AttendeeType.Company,
                companyName: companyName,
                registrationNumber: registrationNumber,
                numberOfAttendees: numberOfAttendees,
                paymentMethod: paymentMethod,
                additionalInfo: additionalInfo.trim() === "" ? null : additionalInfo,
            };
        } else {
            payload = {
                kind: AttendeeType.Person,
                personFirstName: firstName,
                personLastName: lastName,
                personalIdentificationNumber: personalIdentificationNumber,
                paymentMethod: paymentMethod,
                additionalInfo: additionalInfo.trim() === "" ? null : additionalInfo,
            };
        }

        try {
            await EditAttendee(attendeeId, payload);
            navigate(-1);
        } catch (err: any) {
            setError(err.message ?? "Osaleja muutmine ebaõnnestus!");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col justify-around items-center">
            <div className="w-1/3">
                <h1 className="text-2xl text-left text-primary mb-10">Osavõtja info</h1>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3 w-2/5">

                {attendeeType === AttendeeType.Person && (
                    <>
                        <div className="flex justify-between">
                            <Label>Eesnimi:</Label>
                            <Input
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-7/12"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Label>Perenimi:</Label>
                            <Input
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-7/12"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Label>Isikukood:</Label>
                            <Input
                                required
                                value={personalIdentificationNumber}
                                onChange={(e) => setPersonalIdentificationNumber(e.target.value)}
                                className="w-7/12"
                            />
                        </div>
                    </>
                )}

                {attendeeType === AttendeeType.Company && (
                    <>
                        <div className="flex justify-between">
                            <Label>Ettevõtte nimi:</Label>
                            <Input
                                required
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-7/12"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Label>Registreerimisnumber:</Label>
                            <Input
                                required
                                value={registrationNumber}
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                                className="w-7/12"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Label>Osavõtjate arv:</Label>
                            <Input
                                required
                                type="number"
                                min="1"
                                value={numberOfAttendees}
                                onChange={(e) => setNumberOfAttendees(Number(e.target.value))}
                                className="w-7/12"
                            />
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
                    <Textarea
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        maxLength={1500}
                        className="w-7/12"
                    />
                </div>
                {error &&
                    <Alert variant="destructive" className="w-fit flex items-center gap-5">
                        <AlertTitle>Viga</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                }
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
export default EditAttendeeForm;
