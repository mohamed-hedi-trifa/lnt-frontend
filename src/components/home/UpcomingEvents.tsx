import React, { useEffect, useRef, useState } from "react";
import Swiper, { SwiperOptions } from "swiper";
import axios from "axios";
import Swal from "sweetalert2";
import UpcomingCard from "./UpcomingCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import LangLink from "../LangLink";
import { Link } from "gatsby";
import AchievementCardHome from "./AchievementCardHome";

type Kebab<T extends string, A extends string = ""> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
  : A;
type KebabObjectKeys<T> = { [k in keyof T as Kebab<k & string>]: T[k] extends Object ? KebabObjectKeys<T[k]> : T[k] };
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
    interface SwiperSlideAttributes {
      class?: string;
    }
  }
}

const SkeletonCard = () => (
  <div className="border rounded-lg overflow-hidden h-[480px] w-[380px] flex flex-col shadow-lg">
    <div className="w-full h-48 bg-gray-300/70 animate-pulse" />
    <div className="px-3 py-4 flex flex-col flex-grow justify-between">
      <div className="space-y-3">
        <div className="h-4 w-24 bg-gray-300/70 animate-pulse rounded" />
        <div className="h-6 w-3/4 bg-gray-300/70 animate-pulse rounded" />
        <div className="h-4 w-full bg-gray-300/70 animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-gray-300/70 animate-pulse rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-px bg-gray-300" />
        <div className="h-4 w-3/4 bg-gray-300/70 animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-gray-300/70 animate-pulse rounded" />
      </div>
    </div>
  </div>
);

export default function UpcomingEvents() {
  const swiperRef = useRef<SwiperRef>(null);
  const [data, setData] = useState<any>(null);
  const [dataType, setDataType] = useState<string>("");

  useEffect(() => {
    const params: SwiperOptions = {
      pagination: { clickable: true },
      spaceBetween: 20,
      slidesPerView: 1,
      slidesPerGroup: 1,
      navigation: { nextEl: "#events-next", prevEl: "#events-prev" },
      breakpoints: { 768: { slidesPerView: 3, slidesPerGroup: 3 } },
    };
    Object.assign(swiperRef.current, params);
    swiperRef.current?.initialize();
  }, []);

  useEffect(() => {
    axios
      .get("/api/visible-event-types")
      .then((r) => {
        setData(r.data.data);
        setDataType(r.data.type);
      })
      .catch((err) =>
        Swal.fire("Error", err.response?.data?.message || "Failed to fetch event types", "error")
      );
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
          <div className="max-w-[360px] md:max-w-7xl mx-auto flex items-center justify-center gap-4">
            <button id="events-prev" className="p-2 bg-white rounded-full shadow hover:bg-slate-200 duration-200">
              <ChevronLeftIcon className="w-6 h-6 text-[#3344DC]" />
            </button>

            <swiper-container ref={swiperRef} class="w-full h-full" init="false">
              {(data ?? Array.from({ length: 3 })).map((item: any, idx: number) => (
                <swiper-slide key={idx} class="pb-10 flex items-center justify-center">
                  {data ? (
                    dataType === "event" ? (
                      <Link to={`/event/event-details/${item.slug}`}>
                        <UpcomingCard data={item} type={item.type} />
                      </Link>
                    ) : (
                      <Link to={`/who-are-we/our-achievements/${item.slug}`}>
                        <AchievementCardHome achievement={item} />
                      </Link>
                    )
                  ) : (
                    <SkeletonCard />
                  )}
                </swiper-slide>
              ))}
            </swiper-container>

            <button id="events-next" className="p-2 bg-white rounded-full shadow hover:bg-slate-200 duration-200">
              <ChevronRightIcon className="w-6 h-6 text-[#3344DC]" />
            </button>
          </div>

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
