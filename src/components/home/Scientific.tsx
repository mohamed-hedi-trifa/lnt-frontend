import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { SwiperOptions } from "swiper/types";
import { Link } from "gatsby";
import LangLink from "@/components/LangLink";

// type Kebab<T extends string, A extends string = ""> = T extends `${infer F}${infer R}`
//   ? Kebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
//   : A;

// /**
//  * Helper for converting object keys to kebab case because Swiper web components parameters are available as kebab-case attributes.
//  * @link https://swiperjs.com/element#parameters-as-attributes
//  */
// type KebabObjectKeys<T> = {
//   [key in keyof T as Kebab<key & string>]: T[key] extends Object ? KebabObjectKeys<T[key]> : T[key];
// };

// /**
//  * Swiper 9 doesn't support Typescript yet, we are watching the following issue:
//  * @link https://github.com/nolimits4web/swiper/issues/6466
//  *
//  * All parameters can be found on the following page:
//  * @link https://swiperjs.com/swiper-api#parameters
//  */
// type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "swiper-container": SwiperContainerAttributes;
//       "swiper-slide": SwiperSlideAttributes;
//     }

//     interface SwiperContainerAttributes extends KebabObjectKeys<SwiperOptions> {
//       ref?: RefObject<SwiperRef>;
//       children?: React.ReactNode;
//     }
//     interface SwiperSlideAttributes extends KebabObjectKeys<SwiperSlideProps> {}
//   }
// }

type Research = {
  image?: string;
  title?: string;
  description?: string;
  importance?: string;
  color1?: string;
  color2?: string;
  path?: string;
};

const defaultResearches: Research[] = [
  {
    image: "/posidonie.jpg",
    title: "Posidonie",
    description:
      "La posidonie est une plante sous-marine essentielle à l'écosystème méditerranéen. Elle forme des herbiers marins qui abritent une grande diversité d'espèces.",
    importance: "Ces herbiers jouent un rôle crucial dans la protection des côtes en réduisant l'érosion et en absorbant le carbone.",
    color1: "#007C48",
    color2: "#44D091",
    path: "/protected-air-marine-coastal-areas/monitoring/marin/posidonie",
  },
  {
    image: "/grande_nacre.jpg",
    title: "Grande Nacre",
    description: "La grande nacre est un mollusque bivalve géant, emblématique de la Méditerranée, qui peut atteindre jusqu'à 1 mètre de long.",
    importance: "Elle filtre l'eau de mer, contribuant à la pureté des écosystèmes marins et servant d'indicateur de la qualité de l'eau.",
    color1: "#3344DC",
    color2: "#50ACC6",
    path: "/protected-air-marine-coastal-areas/monitoring/marin/grande-nacre",
  },
  {
    image: "/poulpe.jpg",
    title: "Poulpe",
    description: "LLe poulpe est une espèce clé pour la pêche locale et joue un rôle important dans l'économie de Kerkennah.",
    importance:
      "Prédateur et proie, le poulpe occupe une place centrale dans la chaîne alimentaire marine, régulant les populations de petits poissons et invertébrés.",
    color1: "#7B16FE",
    color2: "#C69AFF",
    path: "/protected-air-marine-coastal-areas/monitoring/marin/poulpe",
  },
  {
    image: "/tortue_marine.jpg",
    title: "Tortue Marine",
    description:
      "La tortue caouanne est une espèce de tortue marine largement répandue dans le bassin méditerranéen. Elle se distingue par sa carapace dure et sa capacité à parcourir de longues distances en mer.",
    importance:
      "En tant que prédateur et mangeur d'herbes marines, elle aide à maintenir l’équilibre des écosystèmes marins, contribuant à la régénération des prairies sous-marines et à la santé des récifs coralliens.",
    color1: "#00E676",
    color2: "#50ACC6",
    path: "/protected-air-marine-coastal-areas/monitoring/marin/tortue-marine",
  },
  {
    image: "/eponge_marine.jpg",
    title: "Éponge Marine",
    description:
      "Les éponges sont des organismes marins primitifs dotés d'une structure poreuse. Elles se fixent aux fonds marins et se nourrissent en filtrant l'eau pour capturer les particules alimentaires.",
    importance:
      "Les éponges filtrent l'eau, améliorant ainsi la qualité de l'écosystème marin. Elles offrent aussi un habitat pour d'autres espèces marines, favorisant ainsi la biodiversité.",
    color1: "#F57C00",
    color2: "#FFCA28",
    path: "/protected-air-marine-coastal-areas/monitoring/marin/eponge-marine",
  },
  {
    image: "/avifaunes.jpg",
    title: "Avifaune",
    description:
      "Les avifaunes incluent une variété d’oiseaux marins, tels que les goélands et les puffins, présents autour de l’archipel de Kerkennah. Ces oiseaux migrateurs nichent sur les îles et se nourrissent des ressources marines.",
    importance:
      "Les oiseaux marins jouent un rôle crucial dans la chaîne alimentaire, régulant les populations de poissons et de crustacés. Ils sont aussi des bioindicateurs, révélant la santé globale des écosystèmes marins et côtiers.",
    color1: "#006E9F",
    color2: "#51ADC6",
    path: "/protected-air-marine-coastal-areas/monitoring/marin/avifaune",
  },
];

export default function Scientific() {
  const [researches, setResearches] = useState(defaultResearches);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const swiperThumbsRef = useRef<any>(null);

  const activeResearch = researches[activeIndex];

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      effect: "fade",
      on: {
        slideChange: (swiper) => {
          setActiveIndex(swiper.activeIndex);
        },
      },
    };

    Object.assign(swiperRef.current, swiperParams);

    swiperRef.current?.initialize();
  }, []);

  useEffect(() => {
    if (!swiperThumbsRef.current) return;

    const swiperParams: SwiperOptions = {
      effect: "coverflow",
      spaceBetween: 20,
      centeredSlides: true,
      slidesPerView: 2,
      grabCursor: true,
      coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      },
      thumbs: {
        swiper: swiperRef.current,
      },
    };

    Object.assign(swiperThumbsRef.current, swiperParams);

    swiperThumbsRef.current?.initialize();
  }, []);

  useEffect(() => {
    // swiperRef.current?.swiper.slideTo?.(activeIndex);
    if (swiperThumbsRef.current.activeIndex !== activeIndex) swiperThumbsRef.current?.swiper.slideTo?.(activeIndex);
  }, [activeIndex]);

  return (
    <section className="relative px-3 py-10 bg-cover">
      <style>
        {`
            :root{
              --active-research-color-1: ${activeResearch.color1};
              --active-research-color-2: ${activeResearch.color2};
            }
        `}
      </style>
      <div className="z-[-1] absolute inset-0">
        <swiper-container ref={swiperRef} class="w-full h-full mx-auto" init="false">
          {researches.map((research, index) => (
            <swiper-slide key={research.title}>
              <img src={research.image} className="w-full h-full object-cover" />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      <div className="max-w-7xl mx-auto text-shadow">
        <h3 className="text-white text-xl font-bold text-center mb-8">Suivi Marin</h3>
        <div className="relative w-fit ml-1 pl-3 pr-6 py-3 bg-black/50 after:absolute after:right-full after:top-0 after:bottom-0 after:w-1 after:bg-gradient-to-b after:from-[var(--active-research-color-1)] after:to-[var(--active-research-color-2)]">
          <h3 className="font-bold text-xl text-white">{activeResearch.title}</h3>
        </div>
        <div className="min-h-[350px] md:min-h-[250px]">
          <div className="w-fit max-w-[500px] mt-6 pl-3 pr-6 py-3 bg-black/50">
            <h4 className="font-bold" style={{ color: activeResearch.color1 }}>
              Description:
            </h4>
            <p className="font-bold text-white text-sm">{activeResearch.description}</p>
            <h4 className="mt-4 font-bold capitalize" style={{ color: activeResearch.color1 }}>
              Importance écologique:
            </h4>
            <p className="font-bold text-white text-sm">{activeResearch.importance}</p>
          </div>
        </div>
        <div className="mt-6 hidden md:grid grid-cols-[repeat(2,minmax(auto,300px))] md:grid-cols-[repeat(3,minmax(auto,300px))] gap-3 justify-between">
          {researches.map((research, index) => (
            <LangLink
              to={research.path!}
              onMouseEnter={() => {
                setActiveIndex(index);
              }}
              key={index}
              className={`${
                activeIndex === index ? "bg-black/50" : ""
              } relative w-full max-w-[250px] pl-3 pr-6 py-7 ml-1 mb-1 after:absolute after:right-full after:top-2 after:-bottom-1 after:w-1 after:bg-gradient-to-b before:absolute before:top-full before:right-2 before:-left-1 before:h-1 before:bg-gradient-to-l ${
                activeIndex === index
                  ? "after:from-[var(--active-research-color-1)] after:to-[var(--active-research-color-2)] before:from-[var(--active-research-color-1)] before:to-[var(--active-research-color-2)]"
                  : ""
              }`}
            >
              <h3 className="font-bold text-xl text-white text-center">{research.title}</h3>
            </LangLink>
          ))}
        </div>
        <div className="md:hidden relative z-10 flex justify-between gap-4 mx-auto mt-6 px-">
          <swiper-container ref={swiperThumbsRef} class="w-full h-full mx-auto" init="false">
            {researches.map((research, index) => (
              <swiper-slide key={research.title} class={`h-auto py-1 ${activeIndex === index ? "" : "opacity-75"}`}>
                {/* <img src={research.image} className="w-full h-full object-cover" /> */}
                <div
                  onClick={() => swiperThumbsRef.current?.swiper.slideTo(index)}
                  className={`relative flex items-center justify-center w-full h-full max-w-[250px] pl-3 pr-6 py-7 bg-black/50 after:absolute after:right-full after:top-2 after:-bottom-1 after:w-1 after:bg-gradient-to-b before:absolute before:top-full before:right-2 before:-left-1 before:h-1 before:bg-gradient-to-l after:from-[var(--active-research-color-1)] after:to-[var(--active-research-color-2)] before:from-[var(--active-research-color-1)] before:to-[var(--active-research-color-2)]`}
                >
                  <h3 className="font-bold text-lg text-white text-center">{research.title}</h3>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </div>
    </section>
  );
}
