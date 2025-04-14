import Line from '@/components/atoms/Line'
import  Button  from '@/components/atoms/Button'
import React from 'react'
import LangLink from '@/components/LangLink'


export default function Question() {
    return (
      <div className="h-[279.40px] sm:w-[300px] float-end flex flex-col justify-center ">
        <div className="text-[#183354] text-xl font-bold leading-relaxed text-start pb-1">Une Question ?</div>
        <Line />
        <div className='flex flex-col justify-center gap-[25px] pt-[25px]'>
         <div className="w-[300px] text-black text-[15px] font-bold leading-normal text-start">
           Besoin de plus d'informations ? N'hésitez pas à nous contacter. Cliquez sur le bouton ci-dessous pour accéder à notre page de contact et poser vos questions.
         </div>
         <div className="flex justify-center">
          <LangLink to='/contact' > 
           <Button variant="primary" >
             <div className="text-white text-xl font-bold">Contactez-Nous</div>
           </Button>
          </LangLink>
         </div>
        </div>
      </div>
    )
}
