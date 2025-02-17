import React from 'react'
import BlueCalendar from "@/assets/icons/BlueCalendar.png"
import NewsDeteailsImage1 from '../../../../assets/images/newsDeteailsImage1.jpg'
import NewsDeteailsImage2 from '../../../../assets/images/newsDeteailsImage2.jpg'
import Title from '@/components/atoms/titles/Title'
import Media from '../../Media'
import FacebookIcon from '@/assets/icons/FacebookIcon'
import InstagramIcon from '@/assets/icons/InstagramIcon'


export default function EventDetailsContent() {
    return (
        <div>
            <div className="text-bold text-start sm:text-3xl text-2xl  font-bold leading-[43.88px]">
                À propos de l'événement
            </div>




            <div className='sm:mt-8 mt-2 text-start' >
                Plongez dans l'univers fascinant de la pêche traditionnelle à Kerkennah lors de notre Atelier de Pêche Durable. Cet événement met en lumière les techniques ancestrales comme la charfia et les méthodes respectueuses de l'environnement, tout en sensibilisant les participants à la préservation des ressources marines.
            </div>


            <div className='sm:mt-8 mt-2 text-start' >
                Avec l'aide de pêcheurs locaux, apprenez à confectionner des nasses artisanales, découvrez l'importance des herbiers de posidonie pour la biodiversité, et explorez les impacts du changement climatique sur les pratiques de pêche

            </div>

            <div className='sm:mt-8 mt-5 text-start font-bold' >
                Programme de l'atelier :
            </div>


            <div className='sm:mt-8 mt-2 text-start leading-8' >
                <span className='font-bold'> 1. Accueil et présentation (9h00 - 9h30) : </span>
                <div className='ml-2'>
                    Introduction aux traditions de pêche de l'archipel et à l'importance écologique des pratiques durables.
                </div>
                <span className='font-bold'>2. Démonstration pratique (9h30 - 11h00) :</span>
                <div className='ml-2'>
                    Les pêcheurs locaux vous guideront dans la fabrication de nasses artisanales et l'utilisation des filets respectueux de l'écosystème marin.
                </div>
                <span className='font-bold'> 3. Sortie en mer (11h00 - 12h30) : </span>
                <div className='ml-2'>
                    Une expérience immersive pour observer la mise en place des charfias et découvrir les habitats marins protégés.
                </div>
                <span className='font-bold'> 4. Discussion et échanges (12h30 - 13h00) : </span>
                <div className='ml-2'>
                    Débat ouvert sur l'avenir de la pêche à Kerkennah, suivi d'une collation offerte par l'association.
                </div>
            </div>



            <div className='sm:mt-8 mt-5 text-start font-bold' >
                Date & Heure
            </div>




            <div className=' text-start' >
                24 février 2025, de 9h00 à 13h00            
            </div>



      


        </div>
    )
}
