import React, { useEffect, useRef, useState } from "react";

import Swiper, { SwiperOptions } from "swiper";
import { SwiperSlideProps } from "swiper/react";
import UpcomingEventCard from "./UpcomingEventCard";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import LangLink from "../LangLink";
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
    interface SwiperSlideAttributes extends KebabObjectKeys<SwiperSlideProps> {}
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

const defaultEvents: Event[] = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/2c11/7c68/bc48112ce61984596b11b9b169f0c478?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TsmEh4P0HalKpMYqrPEcjbYAz6pX37d1Bxts6G6CxF4o0pTPhKN8MtHlEHL8j8MafZ~1YojN0vI0PzbJrn6u8Fr4qM-rzSgi51A7JP-wWKHvh9144uoM3sHU7xLoiEJIwIUiVggxyXVQUPywRai-ruacP8Jm5i~qunxwfLtb3JVd42KtcXoVrdX1WFCunOpxu9qLb3aDGu6vxRo3jD1XAoapxSEq1PGyvML29Tg4mGTpnCzUfZYXwEnRfZGIiJf1A~znsmRIpq6oSvmxfcIiJXg3DSinFPhc7mnSzTEvM07GZqDZuhkf4gmLGoHTwnKrsd5cUtaTjzxfcff4x~Bjuw__",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    content: `L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), en partenariat avec la Maison des Jeunes de Kraten, organise le Festival de la Culture des Îles Méditerranéennes "Édition du regretté Farid Khasharem". Du 1er au 6 août`,
    date: new Date("2024-12-31T00:00:00"),
    location: "Kraten, Kerkennah",
    sub: "Du 1er au 6 août",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/2c11/7c68/bc48112ce61984596b11b9b169f0c478?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TsmEh4P0HalKpMYqrPEcjbYAz6pX37d1Bxts6G6CxF4o0pTPhKN8MtHlEHL8j8MafZ~1YojN0vI0PzbJrn6u8Fr4qM-rzSgi51A7JP-wWKHvh9144uoM3sHU7xLoiEJIwIUiVggxyXVQUPywRai-ruacP8Jm5i~qunxwfLtb3JVd42KtcXoVrdX1WFCunOpxu9qLb3aDGu6vxRo3jD1XAoapxSEq1PGyvML29Tg4mGTpnCzUfZYXwEnRfZGIiJf1A~znsmRIpq6oSvmxfcIiJXg3DSinFPhc7mnSzTEvM07GZqDZuhkf4gmLGoHTwnKrsd5cUtaTjzxfcff4x~Bjuw__",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    content: `L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), en partenariat avec la Maison des Jeunes de Kraten, organise le Festival de la Culture des Îles Méditerranéennes "Édition du regretté Farid Khasharem". Du 1er au 6 août`,
    date: new Date(),
    location: "Kraten, Kerkennah",
    sub: "Du 1er au 6 août",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/2c11/7c68/bc48112ce61984596b11b9b169f0c478?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TsmEh4P0HalKpMYqrPEcjbYAz6pX37d1Bxts6G6CxF4o0pTPhKN8MtHlEHL8j8MafZ~1YojN0vI0PzbJrn6u8Fr4qM-rzSgi51A7JP-wWKHvh9144uoM3sHU7xLoiEJIwIUiVggxyXVQUPywRai-ruacP8Jm5i~qunxwfLtb3JVd42KtcXoVrdX1WFCunOpxu9qLb3aDGu6vxRo3jD1XAoapxSEq1PGyvML29Tg4mGTpnCzUfZYXwEnRfZGIiJf1A~znsmRIpq6oSvmxfcIiJXg3DSinFPhc7mnSzTEvM07GZqDZuhkf4gmLGoHTwnKrsd5cUtaTjzxfcff4x~Bjuw__",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    content: `L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), en partenariat avec la Maison des Jeunes de Kraten, organise le Festival de la Culture des Îles Méditerranéennes "Édition du regretté Farid Khasharem". Du 1er au 6 août`,
    date: new Date(),
    location: "Kraten, Kerkennah",
    sub: "Du 1er au 6 août",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    content: `L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), en partenariat avec la Maison des Jeunes de Kraten, organise le Festival de la Culture des Îles Méditerranéennes "Édition du regretté Farid Khasharem". Du 1er au 6 août`,
    date: new Date(),
    location: "Kraten, Kerkennah",
    sub: "Du 1er au 6 août",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    content: `L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), en partenariat avec la Maison des Jeunes de Kraten, organise le Festival de la Culture des Îles Méditerranéennes "Édition du regretté Farid Khasharem". Du 1er au 6 août`,
    date: new Date(),
    location: "Kraten, Kerkennah",
    sub: "Du 1er au 6 août",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    content: `L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), en partenariat avec la Maison des Jeunes de Kraten, organise le Festival de la Culture des Îles Méditerranéennes "Édition du regretté Farid Khasharem". Du 1er au 6 août`,
    date: new Date(),
    location: "Kraten, Kerkennah",
    sub: "Du 1er au 6 août",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    content: `L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), en partenariat avec la Maison des Jeunes de Kraten, organise le Festival de la Culture des Îles Méditerranéennes "Édition du regretté Farid Khasharem". Du 1er au 6 août`,
    date: new Date(),
    location: "Kraten, Kerkennah",
    sub: "Du 1er au 6 août",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    content: `L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), en partenariat avec la Maison des Jeunes de Kraten, organise le Festival de la Culture des Îles Méditerranéennes "Édition du regretté Farid Khasharem". Du 1er au 6 août`,
    date: new Date(),
    location: "Kraten, Kerkennah",
    sub: "Du 1er au 6 août",
  },
  {
    image: "https://elcamba.ahmedatri.com/logo.png",
    title: "Festival de la Culture des îles Méditerranéennes de Kerkennah",
    content: `L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL), en partenariat avec la Maison des Jeunes de Kraten, organise le Festival de la Culture des Îles Méditerranéennes "Édition du regretté Farid Khasharem". Du 1er au 6 août`,
    date: new Date(),
    location: "Kraten, Kerkennah",
    sub: "Du 1er au 6 août",
  },
];

export default function UpcomingEvents() {
  const [events, setEvents] = useState(defaultEvents);
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

  return (
    <section className="px-3 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-primary text-3xl text-center font-bold" style={{ textShadow: "2px 2px 2px rgb(0,0,0,.5)" }}>
          Événements à venir
        </h2>
        <article className="mt-10">
          <swiper-container ref={swiperRef} class="w-full mx-auto max-w-[300px] md:max-w-4xl" init="false">
            {events?.map((event, index) => (
              <swiper-slide key={index} class="relative pb-10">
                <UpcomingEventCard event={event} />
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
            to="/events"
            className="block w-fit mx-auto mt-4 md:-mt-4 px-4 py-2 text-white text-sm font-semibold rounded-full bg-[linear-gradient(to_right,#50ACC6,#3344DC,#50ACC6)] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right shadow-[-1px_2px_5px_rgb(0,0,0,.3)]"
          >
            Voir tous les événements
          </LangLink>
        </article>
      </div>
    </section>
  );
}
