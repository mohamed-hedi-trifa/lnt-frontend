import React from 'react'

export default function NoEventsMessage({ eventTypeTitle }: { eventTypeTitle: string }) {
    return (
        <div className='w-full'>
            <div className="bg-white shadow-helmi p-10 font-bold mt-6 text-start leading-[45px] text-lg">
                Aucun événement pour {eventTypeTitle}. Inscrivez-vous à notre{' '}
                <span className="text-[#0077B6] underline mx-2 cursor-pointer">Newsletter</span>{' '}
                pour être le premier informé des prochaines opportunités d'apprentissage et de développement.
            </div>
        </div>
    )
}
