import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "gatsby";
import achievementsHero from "../../../../../../assets/images/achievements-hero.jpg";
import SectionTitle2 from "@/components/atoms/titles/SectionTitle2";
import Title from "@/components/atoms/titles/Title";
import PageParagraph from "@/components/atoms/PageParagraph";
import BlogList from "./BlogList";
import SpeciesTitle from "@/components/atoms/titles/SpeciesTitle";
import Table from "@/components/visitor/who-are-we/rapports/Table";
import DecouvrezDautresEspeces from "./DecouvrezDautresEspeces";
import Media from "@/components/visitor/Media";
import AMCPSuiviScientifiqueSidebar from "@/components/layout/AMCPSuiviScientifiqueSidebar";


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

export default function Blog({ location, params }: { location: any; params: any }) {
  const [blogPost, setBlogPost] = useState<any>(null);
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const slug = params.slug;
    if (slug) {
      axios
        .get(`/api/posts/${slug}`)
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

          setBlogPost(res.data);

          // Extraction de la langue depuis l'URL
          const searchParams = new URLSearchParams(location.search);
          const urlLanguage = searchParams.get("lang");

          // Si la langue extraite existe dans le contenu, on l'utilise
          if (urlLanguage && res.data[`title_${urlLanguage}`]) {
            setLanguage(urlLanguage);
          } else {
            // Par défaut, utiliser l'anglais ou le français selon la disponibilité
            setLanguage(res.data.title_en ? "en" : "fr");
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du blog post :", err);
          navigate("/404");
        });
    }
  }, [location, params.slug]);

  console.log("-------------------- blogPost --------------------");
  console.log(blogPost);

  const dataTable = [
    {
      title: "Posidonie_Kerkennah_Suivi.pdf",
      date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés",
      image: "/images/Pdf.png",
    },
    {
      title: "Posidonie_Kerkennah_Suivi.pdf",
      date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés",
      image: "/images/Pdf.png",
    },
    // ... (ajouter d'autres éléments si nécessaire)
  ];

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="min-h-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${process.env.GATSBY_API_URL}${blogPost.image})` }}
    >
      <img
        className="w-full object-cover h-[80vh]"
        src={achievementsHero}
        alt="Achievements Hero"
      />
      <div className="flex justify-center pb-4">
        <SpeciesTitle
          title={blogPost[`title_${language}`] || ""}
          width="w-[160px]"
          fontSize="text-[48px] md:text-[64px] text-start"
        />
      </div>
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row relative sm:gap-8">
            <AMCPSuiviScientifiqueSidebar />
            <div className="grow w-full flex flex-col mx-auto shadow-helmi gap-4 rounded-[12px] bg-[rgba(255,255,255,0.8)]">
              {/* Sous-titre */}
              <SectionTitle2
                title={blogPost[`subtitle_${language}`] || ""}
                width="w-full"
                color="#000000"
                fontSize="text-[28px] lg:text-[36px] text-center sm:text-start font-semibold italic"
                spacing="sm:mt-0 px-10 pt-6"
              />

              {/* Résumé */}
              {blogPost[`summary_${language}`] && (
                <div className="px-10 text-center sm:text-start">
                  <PageParagraph>
                    {blogPost[`summary_${language}`]}
                  </PageParagraph>
                </div>
              )}

              {/* Liste des items de type "list" */}
              {blogPost.content_items
                ?.filter((item: any) => item.language === language && item.type === "list")
                .sort((a: any, b: any) => a.order - b.order)
                .map((item: any) => (
                  <BlogList key={item.id} content={item.content} />
                ))}

              {/* Autres contenus */}
              {blogPost.content_items
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
                          customClassName="items-start px-10 mt-2"
                        >
                          {item.content}
                        </Title>
                      );
                    case "text":
                      return (
                        <PageParagraph key={item.id}>
                          <div
                            className="px-10 sm:text-start"
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
                          <a download href={`${process.env.GATSBY_API_URL}${item.file_path}`}>
                            <div className="text-blue">Download Pdf</div>
                          </a>
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
      <div className="w-screen mx-0 rounded-[12px] bg-[rgba(255,255,255,0.8)] mt-[60px] shadow-helmi">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mx-16 py-10">
            <div className="text-center">
              <h1 className="text-[28px] sm:text-[36px] font-bold">
                <span className="text-[#0270A0]">Immersion visuelle</span> dans l'écosystème de la Posidonie
              </h1>
              <PageParagraph>
                <p className="text-[20px] font-semibold mt-4 mx-20 text-center">
                  Découvrez la richesse visuelle de la posidonie à travers des images captivantes et des vidéos éducatives
                </p>
              </PageParagraph>
            </div>
          </div>
          <Media mediaContent={blogPost}/>
          <hr className="my-10 border-1 border-[#000000]" />
          <div className="text-center mx-20">
            <h1 className="text-[28px] sm:text-[36px] font-bold">
              <span className="text-[#0270A0]">Recherche</span> et Connaissances sur la Posidonie
            </h1>
          </div>
          <PageParagraph>
            <div className="mx-28 pt-4 font-semibold text-[18px] sm:text-[20px]">
              <p className="mb-[30px] text-center">
                La recherche scientifique sur la Posidonie, plante emblématique de la Méditerranée, est essentielle pour comprendre son rôle écologique et les menaces auxquelles elle fait face. Cette section regroupe des rapports et des articles détaillant les résultats des suivis scientifiques, les méthodologies utilisées, et les recommandations pour préserver cet écosystème clé dans l'archipel de Kerkennah.
              </p>
            </div>
          </PageParagraph>
          <Table data={dataTable} />
          <section className="border-t border-[#000000] mt-10 py-10">
            <DecouvrezDautresEspeces currentBlog={blogPost}/>
          </section>
        </div>
      </div>
    </div>
  );
}
