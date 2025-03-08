export default interface IEventPartner {
    id?: number; // Assuming there is an ID field
    partner_id: number;
    event_id: number;
    created_at?: string;
    updated_at?: string;
}
