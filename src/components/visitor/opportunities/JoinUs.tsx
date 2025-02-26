import React, { useState } from 'react';
import InternshipApplicationForm from './InternshipApplicationForm';

export default function JoinUs() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col gap-6 items-center px-44'>
            <h2 className='font-bold text-2xl '>
                <span className='text-[#0270A0]'>Envie</span> de Rejoindre Notre Équipe en Stage ?
            </h2>

            <p>
                Faites-nous parvenir votre demande et devenez acteur de la préservation de l'environnement et du développement durable
            </p>

            <p>
                Nous accueillons régulièrement des étudiants motivés pour des stages passionnants et formateurs. 
                Partagez avec nous votre domaine d'intérêt, et nous vous aiderons à contribuer à nos projets ambitieux 
                dans les domaines de la préservation marine, de la gestion des écosystèmes, ou encore des initiatives culturelles.
            </p>

            {/* Button to open the popup */}
            <button 
                className="bg-[#0270A0] w-fit px-5 py-3 rounded-lg text-white font-semibold"
                onClick={() => setIsOpen(true)}
            >
                Faire une Demande de Stage
            </button>

       
            <InternshipApplicationForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
}
