import React from 'react'
import BlueCalendar from "@/assets/icons/BlueCalendar.png"
import NewsDeteailsImage1 from '../../../../assets/images/newsDeteailsImage1.jpg'
import NewsDeteailsImage2 from '../../../../assets/images/newsDeteailsImage2.jpg'
import Title from '@/components/atoms/titles/Title'
import Media from '../../Media'
import FacebookIcon from '@/assets/icons/FacebookIcon'
import InstagramIcon from '@/assets/icons/InstagramIcon'
import { LinkedInIcon, XIcon } from '../FollowUs'

export default function LeftSideNewsDetails() {
    return (
        <div>
            <div className="text-bold text-start text-3xl font-semibold leading-[43.88px]">
                Lancement d’une Initiative Scientifique pour Protéger les Tortues Marines à Kerkennah
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
                <button type="submit" className="rounded-lg bg-[#0270A0]  text-white font-normal py-1 px-3 text-sm w-fit">
                Initiative scientifique
                </button>
                <button type="submit" className="rounded-lg bg-[#0270A0]  text-white font-normal py-1 px-3 text-sm w-fit">
                Initiative scientifique
                </button>                <button type="submit" className="rounded-lg bg-[#0270A0]  text-white font-normal py-1 px-3 text-sm w-fit">
                Initiative scientifique
                </button>
            </div>

            <div className="flex items-center gap-[5.47px] text-gray-600 text-sm mt-5">
                <img src={BlueCalendar} width={16} height={16} className="w-6 h-6" />
                <span>Le 2 octobre 2024</span>
            </div>


            <img src={NewsDeteailsImage1} className='w-full mt-8 rounded-xl' alt="" />

            <div className='mt-8 text-start' >
                Dans le cadre de ses efforts constants pour préserver la biodiversité marine, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) a officiellement lancé une initiative scientifique innovante dédiée à la protection des tortues marines dans l’archipel de Kerkennah. Ce projet rassemble chercheurs, pêcheurs, étudiants, et bénévoles dans une démarche collaborative visant à protéger ces espèces emblématiques de la Méditerranée tout en renforçant les connaissances scientifiques et l’engagement communautaire.

            </div>


            <div className='mt-8 text-start' >
                Les tortues marines, victimes fréquentes de la pêche accidentelle et des impacts humains, jouent un rôle crucial dans l’équilibre des écosystèmes marins. Cette initiative s'inscrit dans une démarche globale de conservation et de sensibilisation visant à garantir leur survie à long terme

            </div>

            <div className='mt-8 text-start font-bold' >
                Objectifs du Projet
            </div>


            <div className='mt-5 text-start leading-8' >
                <span className='font-bold'> 1. Cartographier les habitats des tortues marines : </span>
                <div className='ml-2'>
                    Identifier les zones clés de reproduction, d’alimentation et de migration des tortues autour des îlots de Kerkennah.
                </div>
                <span className='font-bold'>2. Réduire les interactions nuisibles entre les tortues et les activités humaines :</span>
                <div className='ml-2'>
                    Étudier les pratiques de pêche locales pour proposer des solutions limitant les captures accidentelles.
                </div>
                <span className='font-bold'> 3. Sensibiliser les communautés locales : </span>
                <div className='ml-2'>
                    Promouvoir une prise de conscience collective sur l’importance écologique des tortues marines auprès des pêcheurs et des jeunes générations.
                </div>
            </div>

            <img src={NewsDeteailsImage2} className='w-full mt-8 rounded-xl max-h-[400px] object-cover' alt="" />

            <div className='mt-5 text-start leading-8' >
                <span className='font-bold'> 1. Cartographier les habitats des tortues marines : </span>
                <div className='ml-2'>
                    Identifier les zones clés de reproduction, d’alimentation et de migration des tortues autour des îlots de Kerkennah.
                </div>
                <span className='font-bold'>2. Réduire les interactions nuisibles entre les tortues et les activités humaines :</span>
                <div className='ml-2'>
                    Étudier les pratiques de pêche locales pour proposer des solutions limitant les captures accidentelles.
                </div>
                <span className='font-bold'> 3. Sensibiliser les communautés locales : </span>
                <div className='ml-2'>
                    Promouvoir une prise de conscience collective sur l’importance écologique des tortues marines auprès des pêcheurs et des jeunes générations.
                </div>
            </div>


            <div>
                <hr className="border-black mt-[32px] " />
                <Title customClassName="!font-bold hidden lg:block mt-7 mb-3" size="!text-[32px]">
                    <span className="text-primary">Souvenirs</span> en Photos et Vidéos
                </Title>
                <Title customClassName="!font-bold block lg:hidden mt-7" size="!text-[28px]">
                    <div className="flex flex-col ">
                        <div className="flex gap-2 "><span className="text-primary">Souvenirs</span> en Photos et</div>
                        <div className="flex justify-center">Vidéos</div>
                    </div>
                </Title>
                <Media />
            </div>


            <div className="flex mt-20 items-center  gap-4">
                <div className="font-semibold  ">Partager : </div>
                <div className="flex items-center  gap-6">
                    <FacebookIcon />
                    <InstagramIcon />
                    <LinkedInIcon />
                    <XIcon />
                </div>

            </div>


        </div>
    )
}
