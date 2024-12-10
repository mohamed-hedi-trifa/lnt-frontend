import React, { useEffect, useRef, useState } from "react";
import NewsCard from "./NewsCard";
import { Link } from "gatsby";
import LangLink from "../LangLink";
import Button from "../Button";

type News = {
  image?: string;
  title?: string;
  category?: string;
  date?: Date;
};

const defaultNews: News[] = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/2c11/7c68/bc48112ce61984596b11b9b169f0c478?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TsmEh4P0HalKpMYqrPEcjbYAz6pX37d1Bxts6G6CxF4o0pTPhKN8MtHlEHL8j8MafZ~1YojN0vI0PzbJrn6u8Fr4qM-rzSgi51A7JP-wWKHvh9144uoM3sHU7xLoiEJIwIUiVggxyXVQUPywRai-ruacP8Jm5i~qunxwfLtb3JVd42KtcXoVrdX1WFCunOpxu9qLb3aDGu6vxRo3jD1XAoapxSEq1PGyvML29Tg4mGTpnCzUfZYXwEnRfZGIiJf1A~znsmRIpq6oSvmxfcIiJXg3DSinFPhc7mnSzTEvM07GZqDZuhkf4gmLGoHTwnKrsd5cUtaTjzxfcff4x~Bjuw__",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    date: new Date("2024-12-31T00:00:00"),
    category: "Initiative scientifique",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/2c11/7c68/bc48112ce61984596b11b9b169f0c478?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TsmEh4P0HalKpMYqrPEcjbYAz6pX37d1Bxts6G6CxF4o0pTPhKN8MtHlEHL8j8MafZ~1YojN0vI0PzbJrn6u8Fr4qM-rzSgi51A7JP-wWKHvh9144uoM3sHU7xLoiEJIwIUiVggxyXVQUPywRai-ruacP8Jm5i~qunxwfLtb3JVd42KtcXoVrdX1WFCunOpxu9qLb3aDGu6vxRo3jD1XAoapxSEq1PGyvML29Tg4mGTpnCzUfZYXwEnRfZGIiJf1A~znsmRIpq6oSvmxfcIiJXg3DSinFPhc7mnSzTEvM07GZqDZuhkf4gmLGoHTwnKrsd5cUtaTjzxfcff4x~Bjuw__",
    title: "Formation sur les fondamentaux de la gestion des aires marines protégées (MPA) organisée par MedPAN en Turquie",
    date: new Date(),
    category: "Formation",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/2c11/7c68/bc48112ce61984596b11b9b169f0c478?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TsmEh4P0HalKpMYqrPEcjbYAz6pX37d1Bxts6G6CxF4o0pTPhKN8MtHlEHL8j8MafZ~1YojN0vI0PzbJrn6u8Fr4qM-rzSgi51A7JP-wWKHvh9144uoM3sHU7xLoiEJIwIUiVggxyXVQUPywRai-ruacP8Jm5i~qunxwfLtb3JVd42KtcXoVrdX1WFCunOpxu9qLb3aDGu6vxRo3jD1XAoapxSEq1PGyvML29Tg4mGTpnCzUfZYXwEnRfZGIiJf1A~znsmRIpq6oSvmxfcIiJXg3DSinFPhc7mnSzTEvM07GZqDZuhkf4gmLGoHTwnKrsd5cUtaTjzxfcff4x~Bjuw__",
    title: "Suivi Scientifique de l'Herbier de Posidonia à Kerkennah : Importance et Actions pour sa Conservation",
    date: new Date(),
    category: "Formation",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    date: new Date(),
    category: "Formation",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    date: new Date(),
    category: "Formation",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    date: new Date(),
    category: "Formation",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    date: new Date(),
    category: "Formation",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    date: new Date(),
    category: "Formation",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    date: new Date(),
    category: "Formation",
  },
];

export default function LatestNews() {
  const [news, setNews] = useState(defaultNews);

  return (
    <section className="relative px-3 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center md:text-left text-primary text-2xl font-bold" style={{ textShadow: "2px 2px 2px rgb(0,0,0,.33)" }}>
          Dernières actualités
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          {news.slice(0, 3).map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
        <div className="hidden md:grid md:grid-cols-3 gap-5 mt-5">
          {news.slice(3, 6).map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
        <LangLink
          to="/news"
          className="mt-4 flex justify-center w-full"
        >
          <Button variant="primary">
          Voir tous les actualités
          </Button>
        </LangLink>
      </div>
    </section>
  );
}
