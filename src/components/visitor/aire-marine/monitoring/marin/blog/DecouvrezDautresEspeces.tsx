import ResearchCard from "@/components/visitor/aire-marine/monitoring/terrestre/ResearchCard";
import React, { useEffect, useRef, useState } from "react";
import { SwiperOptions } from "swiper/types";

type Research = {
  image?: string;
  title?: string;
};

const defaultResearches: Research[] = [
  {
    image: "/posidonie.jpg",
    title: "Posidonie",
  },
  {
    image: "/grande_nacre.jpg",
    title: "Grande Nacre",
  },
  {
    image: "/poulpe.jpg",
    title: "Poulpe",
  },
  {
    image: "/tortue_marine.jpg",
    title: "Tortue Marine",
  },
  {
    image: "/eponge_marine.jpg",
    title: "Éponge Marine",
  },
  {
    image: "/avifaunes.jpg",
    title: "Avifaune",
  },
];

export default function DecouvrezDautresEspeces() {
  const [researches, setResearches] = useState(defaultResearches);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      spaceBetween: 50,
      slidesPerView: "auto",
    };

    Object.assign(swiperRef.current, swiperParams);

    swiperRef.current?.initialize();
  }, []);

  return (
    <article className="">
       <span className="font-bold py-10">
        <p className="text-center text-[28px] sm:text-[36px]">
            <span className="text-[#0270A0]">Découvrez</span> d'autres espèces fascinantes qui{" "}
        </p>
        <p className="text-center text-[28px] sm:text-[36px]">
            peuplent nos écosystèmes marins
        </p>
        <p className="text-center text-[18px] sm:text-[20px]">
            Découvrez les trésors marins que nous préservons
        </p>
       </span>
      <div className="hidden md:block">
        <swiper-container ref={swiperRef} class="w-full mt-[50px] mb-[50px] mx-auto" init="false">
          {researches?.map((research, index) => (
            <swiper-slide key={index} class="relative w-fit">
              <ResearchCard image={research.image} title={research.title} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      <div className="md:hidden">
        <div className="grid grid-cols-2 mt-[50px] mb-[80px] gap-[20px]">
          {researches?.map((research, index) => (
            <div key={index} className="relative">
              <ResearchCard image={research.image} title={research.title} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
