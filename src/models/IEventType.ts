export default interface IEventType {
    id?: number; // Assuming there is an ID field
    name_en: string;
    name_fr: string;
    slug: string;
    status: string; // Consider using an enum if status has predefined values
    created_at?: string;
    updated_at?: string;
}
