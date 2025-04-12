import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "gatsby";
import Title from "@/components/atoms/titles/Title";
import BlogList from "../monitoring/marin/species/BlogList";
import Calendar from "@/assets/icons/Calendar";
import Media from "../../Media";
import PageParagraph from "@/components/atoms/PageParagraph";
import "./TrainingDetailsContent.css";
import Loader from "@/components/atoms/loader";

// --- Helpers ---

/**
 * Parse le contenu au format markdown-like :
 * - Convertit **texte** en <strong>texte</strong>
 * - Transforme les URLs en liens cliquables
 */
const parseContent = (content: string) => {
  if (!content) return "";
  const boldParsed = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  const linkParsed = boldParsed.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" class="markdown-link" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return linkParsed;
};

/**
 * Formate une date au format en-US.
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// --- Sous-composant SectionHeader ---
interface SectionHeaderProps {
  title: React.ReactNode;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <div className="flex flex-col items-center justify-center text-center py-10">
    <Title size="text-2xl sm:text-[36px] pb-4">{title}</Title>
  </div>
);

// --- Composant principal TrainingDetailsContent ---
interface TrainingDetailsContentProps {
  location: any;
  params: any;
}

export default function TrainingDetailsContent({ location, params }: TrainingDetailsContentProps) {
  const [training, setTraining] = useState<any>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("en");

  // Récupération du slug depuis params
  useEffect(() => {
    const slugParam = params.slug;
    setSlug(slugParam);
  }, [params.slug]);

  // Chargement des données de la formation via l'API
  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/training/${slug}`)
        .then((res) => {
          setTraining(res.data);
          const searchParams = new URLSearchParams(location.search);
          const urlLanguage = searchParams.get("lang");
          if (urlLanguage && res.data[`title_${urlLanguage}`]) {
            setLanguage(urlLanguage);
          } else {
            setLanguage(res.data.title_en ? "en" : "fr");
          }
        })
        .catch((err) => {
          console.error("Error fetching training:", err);
          navigate("/404");
        });
    }
  }, [slug, location.search]);

  if (!training) {
    return <div className='flex justify-center items-center '> <Loader/> </div>;
  }

  return (
    <div className="w-full">
      <div className="w-full px-4 sm:px-8 text-start max-w-3xl mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>
        {/* En-tête de la formation */}
        <div className="flex flex-col gap-5">
          <h2 className="text-[28px] sm:text-[36px] font-semibold">
            {training.title_en || training.title_fr}
          </h2>
          {training.themes && training.themes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              {training.themes.map((item: any, idx: number) => (
                <div
                  key={item.id || idx}
                  className="px-2.5 py-1 bg-[#0270A0] rounded-md inline-flex justify-center items-center gap-2 shadow-lg"
                >
                  <span className="text-white text-sm font-medium font-montserrat">
                    {item?.name_en || item?.name_fr}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Calendar />
            <span>
              Le{" "}
              {new Date(training.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <img
            src={`${process.env.GATSBY_API_URL}${training.image}`}
            alt="Training"
            className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-lg"
          />
        </div>

        {/* Corps du contenu */}
        <div className="mt-10 flex flex-col gap-4">
          {training?.content_items
            ?.sort((a: any, b: any) => a.order - b.order)
            .map((item: any) => (
              <div key={item.id}>
                {item.language === language && (
                  <>
                    {item.type === "title" && (
                      <Title customClassName="mt-8" variant="pill" size="text-[24px]">
                        {item.content}
                      </Title>
                    )}
                    {item.type === "text" && (
                      <PageParagraph>
                        <div
                          className="mb-4 ml-6"
                          dangerouslySetInnerHTML={{ __html: parseContent(item.content) }}
                        />
                      </PageParagraph>
                    )}
                    {item.type === "image" && (
                      <div className="mb-2 flex justify-center mx-4 sm:mx-0">
                        <img
                          src={`${process.env.GATSBY_API_URL}${item.file_path}`}
                          alt=""
                          className="w-full h-auto max-w-[600px] object-cover rounded-md shadow-lg"
                        />
                      </div>
                    )}
                    {item.type === "pdf" && (
                      <div className="mb-2">
                        <a
                          download
                          href={`${process.env.GATSBY_API_URL}${item.file_path}`}
                          className="text-blue-600 underline"
                        >
                          Download Pdf
                        </a>
                      </div>
                    )}
                    {item.type === "list" && (
                      <div className="mb-2">
                        <BlogList content={item.content} />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>

        {/* Séparateur et section Médias */}
        <hr className="border-t border-black my-10" />
        <SectionHeader
          title={
            <span>
              <span className="text-[#0270A0]">Souvenirs</span> en Photos et Vidéos
            </span>
          }
        />
        <div className="mb-20">
          <Media mediaContent={training} />
        </div>
      </div>
    </div>
  );
}
