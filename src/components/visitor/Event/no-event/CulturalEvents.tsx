import React from 'react'
import TitleSectionEvent from '../TitleSectionEvent'

export default function CulturalEvents() {
    return (
        <div className='w-full mt-14'>
            <TitleSectionEvent headerName="Événements culturels" showButton={true} />

            <div className="bg-white shadow-helmi p-10 font-bold mt-8 text-start leading-[45px] text-lg rounded-lg">
            Aucun atelier ou formation n'est programmé pour le moment. Inscrivez-vous à notre 
            <span className='text-[#0077B6] underline mx-2 cursor-pointer'>Newsletter</span> 
            pour être le premier informé des prochaines opportunités d'apprentissage et de développement.
            </div>
        </div>
    )
}
