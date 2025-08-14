export const AttendeeType = {
    Person: 1,
    Company: 2
} as const;

export const PaymentMethod = {
    BankTransfer: 1,
    Cash: 2
} as const;

export type AttendeeType = typeof AttendeeType[keyof typeof AttendeeType];
export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];

export interface AttendeeRequest {
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



export interface GetAttendeeResponse {
    id: number;
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
    id: number;
    firstName: string;
    lastName: string;
    personalIdentificationNumber: string;
    paymentMethod: string;
    additionalInfo?: string | null;
}

export interface EventAttendeeResponse {
    attendeeId: number;
    kind: AttendeeType;
    name: string;
    personalIdentificationNumber?: string | null;
    registrationNumber?: string | null;
    paymentMethod: string;
    additionalInfo?: string | null;
}
