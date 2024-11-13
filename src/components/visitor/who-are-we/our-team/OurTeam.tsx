import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'

export default function OurTeam() {
    return (
        <div className=''>
            <PageTitle title='Our Team' width='w-[160px]' />
            <section>
                <div className='relative max-w-5xl mx-auto flex gap-10 h-[5000px]'>
                    <Sidebar />

                    <div className='w-fit'>
                        <div>L’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) est le fruit de la vision et de l'engagement de nombreux passionnés qui, depuis sa création, n'ont cessé de travailler ensemble pour le bien-être et la durabilité de l’archipel de Kerkennah. Notre équipe actuelle rassemble des talents aux parcours variés, tous unis par leur dévouement à la préservation de notre environnement et de notre patrimoine culturel.</div>
                        <div>Nous rendons également hommage aux membres fondateurs, dont l’engagement et l’enthousiasme ont jeté les bases de notre association et permis de concrétiser ses premiers projets. Leur contribution continue d’inspirer nos efforts, et nous restons fidèles aux valeurs qu’ils ont incarnées.</div>
                    </div>
                </div>
            </section>
        </div>
    )
}
