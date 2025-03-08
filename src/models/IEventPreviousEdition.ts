export default interface IEventPreviousEdition {
    id?: number; // Assuming there is an ID field
    previous_edition_id: number;
    previous_event_id: number;
    created_at?: string;
    updated_at?: string;
}
