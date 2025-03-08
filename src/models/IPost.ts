export default interface IPost {
    id?: number; // Assuming there is an ID field
    title: string;
    subtitle: string;
    slug: string;
    type: string; // Consider using an enum if 'type' has predefined values
    author_id: number;
    content: string;
    summary: string;
    status: string; // Consider using an enum if 'status' has predefined values
    image: string;
    keywords: string;
    created_at?: string;
    updated_at?: string;
}
