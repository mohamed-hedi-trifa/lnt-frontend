import React from 'react'
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import valuesHero from "../../../../assets/images/our-values-hero.jpg";
import ImageHistoire from '../our-team/ImageHistoire'
import HeroSection from '../../HeroSection'
import PageParagraph2 from '../../../atoms/PageParagraph2'

export default function OurValues() {
    return (
        <div>
            <HeroSection 
                title='Empowering Kerkennah: Our Mission & Vision' 
                subTitle="Building a resilient future for Kerkennah by uniting tradition, innovation, and sustainability" 
                imgSrc={valuesHero} 
            />
            <PageTitle title='Our Mission & Vision' />
            <section className='px-4 sm:px-0'>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10 pb-10'>
                        <Sidebar />
                     <section className='w-full flex flex-col gap-10 text-justify'>
                        <PageParagraph2 fontWeight="normal" spacing="normal">
                            At the core of our work lies a deep commitment to sustainable development, cultural preservation, and community empowerment. Our mission and vision serve as the foundation for every project we undertake, inspiring us to protect the natural beauty of Kerkennah and honor its rich heritage. Discover how our strategic goals drive positive change and shape a promising future for our island community
                        </PageParagraph2>
                         <img 
                             src='/images/principe1.png' 
                             alt="Kerkennah Archipelago" 
                             className="w-full h-auto rounded-lg" 
                         />
                          
                            <div>    
                                <span className="font-bold text-[38px] sm:text-[40px] sm:px-0 text-[#0270A0] gap-2">Our Mission</span>
                                <PageParagraph2 fontWeight="normal" spacing="normal">
                                     At the Association for Sustainable Development, Culture and Leisure (AKDDCL), our mission is to drive sustainable development in Kerkennah by protecting our unique marine and coastal environments while celebrating and preserving our rich cultural heritage. We empower local communities through education, innovative projects, and sustainable practices—promoting responsible fishing techniques, environmental awareness, and cultural events that honor traditional values
                                </PageParagraph2> 
                                <img 
                                    src='/images/principe1.png' 
                                    alt="Kerkennah Archipelago" 
                                    className="w-full max-w-[600px] mx-auto h-auto shadow-lg rounded-lg pt-6" 
                                />                           
                            </div>    
                           <div>
                            <span className="font-bold text-[38px] sm:text-[40px] sm:px-0 text-[#0270A0] gap-2">Our Vision</span>
                            <PageParagraph2 fontWeight="normal" spacing="normal">
                                     We envision Kerkennah as a model of environmental stewardship and cultural vitality. Our vision is to create a thriving community where nature and tradition coexist in harmony, inspiring future generations. We aim for an island where sustainable development, modern innovation, and time-honored traditions unite to ensure a resilient and prosperous future for all
                            </PageParagraph2> 
                            <img 
                                 src='/images/principe1.png' 
                                alt="Kerkennah Archipelago" 
                                className="w-full max-w-[600px] mx-auto h-auto shadow-lg rounded-lg pt-6" 
                            /> 
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
