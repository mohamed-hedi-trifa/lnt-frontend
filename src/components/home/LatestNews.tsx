import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import LangLink from "../LangLink";
import Button from "../atoms/Button";
import { Link } from 'gatsby';


export default function LatestNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/recent-news") // Ajustez l'URL et le paramètre 'limit' selon votre API
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

        {loading && <p className="text-center mt-4">Chargement...</p>}
        {error && <p className="text-center text-red-600 mt-4">{error}</p>}

        {/* Grid 3 colonnes à partir de "md", 1 colonne sur mobile */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 mx-2">
            {news.slice(0, 9).map((item, index) => (
                        <Link key={item.id} to={`/news/${item.slug}`}>
                          <NewsCard key={index} news={item} />
                        </Link>
            ))}
          </div>
        )}

        <LangLink to="/news" className="mt-4 flex justify-center w-full pt-10">
          <Button variant="primary">Voir toutes les Actualités</Button>
        </LangLink>
      </div>
    </section>
  );
}
