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
import PageParagraph2 from "@/components/atoms/PageParagraph2";

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

interface SectionHeaderProps {
  title: React.ReactNode;
  text: string;
}

const SectionHeader = ({ title, text }: SectionHeaderProps) => (
  <div className="flex flex-col items-center justify-center py-10">
    <Title size="text-2xl sm:text-[36px] pb-4">{title}</Title>
    <PageParagraph2>
      <p className="font-semibold text-lg sm:text-[20px] text-center max-w-3xl mx-auto">
        {text}
      </p>
    </PageParagraph2>
  </div>
);

export default function FestivalVenir() {
  const [edition, setEdition] = useState<IEdition | null>(null);
  const [prevEditions, setPrevEditions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [editionRes, prevEditionsRes] = await Promise.all([
          axios.get("/api/get-current-edition"),
          axios.get("/api/previous-editions")
        ]);
        setEdition(editionRes.data);
        setPrevEditions(prevEditionsRes.data);
      } catch (err: any) {
        Swal.fire("Erreur", err.response?.data?.message || "Échec de la récupération des données", "error");
      }
    };
    fetchData();
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
                <span className="block leading-[55px]">
                  (Édition {edition?.year})
                </span>
              </div>
            } 
          />
          <p className="text-[30px] sm:text-[40px] text-[#0270A0] text-center font-semibold italic my-4">
            {edition?.name_en || edition?.name_fr}
          </p>

          <PinnedImageSwap edition={edition} />

          <hr className="border-t border-black mt-10" />
          <SectionHeader 
            title={<span><span className="text-primary">Programme</span> du Festival</span>}
            text="Explorez les moments forts et les activités qui rythmeront cette édition unique du festival"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center items-stretch lg:max-w-5xl md:max-w-3xl mx-auto mt-5">
            {edition?.events?.map((event, index) => (
              <EventsEditionCards key={index} event={event} />
            ))}
          </div>

          <hr className="border-t border-black mt-10" />
          <SectionHeader 
            title={<span><span className="text-[#0270A0]">Soutiens</span> Officiels de cette Édition</span>}
            text="Découvrez les organisations et entreprises qui, par leur soutien et leur collaboration, rendent possible la célébration de notre patrimoine culturel, naturel et maritime. Leur engagement est au cœur de la réussite de cette édition exceptionnelle"
          />

          <div className="mt-12">
            <Partners partners={edition?.partners || []} />
          </div>

          <hr className="border-t border-black mt-10" />
          <SectionHeader 
            title={<span><span className="text-[#0270A0]">Immersion Visuelle</span> dans nos Éditions Passées</span>}
            text="Revivez les moments les plus marquants des festivals précédents à travers une sélection captivante de photos et vidéos"
          />

          <Media mediaContent={edition} />

          <hr className="border-t border-black mt-10" />
          <SectionHeader 
            title={<span><span className="text-[#0270A0]">Découvrez</span> nos Éditions Précédentes</span>}
            text="Plongez dans l'histoire et revivez les moments forts des éditions passées qui ont marqué Kerkenah"
          />

          <PastEditionsCarousel prevEditions={prevEditions} />
        </section>
      </div>

      <div className="flex items-center justify-center pt-6 pb-20">
        <LangLink to="/our-festival/previous/">
          <button className="px-8 py-3 my-4 bg-gradient-to-r from-[#006E9F] via-[#51ADC6] to-[#006E9F] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right text-white font-bold rounded-full shadow-md">
            Voir Toutes les Éditions Précédentes
          </button>
        </LangLink>
      </div>
    </div>
  );
}
