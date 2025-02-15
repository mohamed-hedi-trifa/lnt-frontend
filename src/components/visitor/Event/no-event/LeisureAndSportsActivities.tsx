import React from 'react'
import TitleSectionEvent from '../TitleSectionEvent'

export default function LeisureAndSportsActivities() {
    return (
        <div className="my-5 py-10  text-center max-w-7xl w-full mx-auto justify-between mt-20 px-5  h-fit">
            <TitleSectionEvent headerName="Activités de loisirs et sportives" showButton={true} />



             <div className="py-10 px-20 font-bold  text-start leading-[45px] text-lg">
             Aucune activité de loisirs ou sportive n’est actuellement programmée. Inscrivez-vous à notre 
            <span className='text-[#0077B6] underline mx-2 cursor-pointer'>Newsletter</span> 
            pour ne rien manquer des prochains moments de convivialité

            </div>
        </div>

    )
}
