import React, { useEffect, useRef, useState } from "react";

import Swiper, { SwiperOptions } from "swiper";
import axios from "axios";
import Swal from "sweetalert2";
import { SwiperSlideProps } from "swiper/react";
import UpcomingEventCard from "./UpcomingCard";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import LangLink from "../LangLink";
import UpcomingCard from "./UpcomingCard";
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
      ref?: React.RefObject<SwiperRef>;
      children?: React.ReactNode;
    }
    interface SwiperSlideAttributes extends KebabObjectKeys<SwiperSlideProps> { }
  }
}

type Event = {
  image?: string;
  title?: string;
  content?: string;
  date?: Date;
  location?: string;
  sub?: string;
};


export default function UpcomingEvents() {

  const swiperRef = useRef<SwiperRef>(null);

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

    Object.assign(swiperRef.current, swiperParams);

    swiperRef.current?.initialize();
  }, []);

  const [data, setData] = useState<any>(null);
  const [dataType, setDataType] = useState<string>("");

  const fetchVisibleEventTypes = async () => {
    try {
      const response = await axios.get("/api/visible-event-types");

      // Set both the data and the type
      setData(response.data.data);
      setDataType(response.data.type);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to fetch event types", "error");
    }
  };

  useEffect(() => {
    fetchVisibleEventTypes();
  }, []);

  return (
    <section className="px-3 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-primary text-2xl sm:text-[40px] text-center font-bold" style={{ textShadow: "2px 2px 2px rgb(0,0,0,.5)" }}>
          {dataType === "event" ? "Événements à venir" : "Nos Réalisations"}  
        </h2>
        <article className="mt-10">
          <swiper-container ref={swiperRef} class="w-full mx-auto max-w-[360px] md:max-w-7xl" init="false">
            {data?.map((item, index) => (
              <swiper-slide key={index} className="relative pb-10">
                <UpcomingCard data={item} type={item.type} />
              </swiper-slide>
            ))}

          </swiper-container>
          <div className="relative z-10 flex justify-between max-w-[300px] md:max-w-4xl mx-auto px-3 translate-y-[-90px] md:translate-y-0">
            <button id="events-prev">
              <div className="hidden md:block p-[2.5px] rounded-l-xl bg-gradient-to-r from-[#50ACC6] to-[#3344DC]">
                <div className="flex items-center gap-2 pl-1 pr-4 rounded-l-[10px] bg-white hover:bg-slate-200 duration-200">
                  <ArrowLeftCircleIcon className="text-primary w-8 h-8" />
                  <p>Previous</p>
                </div>
              </div>
              <div className="md:hidden flex items-center justify-center size-10 rounded-lg border border-[#3344DC]">
                <ChevronLeftIcon className="w-6 h-6 text-[#3344DC]" />
              </div>
            </button>
            <button id="events-next">
              <div className="hidden md:block p-[2.5px] rounded-r-xl bg-gradient-to-r from-[#50ACC6] to-[#3344DC]">
                <div className="flex items-center gap-2 pl-4 pr-1 rounded-r-[10px] bg-white hover:bg-slate-200 duration-200">
                  <p>Next</p>
                  <ArrowRightCircleIcon className="text-primary w-8 h-8" />
                </div>
              </div>
              <div className="md:hidden flex items-center justify-center size-10 rounded-lg border border-[#3344DC]">
                <ChevronRightIcon className="w-6 h-6 text-[#3344DC]" />
              </div>
            </button>
          </div>

          <LangLink
            to={`/${dataType === "event" ? "event" : "who-are-we/our-achievements"}`}
            className="block w-fit mx-auto mt-4 md:-mt-4 px-5 py-4 text-white font-semibold rounded-full bg-[linear-gradient(to_right,#006E9F,#51ADC6,#006E9F)] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right shadow-[-1px_2px_5px_rgb(0,0,0,.3)]"
          >
            Voir  {dataType === "event" ? "tous les Événements" : "toutes Nos Réalisations"}
          </LangLink> 
        </article>
      </div>
    </section>
  );
}
