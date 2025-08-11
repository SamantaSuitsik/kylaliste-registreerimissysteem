export interface EventItem {
    id: number;
    name: string;
    startsAt: string;
    location: string;
    additionalInfo?: string | null;
}

export interface AddEventRequest {
    name: string;
    startsAt: string;
    location: string;
    additionalInfo?: string | null;
}
