export interface AddAttendeeRequest {
    kind: string;
    personFirstName?: string;
    personLastName?: string;
    companyName?: string;
    personalIdentificationNumber?: string;
    registrationNumber?: string;
    numberOfAttendees?: number;
    paymentMethod: string;
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
    kind: string;
    name: string;
    personalIdentificationNumber?: string | null;
    registrationNumber?: string | null;
    paymentMethod: string;
    additionalInfo?: string | null;
}
