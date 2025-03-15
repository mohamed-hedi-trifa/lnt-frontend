import ITheme from "./ITheme";

export default interface IAchievemnt {
    id?: number; // Assuming there's an ID field
    title_en: string;
    title_fr: string;
    description_en: string;
    description_fr: string;
    event_datetime: string; // You might want to use Date if it's parsed properly
    image: string;
    status: string; // Change to an enum if it has fixed values
    date:string;
    created_at?: string;
    updated_at?: string;
    themes: ITheme[]
}
