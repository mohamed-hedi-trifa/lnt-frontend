import React from 'react'


export default function EmptyAchievements() {
    return (
        <div className='w-full'>
            <div className="bg-white shadow-lg p-10 font-bold mt-6 text-start leading-[45px] text-lg">
            Aucun réalisations n'est trouvé pour votre current filtre. Inscrivez-vous à notre 
            <span className='text-[#0077B6] underline mx-2 cursor-pointer'>Newsletter</span> 
            pour être le premier informé des nos réalisations.
            </div>
        </div>
    )
}
