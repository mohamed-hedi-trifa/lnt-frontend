import React from 'react'
import TitleSectionEvent from '../TitleSectionEvent'

export default function LeisureAndSportsActivities({event_title} : {event_title : string}) {
    return (
        <div className="  text-center max-w-7xl w-full mx-auto justify-between  px-5  h-fit">



             <div className="py-10 px-20 font-bold  text-start leading-[45px] text-lg rounded-lg">
             Aucune {event_title} ou sportive n'est actuellement programmée. Inscrivez-vous à notre 
            <span className='text-[#0077B6] underline mx-2 cursor-pointer'>Newsletter</span> 
            pour ne rien manquer des prochains moments de convivialité

            </div>
        </div>

    )
}
