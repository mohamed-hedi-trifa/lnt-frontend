export interface IEvent {
    id?: number; // Assuming there is an ID field
    title_en: string;
    title_fr: string;
    description_en: string;
    description_fr: string;
    event_datetime: string; // Use Date if you prefer proper date handling
    image: string;
    location_en: string;
    location_fr: string;
    latitude: number;
    longitude: number;
    status: string; // Consider using an enum if it has predefined values
    auth_id: number;
    slug:string;
    event_type_id: number;
    created_at?: string;
    updated_at?: string;
}
