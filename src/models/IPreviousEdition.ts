export default interface IPreviousEdition {
    id?: number; // Assuming there is an ID field
    slug: string;
    year: number;
    name_en: string;
    name_fr: string;
    image: string;

    description_en: string;
    description_fr: string;
    card_description_en: string;
    card_description_fr: string;

    place_en: string;
    place_fr: string;

    start_date: string; // Consider using `Date` if working with actual Date objects
    end_date: string;

    created_at?: string;
    updated_at?: string;
}
