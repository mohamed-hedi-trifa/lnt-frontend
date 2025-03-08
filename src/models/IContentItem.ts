export default interface ContentItemI {
    id?: number; // Assuming there is an ID field
    post_id: number;
    type: string; // You can use an enum if 'type' has fixed values
    content: string;
    file_path: string;
    order: number;
    language: string;
    created_at?: string;
    updated_at?: string;
}
