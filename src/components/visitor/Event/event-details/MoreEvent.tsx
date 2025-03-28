import React from 'react'
import { Link } from 'gatsby';
import MoreEventCard from './MoreEventCard';
import { useTranslation } from '@/contexts/TranslationContext';
import { IEvent } from '@/models/IEvent';

export default function MoreEvent({ moreEvents }: { moreEvents: any }) {
    const { t, lang } = useTranslation();

    
    return (
        <div>
            <div className='font-bold text-3xl'>
                <span className='text-[#0270A0]'>Explorez</span> Plus d'Événements
            </div>
            <div className='font-semibold mt-3'>
                Découvrez d'autres activités passionnantes et moments à partager
            </div>

            <div className="flex justify-center gap-9 mt-8 sm:px-0 px-5 flex-col sm:flex-row">

                {
                    moreEvents.map((event:IEvent) => (
                        <Link to={`/event/${event.slug}?lang=${lang}`} key={event.id}>
                            <MoreEventCard event={event} custunCss="px-16" lang='en' />
                        </Link>
                    ))
                }
 
            </div>

            <button className="text-white text-xs font-medium self-center rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit max-w-md py-3 px-7 mt-10 
 shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
 hover:opacity-90 transition duration-300 ease-in-out">Voir Tous les Événements</button>
        </div>
    )
}
