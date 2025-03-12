import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ahmedYellow from "../../../../assets/images/ahmed-yellow.png"
import fatmaB from "../../../../assets/images/FatmaB.png"
import habibK from "../../../../assets/images/HabibK.png"
import hakimS from "../../../../assets/images/HakimS.png"
import jamilK from "../../../../assets/images/JamilK.png"
import karimB from "../../../../assets/images/KarimB.png"
import najahH from "../../../../assets/images/NajahH.png"
import partnersHero from "../../../../assets/images/partners-hero.jpg";
import ImageHistoire from '../our-team/ImageHistoire'
import Partners from './Partners'
import HeroSection from '../../HeroSection'


const IMAGES = [
    ahmedYellow,
    fatmaB,
    habibK,
    hakimS,
    jamilK,
    karimB,
    najahH
]

export default function PartnersPage() {
    const [partners, setPartners] = useState<any>(null);
    const getPartners = async () => {
        try {

            const res = await axios.get("/api/get-general-parteners");
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
    return (
        <div className=''>
            <HeroSection imgSrc={partnersHero} title="Des Alliances pour un Futur Meilleur" subTitle="Nos partenaires locaux et internationaux sont au cœur de nos succès : ensemble, nous façonnons un avenir durable" />
            <PageTitle title='Partners' />
            <section className='px-4 sm:px-0' >

                <section className='max-w-6xl mx-auto flex flex-col gap-12'>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                        <Sidebar />

                        <section className='w-fit text-justify text-[22px]'>
                            <div className="text-black text-justify font-montserrat text-[22px] font-medium leading-[39px]"                        >
                                Le succès des projets de l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) repose en grande partie sur la collaboration et le soutien de nos partenaires. Grâce à eux, nous avons pu concrétiser des initiatives environnementales, culturelles et éducatives au service de l’archipel de Kerkennah et de sa communauté. Nos partenaires incluent des organisations locales et internationales, des institutions académiques, des ONG, et des entreprises privées qui partagent notre engagement pour la durabilité, la préservation de la culture et la promotion de la biodiversité. Chaque partenariat enrichit nos projets par l’échange de savoir-faire, de ressources et de perspectives, renforçant ainsi notre mission.
                            </div>

                        </section>
                    </section>
                    <section>
                        <Partners partners={partners} />
                    </section>
                    <section className='border-t border-black sm:pb-20 pb-20'>
                        <ImageHistoire />
                    </section>
                </section>
            </section>
        </div>
    )
}
