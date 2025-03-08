export default interface IPreviousEditionGallery {
    id?: number; // Assuming there is an ID field
    previous_edition_id: number;
    media_url: string;
    media_type: string; // Consider using an enum if 'media_type' has predefined values
    description: string;
    created_at?: string;
    updated_at?: string;
}
