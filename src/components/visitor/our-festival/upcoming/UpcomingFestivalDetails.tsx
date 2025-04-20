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
import { AnchorLink } from "gatsby-plugin-anchor-links";

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

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
  const [loadingEdition, setLoadingEdition] = useState(true);
  const [loadingPrev, setLoadingPrev] = useState(true);
  const currentPath = location.pathname.replace(/\/$/, "");
  const lang = currentPath.startsWith("/fr") ? "fr" : "en";

  useEffect(() => {
    (async () => {
      try {
        const [edRes, prevRes] = await Promise.all([
          axios.get("/api/get-current-edition"),
          axios.get("/api/previous-editions"),
        ]);
        setEdition(edRes.data);
        setPrevEditions(prevRes.data);
      } catch (err: any) {
        Swal.fire(
          "Erreur",
          err.response?.data?.message || "Échec de la récupération des données",
          "error"
        );
      } finally {
        setLoadingEdition(false);
        setLoadingPrev(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection
        imgSrc={gallery[9]}
        title="Festival à Venir"
        subTitle="Une Nouvelle Aventure Culturelle vous Attend !"
      />

      <div className="w-full flex items-center justify-center p-4">
        <section className="max-w-7xl w-full">
          <ShareButton />

          <PageTitle
            title={
              <>
                <span className="block leading-[55px]">
                  Festival de la Culture des Îles Méditerranéennes
                </span>
                {loadingEdition ? (
                  <Shimmer className="h-8 w-52 mt-4 mx-auto sm:mx-0" />
                ) : (
                  edition && (
                    <span className="block leading-[55px]">
                      (Édition {edition.year})
                    </span>
                  )
                )}
              </>
            }
          />

          {/* ---------- SOUS‑TITRE (nom) ---------- */}
          {loadingEdition ? (
            <Shimmer className="h-8 w-3/4 max-w-lg mx-auto my-4" />
          ) : (
            edition && (
              <p className="text-[30px] sm:text-[40px] text-[#0270A0] text-center font-semibold italic my-4">
                {edition.name_en || edition.name_fr}
              </p>
            )
          )}

          {/* ---------- CONTENU ÉDITION ---------- */}
          {edition && !loadingEdition && (
            <>
              <PinnedImageSwap edition={edition} />

              {/* PROGRAMME */}
              <hr className="border-t border-black mt-10" />
              <SectionHeader
                title={
                  <>
                    <span className="text-primary">Programme</span> du Festival
                  </>
                }
                text="Explorez les moments forts et les activités qui rythmeront cette édition unique du festival"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center items-stretch lg:max-w-5xl md:max-w-3xl mx-auto mt-5">
                {edition.events?.map((event, idx) => (
                  <EventsEditionCards key={idx} event={event} />
                ))}
              </div>

              {/* PARTENAIRES */}
              <hr className="border-t border-black mt-10" />
              <SectionHeader
                title={
                  <>
                    <span className="text-[#0270A0]">Soutiens</span> Officiels
                    de cette Édition
                  </>
                }
                text="Découvrez les organisations et entreprises qui, par leur soutien et leur collaboration, rendent possible la célébration de notre patrimoine culturel, naturel et maritime."
              />
              <div className="mt-12">
                {loadingEdition ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-10">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Shimmer key={i} className="h-[150px] w-full rounded-[30px]" />
                    ))}
                  </div>
                ) : (
                  <Partners partners={edition.partners || []} />
                )}
              </div>

              {/* MÉDIAS */}
              <hr className="border-t border-black mt-10" />
              <SectionHeader
                title={
                  <>
                    <span className="text-[#0270A0]">Immersion Visuelle</span>{" "}
                    dans nos Éditions Passées
                  </>
                }
                text="Revivez les moments les plus marquants des festivals précédents à travers une sélection captivante de photos et vidéos"
              />
              <Media mediaContent={edition} />
            </>
          )}

          {/* ---------- MESSAGE QUAND PAS D'ÉDITION ---------- */}
          {!edition && !loadingEdition && (
            <div className="bg-[rgba(255,255,255,0.5)] shadow-helmi p-10 font-bold mt-6 text-start leading-[45px] text-lg rounded-lg">
              Aucun festival n'est encore programmé pour le moment ! Restez
              informé(e) en vous inscrivant à notre
              <AnchorLink
                to={`${lang}/our-festival/upcoming/#Newsletter`}
                title="Newsletter"
              >
                <span className="text-[#0077B6] underline mx-2 cursor-pointer">
                  Newsletter
                </span>
              </AnchorLink>{" "}
              : vous serez parmi les premiers à découvrir les dates et les
              détails de notre prochain Festival de la Culture des Îles
              Méditerranéennes de Kerkennah.
            </div>
          )}

          {/* ---------- ÉDITIONS PASSÉES ---------- */}
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

          {loadingPrev ? (
            <div className="flex justify-center my-12">
              <Shimmer className="h-[350px] w-full rounded-xl" />
            </div>
          ) : (
            <PastEditionsCarousel prevEditions={prevEditions} />
          )}
        </section>
      </div>

      {/* ---------- BOUTON TOUTES LES ÉDITIONS ---------- */}
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
