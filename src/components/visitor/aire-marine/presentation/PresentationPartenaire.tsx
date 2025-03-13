import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ContainerImageMarine from '../ContainerImageMarine'
import Partners from '../../who-are-we/partners/Partners'
import SectionTitle from '../../../atoms/titles/SectionTitle'
import AMCPSidebar from '../../../layout/AMCPSidebar'
import partnersHero from '../../../../assets/images/partners-hero.jpg'
import HeroSection from '../../HeroSection'
import PageParagraph from '../../../atoms/PageParagraph'

export default function PresentationPartenaire() {


    const [partners, setPartners] = useState<any>(null);
    const getPartners = async () => {
        try {

            const res = await axios.get("/api/get-amcp-parteners");
            setPartners(res.data);
            console.log(res.data)

        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed to fetch edition", "error");
        } finally {

        }
    };

    useEffect(() => {
        getPartners();
    }, [])

    const images = [
        {
            title: 'Explorez l’Aire Marine Protégée',
            description: 'Préservons ensemble les Îlots Nord de Kerkennah',
            imageUrl: '/images/aire_marines/marine1.jfif',
            path: '/protected-air-marine-coastal-areas/presentation/amcp'
        },
        {
            title :'Explorer le suivi scientifique',
            description : 'Protégeons ensemble la biodiversité de kerkennah',
            imageUrl : '/images/aire_marines/presentation/img6.jpg',
            path: '/protected-air-marine-coastal-areas/monitoring'
        }
    ]

    return (
        

        <div className=''>

            <HeroSection title="Des Partenaires Engagés pour un Futur Durable" subTitle=" Une collaboration avec des organisations locales et internationales pour renforcer la protection marine" imgSrc={partnersHero} />
            <PageTitle
                title="Présentation"
                width="w-[160px]"
            />

            <section className='px-4 sm:px-0'>
                <div className='max-w-6xl mx-auto'>

                    <section className='w-full flex flex-col sm:flex-row relative gap-4 md:gap-8 md:py-10 py-4'>
                        <AMCPSidebar />
                        <section className='w-fit flex flex-col gap-8 '>
                            <div className='flex justify-center sm:justify-start'>
                                <SectionTitle
                                    title="Partenaires AMCP "
                                    width='w-[160px]'
                                    spacing='mt-8 sm:mt-0'
                                    customClassName='!w-auto'
                                />
                            </div>
                            <PageParagraph>L'Aire Marine et Côtière Protégée des îlots nord de l'archipel de Kerkennah repose sur un réseau solide de partenaires engagés. Grâce à leur soutien, nous œuvrons ensemble pour protéger les richesses marines et côtières tout en assurant le développement durable des communautés locales. Nos collaborations s'appuient sur une vision commune : préserver l'écosystème unique de Kerkennah, renforcer la résilience face aux défis environnementaux, et promouvoir des pratiques de pêche durables. Découvrez comment chaque partenaire contribue à la réussite de notre mission et à la préservation de cet espace naturel exceptionnel.</PageParagraph>
                            <Partners partners={partners}/>
                        </section>
                    </section>
                    <section className='border-t border-[#000000] mb-10 '/>
                    <section className='flex items-start justify-center '>
                        <div className='w-full flex items-center justify-center mb-20'> 
                            <ContainerImageMarine images={images} />
                        </div>
                    </section>
                </div>

            </section>
        </div>
    )
}
