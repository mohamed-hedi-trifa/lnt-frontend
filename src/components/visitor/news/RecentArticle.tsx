import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSection from "./HeaderSection";
import Calendar from "@/assets/icons/Calendar";
import { Link } from "gatsby";

/* ─────────── helpers ─────────── */
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

interface Article {
  id: string;
  slug: string;
  image: string;
  title_en: string | null;
  title_fr: string | null;
  card_description_en: string | null;
  card_description_fr: string | null;
  created_at: string;
  themes?: { id: number; name_en: string | null; name_fr: string | null }[];
}

const pickLang = (item: any, base: string, lang: "fr" | "en") =>
  item[`${base}_${lang}`] ?? item[`${base}_${lang === "fr" ? "en" : "fr"}`] ?? "";

export default function RecentArticle({ language = "fr" }: { language?: "fr" | "en" }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/recent-news")
      .then((r) => setArticles(r.data))
      .finally(() => setLoading(false));
  }, []);

  /* ---------- loader ---------- */
  if (loading) {
    return (
      <div>
        <HeaderSection headerName="Articles Récents" />
        <div className="flex flex-col sm:flex-row gap-7 mt-10">
          {/* hero skeleton */}
          <Shimmer className="rounded-xl w-full sm:w-[500px] h-[416px] sm:h-[560px]" />
          {/* side skeletons */}
          <div className="flex flex-col w-full gap-7">
            {Array.from({ length: 3 }).map((_, i) => (
              <Shimmer key={i} className="rounded-xl w-full h-[160px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) return null;

  const featured = articles[0];
  const others = articles.slice(1, 4);
  const formatDate = (iso: string) =>
    new Date(iso.replace(" ", "T")).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const truncate = (txt = "", max = 30) => (txt.length > max ? `${txt.slice(0, max)}…` : txt);

  return (
    <div>
      <HeaderSection headerName="Articles Récents" />

      <div className="flex flex-col sm:flex-row justify-between w-full mt-10 gap-7 font-['Montserrat']">
        {/* HERO */}
        <Link to={`/news/${featured.slug}`} className="overflow-visible">
          <div
            className={`relative shadow-helmi sm:h-[560px] h-[416px] rounded-xl ${
              others.length === 0 ? "w-full" : "sm:w-[500px]"
            }`}
          >
            <div className="relative rounded-xl overflow-hidden w-full h-full">
              <img
                src={`${process.env.GATSBY_API_URL}${featured.image}`}
                alt={pickLang(featured, "title", language)}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#183354]/0 to-[#183354]" />
            </div>

            <div className="absolute bottom-10 left-10 right-14 text-white flex flex-col gap-5 max-w-3xl">
              <div className="flex gap-3 flex-wrap">
                {featured.themes?.slice(0, 3).map((t) => (
                  <span
                    key={t.id}
                    className="px-2.5 py-1 bg-white/30 rounded-[3px] text-sm font-semibold uppercase"
                  >
                    {pickLang(t, "name", language)}
                  </span>
                ))}
              </div>

              <h2 className="font-bold sm:text-2xl text-lg text-start">
                {pickLang(featured, "title", language)}
              </h2>

              <div className="flex gap-2 items-center text-sm font-light uppercase">
                <Calendar className="size-5" />
                <span>Le {formatDate(featured.created_at)}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* SIDE ARTICLES */}
        <div className="flex flex-col items-center justify-between w-full">
          {others.map((a) => (
            <Link key={a.id} to={`/news/${a.slug}`} className="flex items-center w-full h-[160px]">
              <div className="ml-6 flex-grow flex flex-col justify-between h-[160px] py-2">
                <div className="flex gap-3 flex-wrap mb-1">
                  {a.themes?.slice(0, 2).map((t) => (
                    <span
                      key={t.id}
                      className="px-2.5 py-1 bg-[#0270A0] rounded text-xs font-semibold text-white uppercase"
                    >
                      {pickLang(t, "name", language)}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold sm:text-lg leading-6 text-start max-w-[250px]">
                  {truncate(pickLang(a, "title", language), 20)}
                </h3>

                <div className="flex items-center gap-2 text-[#6D757F] text-xs font-light uppercase">
                  <Calendar className="size-4" />
                  <span>Le {formatDate(a.created_at)}</span>
                </div>
              </div>

              <div className="shadow-helmi rounded-xl overflow-hidden w-[160px] h-[160px] flex-shrink-0">
                <img
                  src={`${process.env.GATSBY_API_URL}${a.image}`}
                  alt={pickLang(a, "title", language)}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
