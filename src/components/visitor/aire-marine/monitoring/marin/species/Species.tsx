import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "gatsby";
import achievementsHero from "../../../../../../assets/images/achievements-hero.jpg";
import SectionTitle2 from "@/components/atoms/titles/SectionTitle2";
import Title from "@/components/atoms/titles/Title";
import PageParagraph from "@/components/atoms/PageParagraph";
import BlogList from "./BlogList";
import SpeciesTitle from "@/components/atoms/titles/SpeciesTitle";
import DecouvrezDautresEspeces from "./DecouvrezDautresEspeces";
import Media from "@/components/visitor/Media";
import AMCPSuiviScientifiqueSidebar from "@/components/layout/AMCPSuiviScientifiqueSidebar";
import PdfIcon from "@/assets/icons/PdfIcon.png";

import TableSpecies from "./TableSpecies";
import Loader from "@/components/atoms/loader";

// Fonction utilitaire pour parser le contenu markdown
const parseContent = (content: string): string => {
  if (!content) return "";

  // Remplacer **texte** par <strong>texte</strong>
  const boldParsed = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Détecter les URLs et les convertir en liens cliquables
  const linkParsed = boldParsed.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" class="markdown-link" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return linkParsed;
};

export default function Species({ location, params }: { location: any; params: any }) {
  const [blogSpecies, setBlogSpecies] = useState<any>(null);
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const slug = params.slug;
    if (slug) {
      axios
        .get(`/api/species/${slug}`)
        .then((res) => {
          res.data.content_items.forEach((item: any) => {
            if (item.type === "list") {
              try {
                item.content = JSON.parse(item.content);
              } catch (error) {
                console.error("Erreur lors du parsing du contenu de type 'list' :", error);
              }
            }
          });

          setBlogSpecies(res.data);

          const searchParams = new URLSearchParams(location.search);
          const urlLanguage = searchParams.get("lang");

          if (urlLanguage && res.data[`title_${urlLanguage}`]) {
            setLanguage(urlLanguage);
          } else {
            setLanguage(res.data.title_en ? "en" : "fr");
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du blog post :", err);
          navigate("/404");
        });
    }
  }, [location, params.slug]);

  if (!blogSpecies) {
    return (
      <div className="flex justify-center items-center pt-40">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="min-h-full bg-cover bg-center md:bg-fixed bg-local"
      style={{ backgroundImage: `url(${process.env.GATSBY_API_URL}${blogSpecies.image})` }}
    >
      <img
        className="w-full h-[50vh] md:h-[80vh] object-cover"
        src={achievementsHero}
        alt="Achievements Hero"
      />

      <div className="flex justify-center pb-4">
        <SpeciesTitle
          title={blogSpecies[`title_${language}`] || ""}
          width="w-[160px]"
          fontSize="text-[48px] md:text-[64px] text-start"
        />
      </div>

      <section className="px-4 sm:px-6 lg:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row relative sm:gap-8">
            <AMCPSuiviScientifiqueSidebar />
            <div className="grow w-full flex flex-col mx-auto shadow-helmi gap-4 rounded-[12px] bg-[rgba(255,255,255,0.8)] px-4 sm:px-0">
              {/* Sous-titre */}
              <SectionTitle2
                title={blogSpecies[`subtitle_${language}`] || ""}
                width="w-full"
                color="#000000"
                fontSize="text-[28px] lg:text-[36px] text-center sm:text-start font-semibold italic"
                spacing="sm:mt-0 px-2 sm:px-10 pt-6"
              />

              {/* Résumé */}
              {blogSpecies[`summary_${language}`] && (
                <div className="px-4 sm:px-16 text-center sm:text-start">
                  <PageParagraph>
                    {blogSpecies[`summary_${language}`]}
                  </PageParagraph>
                </div>
              )}

              {/* Liste des items de type "list" */}
              {blogSpecies.content_items
                ?.filter((item: any) => item.language === language && item.type === "list")
                .sort((a: any, b: any) => a.order - b.order)
                .map((item: any) => <BlogList key={item.id} content={item.content} />)}

              {/* Autres contenus */}
              {blogSpecies.content_items
                ?.filter((item: any) => item.language === language && item.type !== "list")
                .sort((a: any, b: any) => a.order - b.order)
                .map((item: any) => {
                  switch (item.type) {
                    case "title":
                      return (
                        <Title
                          variant="pill"
                          size="text-[24px] sm:text-[24px]"
                          key={item.id}
                          customClassName="items-start sm:px-10 mt-2"
                        >
                          {item.content}
                        </Title>
                      );
                    case "text":
                      return (
                        <PageParagraph key={item.id}>
                          <div
                            className="px-4 sm:px-16 sm:text-start"
                            dangerouslySetInnerHTML={{ __html: parseContent(item.content) }}
                          />
                        </PageParagraph>
                      );
                    case "image":
                      return (
                        <div key={item.id} className="mb-2">
                          <img
                            src={`${process.env.GATSBY_API_URL}${item.file_path}`}
                            alt=""
                            className="w-full max-w-[600px] mx-auto max-h-[400px] rounded-lg shadow-lg mb-4"
                          />
                        </div>
                      );
                    case "pdf":
                      return (
                        <div key={item.id}>
                          <a
                            download
                            href={`${process.env.GATSBY_API_URL}${item.file_path}`}
                          >
                            <div className="mb-10 flex items-center  sm:px-10">
                             <img className="h-16 w-[50px]" src={PdfIcon} alt="PDF Icon" />
                             <p className="ml-4 font-semibold text-[18px] text-[#0270A0] underline">
                             {item.file_path.split('/').pop().split('5555_')[1]}
                              </p>
                            </div>
                          </a>
                        </div>
                      );
                    case "cin":
                      return (
                        <div key={item.id} className="col-span-10 p-2 px-5">
                          <div className="p-5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black flex flex-col gap-6">
                            {/* Scientific Name */}
                            <div className="flex items-center gap-3 flex-wrap">
                              <img src="/icons/etiqueter.png" alt="" />
                              <div className="flex-1 inline-flex flex-col gap-1">
                                <div className="text-black text-xl font-bold leading-7">
                                  Nom scientifique
                                </div>
                                <div className="text-black text-xl font-medium leading-7">
                                  {blogSpecies.scientific_name_en || blogSpecies.scientific_name_fr}
                                </div>
                              </div>
                            </div>
                            <hr className="border-stone-400" />

                            {/* Distribution / Habitat */}
                            <div className="flex items-center gap-3 flex-wrap">
                              <img src="/icons/monde.png" alt="" />
                              <div className="flex-1 inline-flex flex-col gap-1">
                                <div className="text-black text-xl font-bold leading-7">
                                  Répartition / Habitat
                                </div>
                                <div className="text-black text-xl font-medium leading-7">
                                  {blogSpecies.distribution_habitat_en || blogSpecies.distribution_habitat_fr}
                                </div>
                              </div>
                            </div>
                            <hr className="border-stone-400" />

                            {/* Size & Morphology */}
                            <div className="flex items-center gap-3 flex-wrap">
                              <img src="/icons/regle.png" alt="" />
                              <div className="flex-1 inline-flex flex-col gap-1">
                                <div className="text-black text-xl font-bold leading-7">
                                  Taille et Morphologie
                                </div>
                                <div className="text-black text-xl font-medium leading-7">
                                  {blogSpecies.size_morphology_en || blogSpecies.size_morphology_fr}
                                </div>
                              </div>
                            </div>
                            <hr className="border-stone-400" />

                            {/* Diet */}
                            <div className="flex items-center gap-3 flex-wrap">
                              <img src="/icons/coutellerie.png" alt="" />
                              <div className="flex-1 inline-flex flex-col gap-1">
                                <div className="text-black text-xl font-bold leading-7">
                                  Régime alimentaire
                                </div>
                                <div className="text-black text-xl font-medium leading-7">
                                  {blogSpecies.diet_en || blogSpecies.diet_fr}
                                </div>
                              </div>
                            </div>
                            <hr className="border-stone-400" />

                            {/* Conservation Status */}
                            <div className="flex items-center gap-3 flex-wrap">
                              <img src="/icons/point-dexclamation.png" alt="" />
                              <div className="flex-1 inline-flex flex-col gap-1">
                                <div className="text-black text-xl font-bold leading-7">
                                  Statut de Conservation
                                </div>
                                <div className="text-black text-xl font-medium leading-7">
                                  {blogSpecies.conservation_status_en || blogSpecies.conservation_status_fr}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
            </div>
          </div>
        </div>
      </section>

      {/* Immersion visuelle */}
      <div className="w-full bg-[rgba(255,255,255,0.8)] mt-[60px] shadow-helmi">
        <div className="max-w-6xl mx-auto px-4 sm:px-0">
          <div className="flex flex-col items-center justify-center py-10">
            <h1 className="text-[28px] sm:text-[36px] font-bold text-center">
              <span className="text-[#0270A0]">Immersion visuelle</span> dans l'écosystème de {blogSpecies.title_fr || blogSpecies.title_en}
            </h1>
            <PageParagraph>
              <p className="text-[20px] font-semibold mt-4 mx-4 sm:mx-20 text-center">
                Découvrez la richesse visuelle de {blogSpecies.title_fr || blogSpecies.title_en} à travers des images captivantes et des vidéos éducatives
              </p>
            </PageParagraph>
          </div>
          <Media mediaContent={blogSpecies} />
          <hr className="my-10 border-1 border-[#000000]" />

          {/* Recherche et connaissance */}
          <div className="text-center mx-4 sm:mx-20">
            <h1 className="text-[28px] sm:text-[36px] font-bold">
              <span className="text-[#0270A0]">Recherche</span> et Connaissances sur {blogSpecies.title_research_knowledge_en || blogSpecies.title_research_knowledge_fr}
            </h1>
          </div>
          <PageParagraph>
            <div className="mx-4 sm:mx-28 py-4 font-semibold text-[18px] sm:text-[20px] text-center">
              {blogSpecies.description_research_knowledge_en || blogSpecies.description_research_knowledge_fr}
            </div>
          </PageParagraph>
          <TableSpecies data={blogSpecies.researchKnowledge} />

          {/* Découvrir autres espèces */}
          <section className="border-t border-[#000000] mt-10 py-10">
            <DecouvrezDautresEspeces currentBlog={blogSpecies} />
          </section>
        </div>
      </div>
    </div>
  );
}
