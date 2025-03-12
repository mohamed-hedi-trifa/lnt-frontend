import React from "react";
import achievementsHero from "@/assets/images/achievements-hero.jpg";
import PageTitle from "@/components/atoms/titles/PageTitle";
import SectionTitle from "@/components/atoms/titles/SectionTitle";
import AMCPSidebar from "@/components/layout/AMCPSidebar";
import ContainerImageMarine from "@/components/visitor/aire-marine/ContainerImageMarine";
import ExplorezSuiviTerrestre from "@/components/visitor/aire-marine/monitoring/terrestre/ExplorezSuiviTerrestre";
import HeroSection from "@/components/visitor/HeroSection";
import terrestrehero from "@/assets/images/Terrestres-hero.jpg";
import PageParagraph from "@/components/atoms/PageParagraph";
import List from "@/components/atoms/List";
import Title from "@/components/atoms/titles/Title";
import AMCPSuiviScientifiqueSidebar from "@/components/layout/AMCPSuiviScientifiqueSidebar";
export default function SuiviScientifique2() {
  const images = [
    {
      title: "Explorez l’Aire Marine Protégée",
      description: "Préservons ensemble les Îlots Nord de Kerkennah",
      imageUrl: "/images/marine_images/marine3.jpg",
    },
    {
      title: "Découvrez nos Partenaires",
      description: "Engagés pour la Protection des Îles de Kerkennah",
      imageUrl: "/images/marine_images/marine4.jpg",
    },
  ];

  return (
    <div className="">
      <HeroSection title="Protégeons les Richesses Terrestres de Kerkennah" subTitle="Préserver les écosystèmes terrestres pour un avenir durable" imgSrc={terrestrehero} />
      <div className="flex justify-center sm:justify-center pb-4 ">
        <PageTitle title="Suivi Scientifique"/>
      </div>
      <section className="px-4 sm:px-0">
        <div className="max-w-6xl mx-auto">
          <section className="w-full flex flex-col sm:flex-row relative gap-4 md:gap-8 py-2 md:py-10 pb-10">
            <AMCPSuiviScientifiqueSidebar />

            <section className="w-fit flex flex-col gap-8">
              <article className="flex flex-col gap-5">
                <div className="flex justify-center sm:justify-start">
                  <SectionTitle title="Suivi terrestre" width="w-[100px] sm:w-[160px]" spacing="mt-8 sm:mt-0" customClassName="!w-auto" />
                </div>
                    <div className="font-semibold text-[24px] sm:text-[28px] italic text-center sm:text-start">Protéger et comprendre les écosystèmes terrestres</div>

                <PageParagraph fontWeight="font-semibold">
                  Le suivi terrestre est une composante essentielle de la conservation environnementale.il s'agit d'observer, d'analyser et de protéger les
                  écosystémes terrestres et les espéces qui y vivent afin d'assurer leur durabilité pour les générations futures.
                </PageParagraph>
              </article>  

              <article className="flex flex-col gap-5">
                <Title size="text-[25px] sm:text-[28px]" variant="pill">
                 Objectifs du suivi Terrestre
                </Title>
                <PageParagraph>
                  <List
                    items={[
                      {
                        title: "",
                        content: "Surveiller l'état des habitats terrestres(zones littorales, dunes, etc.)",
                      },
                      {
                        title: "",
                        content: "Etudier les espéces fauniques et floristiques spécifiques aux ilots nord de Kerkennah",
                      },
                      {
                        title: "",
                        content: "Etudier les espéces fauniques et floristiques spécifiques aux ilots nord de Kerkennah",
                      },
                      {
                        title: "",
                        content: "Identifier les impacts bdes activités humaines et proposer des solutions pour limiter la dégradation",
                      },
                    ]}
                  />
                </PageParagraph>

                <img src="/images/marine_images/marine11.jpg" alt="Aire marine"  className="w-full max-w-[600px] mx-auto h-auto rounded-lg shadow-lg" />
              </article>

              <article className="flex flex-col gap-5">
                <Title size="text-[25px] sm:text-[28px]" variant="pill">
                Méthodologie Utilisée
                </Title>
                <PageParagraph>
                  <List
                    items={[
                      {
                        title: "Observation sur le terrain :",
                        content: "Recueil de données grace à des outils comme les dronnes, les GPS, et les piéges photographiques",
                      },
                      {
                        title: "Analyse des échantillons :",
                        content: "Etudes de la flore et de la faune pour comprendre l'impact des conditions environnementales",
                      },
                      {
                        title: "Suivi à long terme :",
                        content: "Comparaison des données pour observer les tendances",
                      },
                    ]}
                  />
                </PageParagraph>

                <img src="/images/marine_images/marine12.jpg" alt=""  className="w-full max-w-[600px] mx-auto h-auto rounded-lg shadow-lg" />
              </article>

              <article className="flex flex-col gap-5">
                <Title size="text-[25px] sm:text-[28px]" variant="pill">
                    Résultat et Importance
                </Title>
                <div className="ml-10 flex flex-col gap-5">
                  <PageParagraph>
                    <Title>Résultats</Title>
                    <List
                      items={[
                        {
                          title: "Cartographie des habitats terrestres :",
                          content: "dentification des zones critiques comme les dunes cotiéres ou les habitats d'espéces endémiques.",
                        },
                        {
                          title: "Suivi des espéces clés",
                          content: "Analyse des populations d'oiseaux nicheurs et des espéces végétales locales, mettant en évidence leur role écologiques",
                        },
                        {
                          title: "Données sur l'impact humain :",
                          content: "Etudes des pressions liées aux activités humaines, comme l'érosion et l'urbanisation, pour proposer des solutions adaptées",
                        },
                      ]}
                    />
                  
                  
                  
                    <Title>Importance</Title>

                    <List
                      items={[
                        {
                          title: "Peéservation des habitats terrestres :",
                          content: "Les résultats orientent les efforts pour protéger les écosystémes uniques des ilots nord Kerkennah",
                        },
                        {
                          title: "Soutien à la biodiversité :",
                          content: "Identification des espéces vulnérables et mis en place de mesures de convention.",
                        },
                        {
                          title: "Sensibilisation communautaire :",
                          content: "Les données permettent d'informer et de mobiliser les habitats pour aménagement durable.",
                        },
                      ]}
                    />
                 </PageParagraph> 
                </div>
                <img src="/images/marine_images/marine13.png" alt="" className="w-full max-w-[600px] mx-auto h-auto rounded-lg shadow-lg" />
              </article>
            </section>
          </section>
          <section className='border-t border-[#000000] pb-10'/>
          <ExplorezSuiviTerrestre />
        </div>
      </section>
    </div>
  );
}
