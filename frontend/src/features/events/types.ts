import type {Guest} from "@/features/guests/types.ts";

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

export interface EventDetails {
    id: string;
    name: string;
    startsAt: string;
    location: string;
    additionalInfo?: string | null;
    guests: Guest[]
}
