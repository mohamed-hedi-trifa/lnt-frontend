import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import HeroSection from "@/components/visitor/HeroSection";
import PageTitle from "@/components/atoms/titles/PageTitle";
import Partners from "@/components/visitor/who-are-we/partners/Partners";
import PinnedImageSwap from "@/components/visitor/our-festival/upcoming/SwappingImagesOnScroll";
import Media from "@/components/visitor/Media";
import PastEditionsCarousel from "@/components/visitor/our-festival/PastEditionsCarousel";
import EventsEditionCards from "@/components/visitor/our-festival/upcoming/EventsEditionCards";
import LangLink from "@/components/LangLink";
import IEdition from "@/models/IEdition";
import ShareButton from "@/components/visitor/our-festival/upcoming/ShareButton";
import SectionHeader from "@/components/SectionHeader";
import LoadingSpinner from "./LoadingSpinner";

const ShimmerBar = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
)

const gallery = [
  "/festivales_images/img1.jpg",
  "/festivales_images/img2.jpg",
  "/festivales_images/img3.jpg",
  "/festivales_images/img4.jpg",
  "/festivales_images/img5.jpg",
  "/festivales_images/img6.jpg",
  "/festivales_images/img7.jpg",
  "/festivales_images/img8.jpg",
  "/festivales_images/img9.jpg",
  "/festivales_images/img10.jpg",
  "/festivales_images/img.jpg",
];

export default function FestivalVenir() {
  const [edition, setEdition] = useState<IEdition | null>(null);
  const [prevEditions, setPrevEditions] = useState<IEdition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPrevEditions, setIsLoadingPrevEditions] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsLoadingPrevEditions(true);
        
        const [editionRes, prevEditionsRes] = await Promise.all([
          axios.get("/api/get-current-edition"),
          axios.get("/api/previous-editions"),
        ]);
        
        setEdition(editionRes.data);
        setPrevEditions(prevEditionsRes.data);
      } catch (err: any) {
        Swal.fire(
          "Erreur",
          err.response?.data?.message ||
            "Échec de la récupération des données",
          "error"
        );
      } finally {
        setIsLoading(false);
        setIsLoadingPrevEditions(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
     <ShimmerBar className="h-6 w-full" />
      </div>
    );
  }

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
              edition ? (
                <>
                  <span className="block leading-[55px]">
                    Festival de la Culture des Îles Méditerranéennes
                  </span>
                  <span className="block leading-[55px]">
                    (Édition {edition.year})
                  </span>
                </>
              ) : (
                <span>Festival de la Culture des Îles Méditerranéennes</span>
              )
            }
          />

          {edition ? (
            <p className="text-[30px] sm:text-[40px] text-[#0270A0] text-center font-semibold italic my-4">
              {edition.name_en || edition.name_fr}
            </p>
          ) : (
            <div className='w-full'>
              <div className="bg-[rgba(255,255,255,0.5)] shadow-helmi p-10 font-bold mt-6 text-start leading-[45px] text-lg rounded-lg">
                Aucun festival n'est encore programmé pour le moment !
                Restez informé(e) en vous inscrivant à notre newsletter : vous serez parmi les premiers à découvrir les dates et les détails de notre prochain Festival de la Culture des Îles Méditerranéennes de Kerkennah.
              </div>
            </div>
          )}

          {edition && (
            <>
              <PinnedImageSwap edition={edition} />

              <hr className="border-t border-black mt-10" />
              <SectionHeader
                title={
                  <>
                    <span className="text-primary">Programme</span> du Festival
                  </>
                }
                text="Explorez les moments forts et les activités qui rythmeront cette édition unique du festival"
              />

              {isLoading ? (
                <div className="flex justify-center my-12">
            <ShimmerBar className="h-6 w-full" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center items-stretch lg:max-w-5xl md:max-w-3xl mx-auto mt-5">
                  {edition.events?.map((event, index) => (
                    <EventsEditionCards key={index} event={event} />
                  ))}
                </div>
              )}

              <hr className="border-t border-black mt-10" />
              <SectionHeader
                title={
                  <>
                    <span className="text-[#0270A0]">Soutiens</span> Officiels de
                    cette Édition
                  </>
                }
                text="Découvrez les organisations et entreprises qui, par leur soutien et leur collaboration, rendent possible la célébration de notre patrimoine culturel, naturel et maritime."
              />

              <div className="mt-12">
                <Partners partners={edition.partners || []} />
              </div>
              
              <hr className="border-t border-black mt-10" />
              <SectionHeader
                title={
                  <>
                    <span className="text-[#0270A0]">Immersion Visuelle</span> dans
                    nos Éditions Passées
                  </>
                }
                text="Revivez les moments les plus marquants des festivals précédents à travers une sélection captivante de photos et vidéos"
              />
    
              <Media mediaContent={edition} />
            </>
          )}

          <hr className="border-t border-black mt-10" />
          <SectionHeader
            title={
              <>
                <span className="text-[#0270A0]">Découvrez</span> nos Éditions
                Précédentes
              </>
            }
            text="Plongez dans l'histoire et revivez les moments forts des éditions passées qui ont marqué Kerkennah"
          />

          {isLoadingPrevEditions ? (
            <div className="flex justify-center my-12">
         <ShimmerBar className="h-6 w-full" />
            </div>
          ) : (
            <PastEditionsCarousel prevEditions={prevEditions} />
          )}
        </section>
      </div>

      <div className="flex items-center justify-center pt-2 pb-20 px-6">
        <LangLink to="/our-festival/previous/">
          <button className="px-8 py-3 my-4 bg-gradient-to-r from-[#006E9F] via-[#51ADC6] to-[#006E9F] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right text-white font-bold rounded-full shadow-md">
            Voir Toutes les Éditions Précédentes
          </button>
        </LangLink>
      </div>
    </div>
  );
}