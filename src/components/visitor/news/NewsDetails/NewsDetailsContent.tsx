import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "gatsby";
import PageParagraph from "@/components/atoms/PageParagraph";
import Title from "@/components/atoms/titles/Title";
import Calendar from "@/assets/icons/Calendar";
import Media from "../../Media";
import "./NewsDetailsContent.css";
import PdfIcon from "@/assets/icons/PdfIcon.png";
import NewsBlogList from "./NewsBlogList";

/* ─────────── helpers ─────────── */
const parseContent = (c = "") =>
  c
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="markdown-link" target="_blank" rel="noopener noreferrer">$1</a>');

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

/* ─────────── sous‑composant ─────────── */
interface SectionHeaderProps {
  title: React.ReactNode;
}
const SectionHeader = ({ title }: SectionHeaderProps) => (
  <div className="flex flex-col items-center text-center justify-center py-10">
    <Title size="text-2xl sm:text-[36px] pb-4">{title}</Title>
  </div>
);

/* ─────────── composant principal ─────────── */
interface Props {
  location: any;
  params: any;
}
export default function NewsDetailsContent({ location, params }: Props) {
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"fr" | "en">("en");

  /* récup slug puis fetch */
  useEffect(() => {
    const slug = params.slug;
    if (!slug) return;

    setLoading(true);
    axios
      .get(`/api/news/${slug}`)
      .then((res) => {
        setNews(res.data);
        const urlLang = new URLSearchParams(location.search).get("lang") as "fr" | "en" | null;
        setLanguage(urlLang && res.data[`title_${urlLang}`] ? urlLang : res.data.title_en ? "en" : "fr");
      })
      .catch(() => navigate("/404"))
      .finally(() => setLoading(false));
  }, [location, params.slug]);

  /* ---------- loader ---------- */
  if (loading) {
    return (
      <div className="w-full px-4 sm:px-8 max-w-3xl mx-auto">
        <Shimmer className="h-10 w-2/3 mb-4" />
        <Shimmer className="h-6 w-1/2 mb-3" />
        <Shimmer className="h-6 w-1/3 mb-3" />
        <Shimmer className="h-[300px] w-full mb-8" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-5 w-full mb-4" />
        ))}
      </div>
    );
  }

  if (!news) return null;

  return (
    <div className="w-full">
      <div className="w-full px-4 sm:px-8 text-start max-w-3xl mx-auto" >
        {/* header */}
        <div className="flex flex-col gap-5">
          <h2 className="text-[28px] sm:text-[36px] font-semibold">{news.title_en || news.title_fr}</h2>

          {news.themes?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              {news.themes.map((t: any) => (
                <div key={t.id} className="px-2.5 py-1 bg-[#0270A0] rounded-md shadow-lg text-white text-sm font-medium">
                  {t.name_en || t.name_fr}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm font-semibold">
            <Calendar />
            <span>
              Le{" "}
              {new Date(news.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <img
            src={`${process.env.GATSBY_API_URL}${news.image}`}
            alt="news"
            className="w-full max-w-full h-auto max-h-[500px] object-cover rounded-md shadow-lg"
          />
        </div>

        {/* body */}
        <div className="mt-10 flex flex-col gap-4">
          {news.content_items
            ?.sort((a: any, b: any) => a.order - b.order)
            .map((item: any) =>
              item.language !== language ? null : (
                <div key={item.id}>
                  {item.type === "title" && (
                    <Title customClassName="mt-8" variant="pill" size="text-[24px]">
                      {item.content}
                    </Title>
                  )}

                  {item.type === "text" && (
                    <PageParagraph>
                      <div className="mb-4 ml-6" dangerouslySetInnerHTML={{ __html: parseContent(item.content) }} />
                    </PageParagraph>
                  )}

                  {item.type === "image" && (
                    <div className="mb-2 flex justify-center">
                      <img
                        src={`${process.env.GATSBY_API_URL}${item.file_path}`}
                        alt=""
                        className="w-full h-auto max-w-[600px] object-cover rounded-md shadow-lg"
                      />
                    </div>
                  )}

                  {item.type === "pdf" && (
                    <div className="mb-2">
                      <a download href={`${process.env.GATSBY_API_URL}${item.file_path}`}>
                        <div className="mb-10 flex items-center">
                          <img src={PdfIcon} alt="PDF" className="h-16 w-[50px]" />
                          <p className="ml-4 font-semibold text-[18px] text-[#0270A0] underline">
                            {item.file_path.split("/").pop()?.split("5555_")[1]}
                          </p>
                        </div>
                      </a>
                    </div>
                  )}

                  {item.type === "list" && (
                    <div className="mb-2">
                      <NewsBlogList content={item.content} />
                    </div>
                  )}
                </div>
              )
            )}
        </div>

        {/* media */}
        <hr className="border-t border-black my-10" />
        <SectionHeader
          title={
            <>
              <span className="text-[#0270A0]">Souvenirs</span> en Photos et Vidéos
            </>
          }
        />
        <div className="mb-20">
          <Media mediaContent={news} />
        </div>
      </div>
    </div>
  );
}
