import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import HeroSection from '@/components/visitor/HeroSection';
import PageTitle from '@/components/atoms/titles/PageTitle';
import Title from '@/components/atoms/titles/Title';
import Partners from '@/components/visitor/who-are-we/partners/Partners';
import PinnedImageSwap from '@/components/visitor/our-festival/upcoming/SwappingImagesOnScroll';
import Media from '@/components/visitor/Media';
import PastEditionsCarousel from '@/components/visitor/our-festival/PastEditionsCarousel';
import EventsEditionCards from "@/components/visitor/our-festival/upcoming/EventsEditionCards";
import LangLink from "@/components/LangLink";
import IEdition from "@/models/IEdition";
import ShareButton from "@/components/visitor/our-festival/upcoming/ShareButton";

const gallery = [
  '/festivales_images/img1.jpg',
  '/festivales_images/img2.jpg',
  '/festivales_images/img3.jpg',
  '/festivales_images/img4.jpg',
  '/festivales_images/img5.jpg',
  '/festivales_images/img6.jpg',
  '/festivales_images/img7.jpg',
  '/festivales_images/img8.jpg',
  '/festivales_images/img9.jpg',
  '/festivales_images/img10.jpg',
  '/festivales_images/img.jpg',
];

export default function FestivalVenir() {
  const [edition, setEdition] = useState<IEdition>();
  const [prevEditions, setPrevEditions] = useState([]);

  const getEdition = async () => {
    try {
      const res = await axios.get("/api/get-current-edition");
      setEdition(res.data);
    } catch (err: any) {
      Swal.fire("Erreur", err.response?.data?.message || "Échec de la récupération de l'édition", "error");
    }
  };

  const getPrevEditions = async () => {
    try {
      const res = await axios.get("/api/previous-editions");
      setPrevEditions(res.data);
    } catch (err: any) {
      Swal.fire("Erreur", err.response?.data?.message || "Échec de la récupération des éditions", "error");
    }
  };

  useEffect(() => {
    getEdition();
    getPrevEditions();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection 
        imgSrc={gallery[9]} 
        title="Festival à Venir" 
        subTitle="Une Nouvelle Aventure Culturelle vous Attend !" 
      />

      <div className="w-full flex items-center justify-center p-4 relative">
        <section className="max-w-7xl w-full">
          <ShareButton />
          <PageTitle 
            title={
              <div>
                <span className="block leading-[55px]">
                  Festival de la Culture des Îles Méditerranéennes
                </span>
                <span className="block leading-[55px]">(Édition {edition?.year})</span>
              </div>
            } 
          />
          <p className="text-[30px] sm:text-[40px] text-[#0270A0] text-center font-semibold italic my-4">
            {edition?.name_en || edition?.name_fr}
          </p>

          <PinnedImageSwap edition={edition} />

          <div className="border-t border-black mt-10">
            <div className="flex flex-col items-center justify-center py-10">  
              <Title size="text-2xl sm:text-[36px]">
                <span className="text-primary">Programme</span> du Festival
              </Title>
              <p className="font-semibold text-lg sm:text-[20px] text-center">
                Explorez les moments forts et les activités qui rythmeront cette édition unique du festival
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center justify-center px-4 sm:px-0 mt-5">
            {edition?.events?.map((event, index) => (
              <EventsEditionCards key={index} event={event} />
            ))}
          </div>

          <hr className="border-t my-20 border-black" />

          <div className="flex items-center justify-center">
            <h2 className="text-xl sm:text-3xl font-bold text-center">
              <span className="text-[#0270A0]">Soutiens</span> Officiels de cette Édition
            </h2>
          </div>

          <div className="text-center text-base sm:text-[20px] font-semibold leading-[30px] my-6 mx-20">
            <p>Découvrez les organisations et entreprises qui, par leur soutien et leur collaboration, rendent possible la célébration de notre patrimoine culturel, naturel et maritime Leur engagement est au cœur de la réussite de cette édition exceptionnelle.</p>
          </div>

          <div className="mt-12">
            <Partners partners={edition?.partners || []} />
          </div>

          <div className="text-center my-10">
            <h2 className="text-xl sm:text-3xl font-bold">
              <span className="text-[#0270A0]">Immersion Visuelle</span> dans nos Éditions Passées
            </h2>
          </div>

          <div className="text-center text-base sm:text-[20px] font-semibold leading-[30px] my-10 mx-20">
            <p>Revivez les moments les plus marquants des festivals précédents à travers une sélection captivante de photos et vidéos.</p>
          </div>

          <Media mediaContent={edition} />

          <hr className="mb-12 mt-20 border-black" />

          <div className="text-center mb-3">
            <h2 className="text-xl sm:text-3xl font-bold">
              <span className="text-[#0270A0]">Découvrez</span> nos Éditions Précédentes
            </h2>
          </div>

          <div className="text-center text-base sm:text-[20px] font-semibold leading-[30px] mt-5 mb-10 max-w-3xl mx-auto">
            <p>Plongez dans l'histoire et revivez les moments forts des éditions passées qui ont marqué Kerkenah.</p>
          </div>

          <PastEditionsCarousel prevEditions={prevEditions} />
        </section>
      </div>

      <div className="flex items-center justify-center pt-6 pb-20">
        <LangLink to="/our-festival/previous/">
          <button className="px-8 py-3 my-4  bg-[linear-gradient(to_right,#006E9F,#51ADC6,#006E9F)] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right  text-white font-bold rounded-full shadow-lg">
            <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Voir Toutes les Éditions Précédentes </p>
          </button>
        </LangLink>
      </div>
    </div>
  );
}
