import React, { useEffect, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";
import { Swiper, SwiperOptions } from "swiper/types";

type Kebab<T extends string, A extends string = ""> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
  : A;

/**
 * Helper for converting object keys to kebab case because Swiper web components parameters are available as kebab-case attributes.
 * @link https://swiperjs.com/element#parameters-as-attributes
 */
type KebabObjectKeys<T> = {
  [key in keyof T as Kebab<key & string>]: T[key] extends Object ? KebabObjectKeys<T[key]> : T[key];
};

/**
 * Swiper 9 doesn't support Typescript yet, we are watching the following issue:
 * @link https://github.com/nolimits4web/swiper/issues/6466
 *
 * All parameters can be found on the following page:
 * @link https://swiperjs.com/swiper-api#parameters
 */
type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": SwiperContainerAttributes;
      "swiper-slide": SwiperSlideAttributes;
    }

    interface SwiperContainerAttributes extends KebabObjectKeys<SwiperOptions> {
      ref?: RefObject<SwiperRef>;
      children?: React.ReactNode;
    }
    interface SwiperSlideAttributes extends KebabObjectKeys<SwiperSlideProps> {}
  }
}

type Research = {
  image?: string;
  title?: string;
  description?: string;
  importance?: string;
  color?: string;
};

const defaultResearches: Research[] = [
  {
    image: "/posidonie.jpg",
    title: "Posidonie",
    description:
      "La posidonie est une plante sous-marine essentielle à l'écosystème méditerranéen. Elle forme des herbiers marins qui abritent une grande diversité d'espèces.",
    importance: "Ces herbiers jouent un rôle crucial dans la protection des côtes en réduisant l'érosion et en absorbant le carbone.",
    color: "#44D091",
  },
  {
    image: "/grande_nacre.jpg",
    title: "Grande Nacre",
    description: "La grande nacre est un mollusque bivalve géant, emblématique de la Méditerranée, qui peut atteindre jusqu'à 1 mètre de long.",
    importance: "Elle filtre l'eau de mer, contribuant à la pureté des écosystèmes marins et servant d'indicateur de la qualité de l'eau.",
    color: "#50ACC6",
  },
  {
    image: "/poulpe.jpg",
    title: "Poulpe",
    description: "LLe poulpe est une espèce clé pour la pêche locale et joue un rôle important dans l'économie de Kerkennah.",
    importance:
      "Prédateur et proie, le poulpe occupe une place centrale dans la chaîne alimentaire marine, régulant les populations de petits poissons et invertébrés.",
    color: "#C69AFF",
  },
  {
    image: "/tortue_marine.jpg",
    title: "Tortue Marine",
    description:
      "La tortue caouanne est une espèce de tortue marine largement répandue dans le bassin méditerranéen. Elle se distingue par sa carapace dure et sa capacité à parcourir de longues distances en mer.",
    importance:
      "En tant que prédateur et mangeur d'herbes marines, elle aide à maintenir l’équilibre des écosystèmes marins, contribuant à la régénération des prairies sous-marines et à la santé des récifs coralliens.",
    color: "#50ACC6",
  },
  {
    image: "/eponge_marine.jpg",
    title: "Éponge Marine",
    description:
      "Les éponges sont des organismes marins primitifs dotés d'une structure poreuse. Elles se fixent aux fonds marins et se nourrissent en filtrant l'eau pour capturer les particules alimentaires.",
    importance:
      "Les éponges filtrent l'eau, améliorant ainsi la qualité de l'écosystème marin. Elles offrent aussi un habitat pour d'autres espèces marines, favorisant ainsi la biodiversité.",
    color: "#FFCA28",
  },
  {
    image: "/avifaunes.jpg",
    title: "Avifaune",
    description:
      "Les avifaunes incluent une variété d’oiseaux marins, tels que les goélands et les puffins, présents autour de l’archipel de Kerkennah. Ces oiseaux migrateurs nichent sur les îles et se nourrissent des ressources marines.",
    importance:
      "Les oiseaux marins jouent un rôle crucial dans la chaîne alimentaire, régulant les populations de poissons et de crustacés. Ils sont aussi des bioindicateurs, révélant la santé globale des écosystèmes marins et côtiers.",
    color: "#51ADC6",
  },
];

export default function Scientific() {
  const [researches, setResearches] = useState(defaultResearches);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const activeResearch = researches[activeIndex];

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      effect: "fade",
    };

    Object.assign(swiperRef.current, swiperParams);

    swiperRef.current?.initialize();
  }, []);

  useEffect(() => {
    swiperRef.current?.swiper.slideTo?.(activeIndex);
  }, [activeIndex]);

  return (
    <section className="relative px-3 py-8 bg-cover">
      <div className="z-[-1] absolute inset-0">
        <swiper-container ref={swiperRef} class="w-full h-full mx-auto" init="false">
          {researches.map((research, index) => (
            <swiper-slide key={research.title}>
              <img src={research.image} className="w-full h-full object-cover" />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      <div className="max-w-7xl mx-auto">
        <h3 className="text-white text-xl font-bold text-center">Suivi Scientifique</h3>
        <div className="w-fit border-l-4 pl-3 pr-6 py-3 bg-black/50" style={{ borderColor: activeResearch.color }}>
          <h3 className="font-bold text-xl text-white">{activeResearch.title}</h3>
        </div>
        <div className="min-h-[250px]">
          <div className="w-fit max-w-[500px] mt-6 pl-3 pr-6 py-3 border-l-4 bg-black/50" style={{ borderColor: activeResearch.color }}>
            <h4 className="font-bold" style={{ color: activeResearch.color }}>
              Description:
            </h4>
            <p className="font-bold text-white text-sm">{activeResearch.description}</p>
            <h4 className="mt-4 font-bold capitalize" style={{ color: activeResearch.color }}>
              Importance écologique:
            </h4>
            <p className="font-bold text-white text-sm">{activeResearch.importance}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-[repeat(3,minmax(auto,300px))] gap-3 justify-between">
          {researches.map((research, index) => (
            <div
              onMouseEnter={() => {
                setActiveIndex(index);
              }}
              key={index}
              className={`${activeIndex === index ? "bg-black/50" : ""} w-full pl-3 pr-6 py-7 border-l-4 border-b-4`}
              style={{ borderColor: activeIndex === index ? activeResearch.color : "transparent" }}
            >
              <h3 className="font-bold text-xl text-white text-center">{research.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
