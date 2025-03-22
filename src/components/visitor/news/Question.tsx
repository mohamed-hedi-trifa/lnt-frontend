import React from 'react'
import HeaderSection from './HeaderSection'
import Button from '@/components/atoms/Button'
import LangLink from '@/components/LangLink'

export default function Question() {
    return (
        <div className='h-[279.40px] sm:w-[300px] float-end flex flex-col justify-center '>
            <HeaderSection headerName="Question" />
            <div className='flex flex-col justify-center gap-[25px] pt-[25px]'>
            <p className='text-start mt-8 font-semibold text-lg'>
                Besoin de plus d'informations ? N'hésitez pas à nous contacter. Cliquez sur le Bouton ci-dessous pour accéder à notre page de contact et poser vos questions
            </p>
            <LangLink to='/contact' > 
                <Button variant="primary" >
                    <div className="text-white text-xl font-bold">Contactez-Nous</div>
                </Button>
            </LangLink>
            </div>


        </div>
    )
}
