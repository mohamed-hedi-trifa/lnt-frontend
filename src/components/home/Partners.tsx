import React, { useEffect, useRef, useState } from "react";
import Carousel from "./Carousel";
import PageParagraph from "../atoms/PageParagraph";

type Partner = {
  image?: string;
};

const defaultPartners: Partner[] = [
  {
    image: "/the_med_fund.png",
  },
  {
    image: "/gef.png",
  },
  {
    image: "/kantara_sea.png",
  },
  {
    image: "/snorkeling_kerkennah.png",
  },
  {
    image: "/apal.png",
  },
  // THESE ONES ARE FOR TESTING PURPOSES
  {
    image: "/the_med_fund.png",
  },
  {
    image: "/gef.png",
  },
  {
    image: "/kantara_sea.png",
  },
  {
    image: "/snorkeling_kerkennah.png",
  },
  {
    image: "/apal.png",
  },
];

export default function Partners() {

  return (
    <section className="relative px-3 py-20 bg-slate-900 overflow-hidden">
      <div className="absolute left-0 -translate-x-1/3 top-1/2 -translate-y-1/2 w-[400px] aspect-square opacity-60">
        <img src="/spot.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute right-0 translate-x-1/3 top-1/2 -translate-y-1/2 w-[400px] aspect-square opacity-60">
        <img src="/spot.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-white text-center font-bold text-3xl">Avec qui nous sommes engagés...</h2>
        <PageParagraph>
          <p className="mt-4 text-white text-center md:text-base leading-7">
            L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) s'associe à des partenaires locaux et internationaux qui partagent
            notre engagement pour la durabilité et le bien-être communautaire. Ensemble, nous soutenons les pêcheurs dans des pratiques durables, organisons des
            événements culturels et préservons le patrimoine de la région de Kerkennah, notamment à travers l'aire marine protégée. Cette collaboration renforce
            notre impact et aide à protéger notre environnement marin tout en enrichissant notre communauté.
          </p>
        </PageParagraph>
        <div className="mt-10">
        <Carousel slides={defaultPartners} />
        </div>
      </div>
    </section>
  );
}
