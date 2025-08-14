export enum AttendeeType {
    Person = 1,
    Company = 2
}

export enum PaymentMethod {
    BankTransfer = 1,
    Cash = 2
}

export interface AddAttendeeRequest {
    kind: AttendeeType;
    personFirstName?: string;
    personLastName?: string;
    companyName?: string;
    personalIdentificationNumber?: string;
    registrationNumber?: string;
    numberOfAttendees?: number;
    paymentMethod: PaymentMethod;
    additionalInfo?: string | null;
}

export interface Attendee {
    id: string;
    firstName: string;
    lastName: string;
    personalIdentificationNumber: string;
    paymentMethod: string;
    additionalInfo?: string | null;
}

export interface EventAttendeeResponse {
    id: number;
    kind: AttendeeType;
    name: string;
    personalIdentificationNumber?: string | null;
    registrationNumber?: string | null;
    paymentMethod: string;
    additionalInfo?: string | null;
}
