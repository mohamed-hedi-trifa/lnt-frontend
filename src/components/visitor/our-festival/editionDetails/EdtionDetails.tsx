import React, { useState, useEffect } from "react";
import previousEditionImage from '../../../../assets/images/editionDetails.jpg'
import PageTitle from '@/components/atoms/titles/PageTitle';
import PageParagraph from '@/components/atoms/PageParagraph';
import EdtionEvent from './EdtionEvent';
import axios from "axios";
import Swal from "sweetalert2";
import Media from "../../Media";
import Partners from "../../who-are-we/partners/Partners";
import PastEditionsCarousel from "../PastEditionsCarousel";
import LangLink from "@/components/LangLink";
import PageParagraph2 from "@/components/atoms/PageParagraph2";
import Title from '@/components/atoms/titles/Title';

interface SectionHeaderProps {
  title: React.ReactNode;
  text: string;
}

const SectionHeader = ({ title, text }: SectionHeaderProps) => (
  <div className="flex flex-col items-center text-center justify-center py-10">
    <Title size="text-2xl sm:text-[36px] pb-4">{title}</Title>
    <PageParagraph2>
      <p className="font-semibold text-lg sm:text-[20px] text-center max-w-4xl mx-auto">
        {text}
      </p>
    </PageParagraph2>
  </div>
);

export default function EditionDetails({ location, params }: { location: any; params: any }) {
    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");

    const [loading, setLoading] = useState(true);
    const [isOpened, setIsOpened] = useState(false);
    const [slug, setSlug] = useState<string | null>(null);
    const [previousEdition, setPreviousEdition] = useState<any>(null);
    const [allPreviousEdition, setallPreviousEdition] = useState<any>(null);

    const getPreviousEdition = async () => {
        try {

            const res = await axios.get(`/api/previous-editions/${slug}`);
            setPreviousEdition(res.data);

            const res2 = await axios.get(`/api/previous-editions/`);

            const filteredEditions = res2.data.filter(edition => edition.slug !== slug);

            setallPreviousEdition(filteredEditions);
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed to fetch edition", "error");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!slug) return;


        getPreviousEdition();
    }, [slug]);


    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);


    return (
        <div>
            <main className={`relative`}>

                <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
                <div className="relative text-center w-full">
                    <img className="w-full object-cover h-[301px] sm:h-[607px]"
                        src={`${process.env.GATSBY_API_URL}${previousEdition?.image}`} alt={previousEdition?.name_en || previousEdition?.name_fr} />
                    <div className="absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0"></div>


                </div>

                <section className="my-16 text-center max-w-7xl  mx-auto w-full  mt-11 px-5 ">
                    <PageTitle title={`Éditions ${previousEdition?.year}`} />

                    <h2 className='text-[#0270A0] text-2xl pb-7 font-semibold'>{previousEdition?.name_en || previousEdition?.name_fr}</h2>
                    <PageParagraph2 fontWeight="font-semibold" spacing="leading-[1.4]">{previousEdition?.description_en || previousEdition?.description_fr}</PageParagraph2>

                </section>



                <section className='flex  flex-col sm:flex-row   text-center sm:max-w-7xl w-full sm:mx-auto justify-start items-start  mt-4 sm:px-5 h-fit   '>



                </section>
                <section >
                    <h1 className='text-[#0270A0] text-3xl sm:text-start font-bold max-w-7xl w-full mx-auto mb-10 px-5 '>Événements :</h1>


                    {previousEdition?.previousEvents.map((event: any, index: number) => (
                        <div
                            key={event.id}
                            className={index % 2 === 1 ? "bg-[#EFEFEF]" : "bg-transparent"}
                            style={{ marginBottom: "20px" }} // Add space between each event
                        >
                            <div className='flex-col text-center max-w-7xl w-full mx-auto justify-between px-5 pt-8 pb-10'>
                                <EdtionEvent event={event} />
                            </div>
                        </div>
                    ))}




                </section>
                {
                    (previousEdition?.images?.length > 0 || previousEdition?.videos?.length > 0) && (
                        <section className='flex-col text-center max-w-7xl w-full mx-auto justify-between px-5 h-fit my-10 mb-10'>
                            <hr className="border-t border-black mt-10" />
                            <SectionHeader 
                              title={<span><span className='text-[#0270A0]'>Immersion Visuelle</span> dans l'Édition {previousEdition?.year}</span>}
                              text="Revivez les moments forts du festival à travers nos photos et vidéos captivantes"
                            />
                            <Media mediaContent={previousEdition} />
                        </section>
                    )
                }


                <section className=' flex-col  text-center max-w-7xl w-full mx-auto justify-between   px-5 h-fit  my-10 mb-10'>
                    <hr className="border-t border-black mt-10" />
                    <SectionHeader 
                      title={<span><span className='text-[#0270A0]'>Soutiens</span> Officiels de cette Edition {previousEdition?.year}</span>}
                      text="Découvrez les organisations et entreprises qui, par leur soutien et leur collaboration rendent possible la célébration de notre patrimoine culturel, naturel et maritime Leur engagement est au soeur de la réussite de cette édition exceptionelle"
                    />
                    <Partners partners={previousEdition?.partners} />
                </section>

       
                        <section className='flex-col text-center max-w-7xl w-full mx-auto justify-between px-5 h-fit '>
                            <hr className="border-t border-black mt-10" />
                            <SectionHeader 
                              title={<span><span className="text-[#0270A0]">Découvrez</span> Nos Autres Éditions Précédentes</span>}
                              text="Plongez dans l'histoire et revivez les moments forts des éditions passées qui ont marqué Kerkenah"
                            />

                            <PastEditionsCarousel prevEditions={allPreviousEdition} />
                        </section>

                         <div className="flex items-center justify-center pt-2 pb-20 px-6">
                           <LangLink to="/our-festival/previous/">
                             <button className="px-8 py-3 my-4 bg-gradient-to-r from-[#006E9F] via-[#51ADC6] to-[#006E9F] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right text-white font-bold rounded-full shadow-md">
                               Voir Toutes les Éditions Précédentes
                             </button>
                           </LangLink>
                         </div> 
             





            </main>
        </div>
    )
}
