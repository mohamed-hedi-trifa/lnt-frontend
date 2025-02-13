import React from 'react'
import TitleSectionTrainingSession from './TitleSectionTrainingSession'


export default function QuestionTrainingSession() {
    return (
        <div className='sm:w-[300px] float-end '>
                       <TitleSectionTrainingSession headerName="Question"  showButton={false}/>
            <p className='text-start mt-8 font-bold text-lg'>
                Besoin de plus d'informations ? N'hésitez pas à nous contacter. Cliquez sur le Bouton ci-dessous pour accéder à notre page de contact et poser vos questions
            </p>
            <button className="text-white text-lg mt-3 font-bold px-6 rounded-3xl bg-gradient-to-r from-[#006E9F] to-[#51ADC6] w-fit max-w-md py-4 
                   shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
                   hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
                   hover:opacity-90 transition duration-300 ease-in-out">
  Contactez-Nous
</button>


        </div>
    )
}
