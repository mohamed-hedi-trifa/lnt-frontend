import React, { useState } from 'react';
import InternshipApplicationForm from '../InternshipApplicationForm';
import CandidateApplicationForm from './CandidateApplicationForm';
import opportunity1 from '../../../../assets/images/opportunity.jpg'
import opportunity2 from '../../../../assets/images/opportunity2.jpg'
import opportunity3 from '../../../../assets/images/opportunity3.jpg'
import OpportunityCard from '../OpportunityCard';

export default function OtherOppertunities() {
    const [isOpen, setIsOpen] = useState(false);
    const opportunities = [
        {
            type: "Offres d'Emploi",
            status: "active",
            title: "Coordinateur pour MedFund Co-Management Agreement",
            description: "Nous recrutons un coordinateur pour superviser les projets liés à la préservation marine et à la biodiversité dans l'archipel de Kerkennah",
            place: "Kerkennah, Tunisie",
            expired_date: "2025-03-15",
            image: opportunity1
        },
        {
            type: "Offres d'Emploi",
            status: "active",
            title: "Appel d'Offres : Création d'un Site Web",
            description: "Participez à l'appel d'offres pour concevoir le site web interactif et multilingue de l'AKDDCL",
            place: "Sousse, Tunisia",
            expired_date: "2025-04-01",
            image: opportunity2
        },
        {
            type: "Offres de Stages",
            status: "inactive",
            title: "Opportunités de Stage avec l'AKDDC",
            description: "Rejoignez nos équipes pour des stages dédiés à la préservation marine et à la gestion des écosystèmes insulaires",
            place: "Paris, France",
            expired_date: "2024-12-31",
            image: opportunity3
        },


    ];
    return (
        <div className='flex flex-col gap-6 items-center sm:px-44'>
            <h2 className='font-bold text-2xl '>
                <span className='text-[#0270A0]'>Découvrez</span> d'autres Opportunités
            </h2>

            <p>
                Explorez nos autres offres et trouvez l'opportunité qui correspond à vos aspirations
            </p>
            <div className='grid sm:grid-cols-3 gap-4 px-4 sm:px-0'>
                {opportunities.map((opportunity) => (

                    <OpportunityCard opportunity={opportunity} />

                ))}
            </div>





            <div className='w-full '>
                <button className="text-white sm:mb-0  mb-5 sm:text-xs  font-medium  self-start rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit py-2 px-6 
 shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
 hover:opacity-90 transition duration-300 ease-in-out"
                    >Voir Tous les Opportunités </button>
            </div>

     
        </div >
    );
}
