export interface AddGuestRequest {
    firstName: string;
    lastName: string;
    personalIdentificationNumber: string;
    paymentMethod: string;
    additionalInfo?: string | null;
}

export interface Guest {
    id: string;
    firstName: string;
    lastName: string;
    personalIdentificationNumber: string;
    paymentMethod: string;
    additionalInfo?: string | null;
}
