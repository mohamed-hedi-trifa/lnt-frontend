import React, { useEffect, useRef, useState } from "react";
import Swiper, { SwiperOptions } from "swiper";
import axios from "axios";
import Swal from "sweetalert2";
import { SwiperSlideProps } from "swiper/react";
import UpcomingCard from "./UpcomingCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import LangLink from "../LangLink";
import { Link } from "gatsby";
import AchievementCardHome from "./AchievementCardHome";
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
 * Swiper 9 doesn't fully support TS yet.
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
      ref?: React.RefObject<SwiperRef>;
      children?: React.ReactNode;
    }
    interface SwiperSlideAttributes extends KebabObjectKeys<SwiperSlideProps> {}
  }
}

export default function UpcomingEvents() {
  const swiperRef = useRef<SwiperRef>(null);
  const [data, setData] = useState<any>(null);
  const [dataType, setDataType] = useState<string>("");

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      pagination: { clickable: true },
      spaceBetween: 20,
      slidesPerView: 1,
      slidesPerGroup: 1,
      navigation: {
        nextEl: "#events-next",
        prevEl: "#events-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },
    };

    // Assigne les paramètres au composant swiper (web component)
    Object.assign(swiperRef.current, swiperParams);
    swiperRef.current?.initialize();
  }, []);

  const fetchVisibleEventTypes = async () => {
    try {
      const response = await axios.get("/api/visible-event-types");
      setData(response.data.data);
      setDataType(response.data.type);
    } catch (error: any) {
      Swal.fire("Error", error.response?.data?.message || "Failed to fetch event types", "error");
    }
  };

  useEffect(() => {
    fetchVisibleEventTypes();
  }, []);

  return (
    <section className="px-3 py-20">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-primary text-2xl sm:text-[40px] text-center font-bold"
          style={{ textShadow: "2px 2px 2px rgb(0,0,0,.5)" }}
        >
          {dataType === "event" ? "Événements à venir" : "Nos Réalisations"}
        </h2>

        <article className="mt-10">
          {/* Wrapper qui contient la flèche gauche, le carrousel, et la flèche droite */}
          <div className="max-w-[360px] md:max-w-7xl mx-auto flex items-center justify-center gap-4">
            {/* Flèche gauche */}
            <button
              id="events-prev"
              className="p-2 bg-white rounded-full shadow hover:bg-slate-200 duration-200"
            >
              <ChevronLeftIcon className="w-6 h-6 text-[#3344DC]" />
            </button>

            {/* Carrousel Swiper */}
            <swiper-container ref={swiperRef} class="w-full h-full " init="false">
              {data?.map((item: any, index: number) => (
                <swiper-slide key={index} class="pb-10 flex items-center justify-center">
                  {dataType === "event" ? (
                    <Link key={item.id} to={`/event/event-details/${item.slug}`}>
                      <UpcomingCard data={item} type={item.type} />
                    </Link>
                  ) : (
                    <Link key={item.id} to={`/who-are-we/our-achievements/${item.slug}`}>
                      <AchievementCardHome achievement={item} /> 
                    </Link>
                  )}
                </swiper-slide>
              ))}
            </swiper-container>

            {/* Flèche droite */}
            <button
              id="events-next"
              className="p-2 bg-white rounded-full shadow hover:bg-slate-200 duration-200"
            >
              <ChevronRightIcon className="w-6 h-6 text-[#3344DC]" />
            </button>
          </div>

          {/* Bouton pour voir tous les événements ou réalisations */}
          <LangLink
            to={`/${dataType === "event" ? "event" : "who-are-we/our-achievements"}`}
            className="block w-fit mx-auto mt-8 px-5 py-4 text-white font-semibold rounded-full 
                       bg-[linear-gradient(to_right,#006E9F,#51ADC6,#006E9F)] 
                       transition-all duration-300 bg-[length:200%_100%] bg-left 
                       hover:bg-right shadow-[-1px_2px_5px_rgb(0,0,0,.3)]"
          >
            Voir {dataType === "event" ? "tous les Événements" : "toutes Nos Réalisations"}
          </LangLink>
        </article>
      </div>
    </section>
  );
}
