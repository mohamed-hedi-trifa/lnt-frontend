import React from 'react';
import FacebookIconType2 from '@/assets/icons/FacebookIconType2';
import InstagramIconType2 from '@/assets/icons/InstagramIconType2';
import LinkdinType2 from '@/assets/icons/LinkdinType2';
import XIconType2 from '@/assets/icons/XIconType2';

export default function RightSideOpportunityDetails({ opportunity, language }: { opportunity: any, language: string }) {

    function formatDateToMonthYear(date: Date | string | undefined): string {
        if (!date) {
            return "Date non spécifiée"; // Handle undefined or null dates
        }

        const dateObj = new Date(date); // Convert to Date object
        if (isNaN(dateObj.getTime())) {
            return "Date invalide"; // Handle invalid dates
        }

        const monthNames = {
            fr: [
                "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
            ],
            en: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]
        };

        const month = monthNames[language as keyof typeof monthNames][dateObj.getMonth()];  // Get the month name
        const year = dateObj.getFullYear(); // Get the full year

        return `${month} ${year}`; // Return the formatted string
    }

    return (
        <div className='flex flex-col justify-start gap-2 items-start'>
            <div className='flex flex-col justify-start gap-2 items-start'>
                <div className="font-bold text-start">
                    Détails du Poste
                </div>
                <div className="flex gap-2 items-center">
                    <img src="/icons/locationIcon.png" alt="" width={22} />
                    <p className='text-[13px]'>
                        <span className='font-semibold'>Lieu : </span>
                        {opportunity.location_en || opportunity.location_fr}
                    </p>
                </div>

                {opportunity.contract_type && (
                    <div className="flex gap-2 items-center text-start">
                        <img src="/icons/calendrier.png" alt="" width={22} />
                        <p className="text-[13px]">
                            <span className="font-semibold">Type de contrat :</span> {opportunity.contract_type}
                        </p>
                    </div>
                )}

                <div className="flex gap-2 items-center">
                    <img src="/icons/startDateIcon.png" alt="" width={22} />
                    <p className='text-[13px]'>
                        <span className='font-semibold'>Date limite pour postuler : </span>
                        {opportunity.due_date}
                    </p>
                </div>

                <div className="flex gap-2 items-center">
                    <img src="/icons/contract.png" alt="" width={22} />
                    <p className='text-[13px]'>
                        <span className='font-semibold'>Début du poste : </span>
                        {formatDateToMonthYear(opportunity.postStart)}
                    </p>
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
    );
}