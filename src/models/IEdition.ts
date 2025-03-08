import { IEvent } from "./IEvent";
import IPartnerEdition from "./IPartnerEdition";


export default interface IEdition {
    id?: number; // Assuming there is an ID field
    slug: string;
    year: number;
    name_en: string;
    name_fr: string;

    image_affiche1: string;
    titre_affiche1_fr: string;
    titre_affiche1_en: string;
    desciption_affich1_en: string;
    desciption_affich1_fr: string;

    image_affiche2: string;
    titre_affiche2_fr: string;
    titre_affiche2_en: string;
    desciption_affich2_en: string;
    desciption_affich2_fr: string;

    start_date: string; // You might want to use Date if it's parsed properly
    end_date: string;

    events:IEvent[];
    partners:IPartnerEdition[]

    created_at?: string;
    updated_at?: string;
}
