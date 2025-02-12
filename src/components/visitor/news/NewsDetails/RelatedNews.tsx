import Line from '@/components/atoms/Line'
import React from 'react'
import CardRelatedNews from './CardRelatedNews'
import newsDeteails from '../../../../assets/images/newsDeteails.jpg'
import HeaderSection from '../HeaderSection'

export default function RelatedNews() {
    return (

        <div>
            <HeaderSection headerName="Actualités Connexes" />

            <div className="divide-y divide-black divide w-full text-start">
                <CardRelatedNews imgSrc={newsDeteails} title="Suivi Scientifique de l'Herbier de Posidonia à Kerkennah : Importance et Actions pour sa Conservation" date="17 Juillet 2022" />
                <CardRelatedNews imgSrc={newsDeteails} title="Suivi Scientifique de l'Herbier de Posidonia à Kerkennah : Importance et Actions pour sa Conservation" date="17 Juillet 2022" />

                <CardRelatedNews imgSrc={newsDeteails} title="Suivi Scientifique de l'Herbier de Posidonia à Kerkennah : Importance et Actions pour sa Conservation" date="17 Juillet 2022" />
            </div>
        </div>

    )
}
