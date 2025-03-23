import React from 'react'
import TitleSectionEvent from './TitleSectionEvent'


export default function EmptyEvent1({event_title} : {event_title : string}) {
    return (
        <div className='w-full'>
          

            <div className="bg-[rgba(255,255,255,0.5)] shadow-helmi p-10 font-bold mt-6 text-start leading-[45px] text-lg rounded-lg">
            Aucun {event_title} n'est programmé pour le moment. Inscrivez-vous à notre 
            <span className='text-[#0077B6] underline mx-2 cursor-pointer'>Newsletter</span> 
            pour ne rien manquer des prochains moments de convivialité
            </div>
        </div>
    )
}
