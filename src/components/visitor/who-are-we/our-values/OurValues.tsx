import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ahmedYellow from "../../../../images/ahmed-yellow.png"
import fatmaB from "../../../../images/FatmaB.png"
import habibK from "../../../../images/HabibK.png"
import hakimS from "../../../../images/HakimS.png"
import jamilK from "../../../../images/JamilK.png"
import karimB from "../../../../images/KarimB.png"
import najahH from "../../../../images/NajahH.png"
import historyHero from "../../../../images/history-hero.jpg";
import ImageHistoire from '../our-team/ImageHistoire'
import Value from './Value'
import ParagraphTitle from './ParagraphTitle'


const IMAGES = [
    ahmedYellow,
    fatmaB,
    habibK,
    hakimS,
    jamilK,
    karimB,
    najahH
]

export default function OurValues() {

    return (
        <div className=''>
            <img className='w-full object-cover h-[50vh] sm:h-[80vh]' src={historyHero} />
            <PageTitle title='Our Values' width='w-[160px]' />
            <section className='px-4 sm:px-0'>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                    <Sidebar />

                    <section className='w-fit text-justify text-[22px] flex flex-col gap-10'>
                        <div className='leading-10'>Notre association, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), est profondément enracinée dans la préservation du patrimoine unique de Kerkennah et engagée dans le développement durable. Nos principes et valeurs guident chaque initiative, de la protection de l’environnement à l’inclusion sociale, et reflètent notre vision d’une communauté prospère et autonome.</div>
                        <img src='/images/principe1.png'alt="Kerkennah Archipelago" className="w-full  h-auto rounded-lg" />
                    
                        <ParagraphTitle title={'Nos principes : '}/>
                            
                            <Value
                                title={"Durabilité"}
                                imageUrl={"/images/principes/principe1.png"} titlesrc={"/images/principes/principe3.svg"} 
                                description={"Nous sommes déterminés à garantir que toutes nos actions respectent et préservent les ressources naturelles de Kerkennah, afin de transmettre ce patrimoine écologique aux générations futures. En soutenant des pratiques écologiques, nous nous assurons que l’île conserve sa biodiversité et sa beauté pour les années à venir.                    "}/>

                            <Value
                                title={"Autonomisation de la Communauté"}
                                imageUrl={"/images/principes/principe2.png"}
                                titlesrc={"/images/principes/principe2.svg"} 
                                description={"Nous croyons en la force de notre communauté pour conduire le changement et pérenniser les pratiques durables. En soutenant l’entrepreneuriat local, en particulier dans la pêche et l’artisanat, nous renforçons les capacités locales tout en préservant le savoir-faire ancestral de l’archipel."}     />

                            <Value
                                title={"Transparence"}
                                imageUrl={"/images/principes/principe3.png"}
                                titlesrc={"/images/principes/principe5.svg"} 
                                description={"Notre engagement envers la transparence est fondamental pour instaurer une relation de confiance avec la communauté. Nous communiquons de manière claire et honnête sur nos projets et initiatives, garantissant ainsi une gestion éthique et responsable."}   
                            />
                                <hr className="border-1 w-[272px] sm:w-[650px]" />
                          <ParagraphTitle title={'Valeurs fendamentales : '}/>
                            <Value
                                title={"Respect des Traditions"}
                                imageUrl={"/images/principes/principe4.png"}
                                titlesrc={"/images/principes/principe4.svg"} 
                                description={"Nous tenons à valoriser les pratiques traditionnelles de pêche et les coutumes locales qui rendent Kerkennah unique. L’association veille à ce que chaque projet prenne en compte l’héritage culturel de l’île, dans un équilibre harmonieux entre tradition et innovation."}   
                            />
                            <Value
                                title={"Collaboration"}
                                imageUrl={"/images/principes/principe5.png"}
                                titlesrc={"/images/principes/principe5.svg"} 
                                description={"Nous croyons en la force de l’union et en l’importance de collaborer avec des partenaires locaux, nationaux et internationaux. En travaillant main dans la main, nous amplifions notre impact et apportons une diversité d’expertise à nos projets"}     />
                            <Value
                                title={"Inclusion et Diversité"}
                                imageUrl={"/images/principes/principe6.png"}
                                titlesrc={"/images/principes/principe6.svg"} 
                                description={"L’AKDDCL favorise un environnement inclusif où chacun, indépendamment de son parcours ou de son origine, trouve sa place. En valorisant la diversité, nous enrichissons notre communauté et construisons un avenir où chacun peut s’épanouir."}     />
                    </section>
                    </section>
                <section className='border-t border-[#ADA5A5]'>
                    <ImageHistoire />
                </section>
                </div>
            </section>
        </div>
    )
}
