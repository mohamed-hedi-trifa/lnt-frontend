import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import LangLink from "../LangLink";
import Button from "../atoms/Button";
import { Link } from "gatsby";

const ShimmerBar = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white shadow-helmi p-4 flex flex-col gap-4 rounded-2xl w-[350px] min-h-[420px] h-full">
    <ShimmerBar className="h-[240px] w-full rounded-md" />
    <div className="flex flex-col grow mx-3 pb-14 md:pb-4 gap-3">
      <ShimmerBar className="h-6 w-24" />
      <ShimmerBar className="h-6 w-3/4" />
      <ShimmerBar className="h-4 w-1/2 mt-auto" />
    </div>
  </div>
);

export default function LatestNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/recent-news")
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching latest news:", err);
        setError("Une erreur est survenue lors de la récupération des actualités");
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative px-3 py-20">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center md:text-left text-primary text-2xl font-bold"
          style={{ textShadow: "2px 2px 2px rgb(0,0,0,.33)" }}
        >
          Dernières actualités
        </h2>

        {error && <p className="text-center text-red-600 mt-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 mx-2">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : news.slice(0, 9).map((item) => (
                <Link key={item.id} to={`/news/${item.slug}`}>
                  <NewsCard news={item} />
                </Link>
              ))}
        </div>

        <LangLink to="/news" className="mt-4 flex justify-center w-full pt-10">
          <Button variant="primary">Voir toutes les Actualités</Button>
        </LangLink>
      </div>
    </section>
  );
}
