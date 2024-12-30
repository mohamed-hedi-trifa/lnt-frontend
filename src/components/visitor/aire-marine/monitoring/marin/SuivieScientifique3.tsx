import React from "react";
import PageTitle from "@/components/atoms/titles/PageTitle";
import marinHero from "@/assets/images/marin-hero.jpg";
import AMCPSidebar from "@/components/layout/AMCPSidebar";
import SectionTitle from "@/components/atoms/titles/SectionTitle";
import Title from "@/components/atoms/titles/Title";
import HeroSection from "@/components/visitor/HeroSection";
import PageParagraph from "@/components/atoms/PageParagraph";
import List from "@/components/atoms/List";
import ExplorezSuiviMarin from "@/components/visitor/aire-marine/monitoring/marin/ExplorezSuiviMarin";

export default function SuiviScientifique3() {
  const listMethodologie = [
    {
      title: "Plongées scientifiques :",
      content: "Réalisation de relevés sous-marins pour collecter des données sur les espèces et habitats.",
    },
    {
      title: "Outils technologiques :",
      content: "Utilisation de drones marins et de capteurs pour des analyses approfondies.",
    },
    {
      title: "Collaboration locale :",
      content: "Implication des pêcheurs dans la collecte de données pour renforcer l'efficacité du suivi.",
    },
  ];

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

  const slides = [
    {
      image: "/images/marine_images/marine7.jpg",
      title: "Posidonie",
    },
    {
      image: "/images/marine_images/marine8.jpg",
      title: "Grande Nacre",
    },
    {
      image: "/images/marine_images/marine10.jpg",
      title: "Eponge Marine",
    },
    {
      image: "/images/marine_images/marine8.jpg",
      title: "Avifaune",
    },
    {
      image: "/images/marine_images/marine5.jpg",
      title: "Tortue Marine",
    },
  ];

  return (
    <div className="">
      <HeroSection title="Protégeons les Trésors des Profondeurs" subTitle="Un engagement pour la biodiversité marine de Kerkennah" imgSrc={marinHero} />

      <div className="flex justify-center sm:justify-center pb-4 ">
        <PageTitle title="Suivi Scientifique" width="w-[160px]" />
      </div>

      <section className="px-4 sm:px-0">
        <div className="max-w-6xl mx-auto">
          <section className="w-full flex flex-col sm:flex-row relative gap-4 md:gap-8 py-2 md:py-10">
            <AMCPSidebar />

            <section className="w-fit flex flex-col gap-8">
              <article className="flex flex-col gap-5">
                <div className="flex justify-center sm:justify-start">
                  <SectionTitle title="Suivi Marin" width="w-[100px] sm:w-[160px]" spacing="mt-8 sm:mt-0" customClassName="!w-auto" />
                </div>
                <div className="font-semibold text-[24px] sm:text-[31px] italic text-center sm:text-start">Une Analyse de Nos Ecosystémes Sous-Marins</div>

                <PageParagraph fontWeight="font-semibold">
                  Le suivi marin joue un role crucial dans la préservation des écosystémes marins uniques des iles de Kerkennah.il permet de surveiller la santé
                  des habitats sous-marins, d'étudier les espéces emblématiques et de comprendre l'impact des activités humaines sur le milieu marin. Ce suivi
                  scientifique guide nos efforts pour assurer une gestion durable et responsable de ces ressssources précieuses.
                </PageParagraph>
              </article>

              <article className="flex flex-col gap-5">
                <Title size="text-[25px] sm:text-[28px]" variant="pill">
                  Objectifs du suivi Marin
                </Title>

                <List
                  items={[
                    {
                      title: "Comprendre et documenter :",
                      content: "L'évolution des habitats marins comme les herbiers de Posidonie.",
                    },
                    {
                      title: "Protéger les espèces en danger :",
                      content: "Telles que la Grande Nacre et les Tortues Marines.",
                    },
                    {
                      title: "Évaluer l'impact des pratiques de pêche :",
                      content: "Sur les populations marines, notamment le Poulpe.",
                    },
                    {
                      title: "Mesurer les effets des changements climatiques :",
                      content: "Sur les écosystèmes locaux.",
                    },
                  ]}
                />

                <img src="/images/marine_images/marine5.jpg" alt="Aire marine" className="w-full max-w-[600px] mx-auto h-auto rounded-lg" />
              </article>

              <article className="flex flex-col gap-5">
                <Title size="text-[25px] sm:text-[28px]" variant="pill">
                  Méthodologie Utilisée
                </Title>

                <List items={listMethodologie} />

                <img src="/images/marine_images/marine6.jpg" alt="" className="w-full max-w  h-auto rounded-lg" />
              </article>

              <article className="flex flex-col gap-5">
                <Title size="text-[25px] sm:text-[28px]" variant="pill">
                  Résultat et Importance
                </Title>
                <div className="ml-10 flex flex-col gap-5">
                  <Title>Résultats</Title>

                  <List
                    items={[
                      {
                        title: "Restauration des habitats marins :",
                        content: "Mise en évidence de la santé des herbiers de posidonies et de leur rôle dans la séquestration du carbone.",
                      },
                      {
                        title: "État des populations :",
                        content: "Données sur l’abondance et la diversité des espèces suivies (grande nacre, poulpes, tortues marines, etc.).",
                      },
                      {
                        title: "Indicateurs d'impact :",
                        content: "Identification des impacts des activités humaines sur les écosystèmes marins grâce à des analyses régulières.",
                      },
                    ]}
                  />

                  <Title>Importance</Title>

                  <List
                    items={[
                      {
                        title: "Gestion durable :",
                        content: "Les résultats permettent de mieux orienter les politiques de gestion des ressources naturelles.",
                      },
                      {
                        title: "Préservation de la biodiversité :",
                        content: "Le suivi aide à protéger les espèces en danger en proposant des actions ciblées.",
                      },
                      {
                        title: "Éducation et sensibilisation :",
                        content: "Ces résultats servent à informer et mobiliser les communautés locales et les décideurs.",
                      },
                    ]}
                  />
                </div>
                <img src="/images/marine_images/marine7.jpg" alt="" className="w-full  h-auto rounded-lg" />
              </article>
            </section>
          </section>
          <hr className="border-1 my-8" />
          {/* <section className="flex flex-col gap-4 my-8">
            <div className="text-justify  text-[18px] sm:text-[22px] font-bold">
              <p className="text-center text-[30px] sm:text-[36px]">
                <span className="text-[#0270A0]">Explorer</span> Les espéces de Notre Suivi Scientifique Marin{" "}
              </p>
            </div>

            <div className="text-justify  text-[18px] sm:text-[22px] font-bold">
              <p className="text-center text-[18px] sm:text-[20px]">Découvrez les trésors terrestres que nous surveillons pour</p>
            </div>
          </section> */}
          <ExplorezSuiviMarin />
        </div>
      </section>
    </div>
  );
}
