import React from 'react'
import EventsCard from '../EventsCard'
import { Link } from 'gatsby';
import recentArticle1 from '../../../../assets/images/recentArticle2.jpg'
import recentArticle2 from '../../../../assets/images/recentArticle2.jpg'

export default function MoreEvent() {
    const lang = typeof window !== 'undefined' && location?.pathname.startsWith("/fr/") ? "fr" : "en";
    return (
        <div>
            <div className='font-bold text-3xl'>
                <span className='text-[#0270A0]'>Explorez</span> Plus d'Événements
            </div>
            <div className='font-semibold mt-3'>
                Découvrez d'autres activités passionnantes et moments à partager
            </div>

            <div className="flex justify-center gap-9 mt-8 sm:px-0 px-5 flex-col sm:flex-row">
                <Link to={`/event/category1?lang=${lang}`} >
                    <EventsCard image={recentArticle1} custunCss="px-16" title="Formation sur les fondamentaux de la gestion des aires marines protégées (MPA) organisée par MedPAN en Turquie" />
                </Link>
                <Link to={`/event/category2?lang=${lang}`} >
                    <EventsCard image={recentArticle2} custunCss="px-16"  title="Lancement d'une initiative scientifique pour protéger les tortues marines à Kerkennah" />
                </Link>
                <Link to={`/event/category3?lang=${lang}`} >
                    <EventsCard image={recentArticle1} custunCss="px-16"  title="Formation sur les fondamentaux de la gestion des aires marines protégées (MPA) organisée par MedPAN en Turquie" />
                </Link>
            </div>

            <button className="text-white text-xs font-medium self-center rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit max-w-md py-3 px-7 mt-10 
 shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
 hover:opacity-90 transition duration-300 ease-in-out">Voir Tous les Événements</button>
        </div>
    )
}
