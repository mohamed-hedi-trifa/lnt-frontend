export interface EditionGalleryI {
    id?: number; // Assuming there is an ID field
    edition_id: number;
    media_url: string;
    media_type: string; // You can use an enum if 'media_type' has fixed values
    description: string;
    created_at?: string;
    updated_at?: string;
}
