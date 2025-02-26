import React from 'react'
import LocationMap from '../../LocationMap'
import LocationIcon from '@/assets/icons/LocationIcon'
import FacebookIcon from '@/assets/icons/FacebookIcon'
import FacebookIconType2 from '@/assets/icons/FacebookIconType2'
import InstagramIconType2 from '@/assets/icons/InstagramIconType2'
import LinkdinType2 from '@/assets/icons/LinkdinType2'
import XIconType2 from '@/assets/icons/XIconType2'

export default function RightSideOpportunityDetails() {
    return (
        <div className='flex flex-col justify-start gap-2 items-start'>
            <div className='flex flex-col justify-start gap-2 items-start'>

                <div className="font-bold text-start">
                    Détails du Poste
                </div>
                <div className="flex gap-2 items-center">
                    <img src="/icons/locationIcon.png" alt="" width={22} />
                    <p className='text-[13px]'><span className='font-semibold'>Lieu : </span>Kerkennah, Tunisie</p>
                </div>

                <div className="flex gap-2 items-center text-start">
                    <img src="/icons/calendrier.png" alt="" width={22} />
                    <p className='text-[13px]'><span className='font-semibold'>Type de contrat : </span> Contrat à Durée Déterminée (12 mois, renouvelable)</p>
                </div>


                <div className="flex gap-2 items-center">
                    <img src="/icons/startDateIcon.png" alt="" width={22} />
                    <p className='text-[13px]'><span className='font-semibold'>Date limite pour postuler : </span> 15 mars 2024</p>
                </div>

                <div className="flex gap-2 items-center">
                    <img src="/icons/contract.png" alt="" width={22} />
                    <p className='text-[13px]'><span className='font-semibold'>Début du poste : </span> Avril 2024</p>
                </div>

            </div>








            <div className="font-bold text-start mt-2">
                Restez informé(e) des prochains événements !
            </div>
            <div className="text-[#0270A0] underline font-semibold">
                Abonnez-vous à notre Newsletter
            </div>
            <div className="font-bold text-start mt-2">
                Vous avez une question sur cet événement ?
            </div>

            <div className="text-[#0270A0] underline font-semibold">
                Contactez-nous !
            </div>

            <div className="font-bold text-start mt-2">
                Partager avec vos amis
            </div>
            <div className="flex gap-2">
                <FacebookIconType2 />
                <InstagramIconType2 />
                <LinkdinType2 />
                <XIconType2 />
            </div>


        </div>

    )
}
