import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSection from "./HeaderSection";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Calendar from "@/assets/icons/Calendar";
import PopularNewsCard from "./PopularNewsCard";
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
  title_en: string;
  title_fr: string;
  card_description_en: string;
  card_description_fr: string;
  created_at: string;
  themes?: { name_en: string; name_fr: string }[];
}

export default function PopularNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("/api/popular-news")
      .then((r) => setArticles(r.data))
      .finally(() => setLoading(false));
  }, []);

  const next = () => setCurrentIndex((i) => (i + 1) % articles.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + articles.length) % articles.length);
  const formatDate = (iso: string) =>
    new Date(iso.replace(" ", "T")).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  /* ---------- loader ---------- */
  if (loading) {
    return (
      <div className="mt-10">
        <HeaderSection headerName="Nos Actualités Populaires" />
        <div className="flex flex-col gap-2.5 mt-5">
          <Shimmer className="h-[330px] w-full" />
          <div className="flex gap-2.5">
            <Shimmer className="h-[300px] w-full" />
            <Shimmer className="h-[300px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="px-4 sm:px-0">
        <HeaderSection headerName="Nos Actualités Populaires" />
      </div>

      {/* desktop */}
      <div className="hidden sm:flex flex-col w-full mx-auto mt-5 gap-2.5">
        <div className="flex gap-2.5">
          {articles.slice(3, 5).map((a) => (
            <Link key={a.id} to={`/news/${a.slug}`} className="relative flex-1 h-[300px] rounded-xl overflow-hidden">
              <img src={`${process.env.GATSBY_API_URL}${a.image}`} alt={a.title_fr || a.title_en} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.16)_100%)]" />
              <div className="absolute left-8 bottom-[45px] text-white flex flex-col gap-2">
                <div className="flex gap-4">
                  {a.themes?.slice(0, 2).map((t, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/40 rounded text-sm font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {t.name_fr || t.name_en}
                    </span>
                  ))}
                </div>
                <div className="text-lg font-bold capitalize text-start">{a.title_fr || a.title_en}</div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar />
                  <span className="font-semibold">Le {formatDate(a.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex gap-2.5">
          {articles.slice(0, 3).map((a) => (
            <Link key={a.id} to={`/news/${a.slug}`} className="relative w-full h-[330px] rounded-xl overflow-hidden shadow-lg flex items-end p-8">
              <img src={`${process.env.GATSBY_API_URL}${a.image}`} alt={a.title_fr || a.title_en} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.16)_100%)]" />
              <div className="relative bottom-[10px] z-10 flex flex-col gap-2 text-white">
                <div className="flex gap-4">
                  {a.themes?.slice(0, 2).map((t, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/40 rounded text-sm font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {t.name_fr || t.name_en}
                    </span>
                  ))}
                </div>
                <div className="text-lg font-bold capitalize text-start">{a.title_fr || a.title_en}</div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar />
                  <span className="font-semibold">Le {formatDate(a.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* mobile */}
      <div className="sm:hidden mt-10 px-2">
        <div className="flex items-center justify-between gap-3">
          <button onClick={prev}>
            <ChevronLeftIcon className="w-10 text-[#3E3232]" />
          </button>
          <PopularNewsCard article={articles[currentIndex]} />
          <button onClick={next}>
            <ChevronRightIcon className="w-10 text-[#3E3232]" />
          </button>
        </div>

        <div className="flex justify-center mt-5 gap-3">
          {articles.map((_, i) => (
            <span key={i} className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-[#0270A0]" : "bg-black/30"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
