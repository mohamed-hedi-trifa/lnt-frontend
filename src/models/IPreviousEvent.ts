export default interface IPreviousEvent {
    id?: number; // Assuming there is an ID field
    name_en: string;
    name_fr: string;
    slug: string;
    description_en: string;
    description_fr: string;
    place_en: string;
    place_fr: string;
    date: string; // Consider using `Date` if working with actual Date objects
    created_at?: string;
    updated_at?: string;
}
