import React from 'react'
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ahmedYellow from "../../../../assets/images/ahmed-yellow.png"
import fatmaB from "../../../../assets/images/FatmaB.png"
import habibK from "../../../../assets/images/HabibK.png"
import hakimS from "../../../../assets/images/HakimS.png"
import jamilK from "../../../../assets/images/JamilK.png"
import karimB from "../../../../assets/images/KarimB.png"
import najahH from "../../../../assets/images/NajahH.png"
import valuesHero from "../../../../assets/images/our-values-hero.jpg";
import ImageHistoire from '../our-team/ImageHistoire'
import Value from './Value'
import ParagraphTitle from './ParagraphTitle'
import HeroSection from '../../HeroSection'
import PageParagraph from '../../../atoms/PageParagraph'

export default function OurValues() {
    return (
        <div>
            <HeroSection 
                title='Nos Principes : Notre Boussole' 
                subTitle="Des valeurs fortes guident notre mission : tradition, inclusion, transparence, et collaboration pour un avenir durable" 
                imgSrc={valuesHero} 
            />
            <PageTitle title='Our Values' />
            <section className='px-4 sm:px-0'>
                <div className='max-w-6xl mx-auto'>
                    {/* Layout principal : en colonne sur mobile, en ligne sur desktop */}
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10 pb-10'>
                        <Sidebar />
                        {/* Modification de w-fit en w-full pour occuper toute la largeur disponible */}
                        <section className='w-full flex flex-col gap-10 text-justify'>
                            <PageParagraph fontWeight="normal" spacing="normal">
                                Notre association, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), est profondément enracinée dans la préservation du patrimoine unique de Kerkennah et engagée dans le développement durable. Nos principes et valeurs guident chaque initiative, de la protection de l’environnement à l’inclusion sociale, et reflètent notre vision d’une communauté prospère et autonome.
                            </PageParagraph>
                            <img 
                                src='/images/principe1.png' 
                                alt="Kerkennah Archipelago" 
                                className="w-full h-auto rounded-lg" 
                            />
                        
                            <ParagraphTitle title={'Nos principes : '} />
                                
                            <Value
                                title={"Durabilité"}
                                imageUrl={"/images/principes/principe1.png"} 
                                titlesrc={"/images/principes/principe3.svg"} 
                                description={"Nous sommes déterminés à garantir que toutes nos actions respectent et préservent les ressources naturelles de Kerkennah, afin de transmettre ce patrimoine écologique aux générations futures. En soutenant des pratiques écologiques, nous nous assurons que l’île conserve sa biodiversité et sa beauté pour les années à venir."}
                            />
                                
                            <Value
                                title={"Autonomisation de la Communauté"}
                                imageUrl={"/images/principes/principe2.png"}
                                titlesrc={"/images/principes/principe2.svg"} 
                                description={"Nous croyons en la force de notre communauté pour conduire le changement et pérenniser les pratiques durables. En soutenant l’entrepreneuriat local, en particulier dans la pêche et l’artisanat, nous renforçons les capacités locales tout en préservant le savoir-faire ancestral de l’archipel."}
                            />

                            <Value
                                title={"Transparence"}
                                imageUrl={"/images/principes/principe3.png"}
                                titlesrc={"/images/principes/principe5.svg"} 
                                description={"Notre engagement envers la transparence est fondamental pour instaurer une relation de confiance avec la communauté. Nous communiquons de manière claire et honnête sur nos projets et initiatives, garantissant ainsi une gestion éthique et responsable."}
                            />
                            
                            {/* Ligne horizontale responsive */}
                            <div className="flex justify-center my-4">
                                <hr className="w-full max-w-full border-t border-black" />
                            </div>
                            
                            <ParagraphTitle title={'Valeurs fondamentales : '} />
                            
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
                                description={"Nous croyons en la force de l’union et en l’importance de collaborer avec des partenaires locaux, nationaux et internationaux. En travaillant main dans la main, nous amplifions notre impact et apportons une diversité d’expertise à nos projets"}
                            />
                            
                            <Value
                                title={"Inclusion et Diversité"}
                                imageUrl={"/images/principes/principe6.png"}
                                titlesrc={"/images/principes/principe6.svg"} 
                                description={"L’AKDDCL favorise un environnement inclusif où chacun, indépendamment de son parcours ou de son origine, trouve sa place. En valorisant la diversité, nous enrichissons notre communauté et construisons un avenir où chacun peut s’épanouir."}
                            />

                            {/* Ligne horizontale responsive */}
                            <div className="flex justify-center my-4">
                                <hr className="w-full max-w-full border-t border-black" />
                            </div>
                            <div>    
                                <span className="font-bold text-[38px] sm:text-[40px] sm:px-0 text-[#0270A0]">Notre Mission</span>
                                <PageParagraph fontWeight="normal" spacing="normal">
                                    Nous œuvrons pour la protection et la valorisation des richesses naturelles et culturelles de Kerkennah. Notre mission consiste à mettre en œuvre des initiatives durables qui allient préservation de l'environnement, promotion des traditions locales et développement communautaire. Grâce à nos projets et collaborations, nous souhaitons renforcer l'engagement local, sensibiliser aux enjeux environnementaux, et offrir des opportunités de développement économique respectueux de la nature
                                </PageParagraph>                            
                            </div>    
                           <div>
                            <span className="font-bold text-[38px] sm:text-[40px] sm:px-0 text-[#0270A0]">Notre Vision</span>
                            <PageParagraph fontWeight="normal" spacing="normal">
                            Nous aspirons à faire de Kerkennah un modèle de durabilité et d'excellence culturelle. Notre vision est celle d'un archipel où la biodiversité marine et terrestre est protégée, où les traditions se perpétuent en harmonie avec l'innovation, et où la communauté s'épanouit grâce à un développement équilibré. Nous envisageons un avenir où l'interaction entre l'homme et la nature se traduit par des actions concrètes et inspirantes, faisant de Kerkennah un exemple à suivre.
                            </PageParagraph> 
                           </div>


                        </section>
                    </section>
                    <section className='border-t border-black pb-20'>
                        <ImageHistoire />
                    </section>
                </div>
            </section>
        </div>
    )
}
