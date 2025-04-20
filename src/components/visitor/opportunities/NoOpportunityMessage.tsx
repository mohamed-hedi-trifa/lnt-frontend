import React from 'react'

export default function NoOpportunityMessage() {
    return (
        <div className='w-full'>
            <div className="bg-[rgba(255,255,255,0.5)] shadow-helmi p-10 font-bold mt-6 text-start leading-[45px] text-lg rounded-lg">
                Aucun Opportunity n'a été trouvée avec votre filtre actuel. Inscrivez-vous à notre{' '}
                <span className="text-[#0077B6] underline mx-2 cursor-pointer">Newsletter</span>{' '}
                pour rester informé des nouveautés
            </div>
        </div>
    )
}