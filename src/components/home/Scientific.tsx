import React, { useEffect, useRef, useState } from "react";
import { SwiperOptions } from "swiper/types";
import { Link } from "gatsby";
import axios from "axios";
import Swal from "sweetalert2";
import IResearch from "@/models/IResearch";


type Color = {
  image?: string;
  title?: string;
  description?: string;
  importance?: string;
  color1?: string;
  color2?: string;
  path?: string;
};

const colorsData: Color[] = [
  {
    color1: "#007C48",
    color2: "#44D091",
  },
  {
     color1: "#3344DC",
    color2: "#50ACC6",

  },
  {
   color1: "#DF2222",
    color2: "#FDBDBD",
    },
  {
  color1: "#00E676",
    color2: "#50ACC6",

  },
  {
  color1: "#F57C00",
    color2: "#FFCA28",
 
  },
  {
  
    color1: "#006E9F",
    color2: "#51ADC6",
    
  },
];


export default function Scientific() {
  const [researches, setResearches] = useState<IResearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const swiperThumbsRef = useRef<any>(null);

  const activeResearch = researches[activeIndex] || {
    color1: colorsData[activeIndex].color1,
    color2: colorsData[activeIndex].color2,
    title: "",
    description: "",
    importance: "",
  };

  console.log(activeResearch)

  function getSpecies() {
    axios
      .get("/api/popular-species")
      .then((res) => {

        setResearches(res.data);

        setLoading(false);
        setActiveIndex(0);
      })
      .catch((err) => {
        if(err?.response)
        Swal.fire("Error", err.response.data.message, "error");
      else
      Swal.fire("Error", err.message, "error");
      });
  }

  useEffect(() => {
    getSpecies();
    return;
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return; // Prevent accessing null

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
  }, [researches]);


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
  }, [researches]);

  useEffect(() => {
    if (!swiperThumbsRef.current || !swiperThumbsRef.current.swiper) return; // Prevent accessing null

    if (swiperThumbsRef.current.swiper.activeIndex !== activeIndex) {
      swiperThumbsRef.current.swiper.slideTo(activeIndex);
    }
  }, [activeIndex]);


  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">Loading...</p>
        </div>
      ) : (

        <section className="relative px-3 py-10 bg-cover">
          <style>
            {`
    :root {
      --active-research-color-1: ${activeResearch ? colorsData[activeIndex].color1 : "#007C48"};
      --active-research-color-2: ${activeResearch ? colorsData[activeIndex].color2 : "#44D091"};
    }
  `}
          </style>
          <div className="z-[-1] absolute inset-0">
          {/* @ts-ignore */}
            <swiper-container ref={swiperRef} class="w-full h-full mx-auto" init="false">
              {researches.map((research:any, index) => (
              //@ts-ignore
              <swiper-slide key={research.id}>
                  <img
                    src={`${process.env.GATSBY_API_URL}${research?.image}`}
                    alt={research.title_en || research.title_fr}
                    className="w-full h-full object-cover" />

                </swiper-slide>
              ))}
            </swiper-container>
          </div>
          <div className="max-w-7xl mx-auto text-shadow">

            <h3 className="text-white text-[40px] font-bold text-center mb-8">Suivi Marin</h3>

            {/* <h3 className="text-white text-4xl font-bold text-center mb-8">Suivi Marin</h3> */}

            <div className="relative w-fit ml-1 pl-3 pr-6 py-3 bg-black/50 after:absolute after:right-full after:top-0 after:bottom-0 after:w-1 after:bg-gradient-to-b after:from-[var(--active-research-color-1)] after:to-[var(--active-research-color-2)]">
              <h3 className="font-bold text-xl text-white">{activeResearch.title_en || activeResearch.title_fr}</h3>
            </div>
            <div className="min-h-[350px] md:min-h-[250px]">
              <div className="w-fit max-w-[500px] mt-6 pl-3 pr-6 py-3 bg-black/50">
                <h4 className="font-bold" style={{ color: colorsData[activeIndex].color1 }}>
                  Description:
                </h4>
                <p className="font-bold text-white text-sm">{activeResearch.description_en || activeResearch.description_fr}</p>
                <h4 className="mt-4 font-bold capitalize" style={{ color: colorsData[activeIndex].color1 }}>
                  Importance écologique:
                </h4>
                <p className="font-bold text-white text-sm">{activeResearch.ecological_importance_en || activeResearch.ecological_importance_fr}</p>
              </div>
            </div>
            <div className="mt-6 hidden md:grid grid-cols-[repeat(2,minmax(auto,300px))] md:grid-cols-[repeat(3,minmax(auto,300px))] gap-3 justify-between">
              {researches.map((research, index) => (
                <Link
                  to={`/protected-air-marine-coastal-areas/monitoring/marin/${research.slug}`}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                  }}
                  key={index}
                  className={`${activeIndex === index ? "bg-black/50" : ""
                    } relative w-full max-w-[250px] pl-3 pr-6 py-7 ml-1 mb-1 after:absolute after:right-full after:top-2 after:-bottom-1 after:w-1 after:bg-gradient-to-b before:absolute before:top-full before:right-2 before:-left-1 before:h-1 before:bg-gradient-to-l ${activeIndex === index
                      ? "after:from-[var(--active-research-color-1)] after:to-[var(--active-research-color-2)] before:from-[var(--active-research-color-1)] before:to-[var(--active-research-color-2)]"
                      : ""
                    }`}
                >
                  <h3 className="font-bold text-xl text-white text-center">{research.title_en || research.title_fr}</h3>
                </Link>
              ))}
            </div>
            <div className="md:hidden relative z-10 flex justify-between gap-4 mx-auto mt-6 px-">
              {/* @ts-ignore */}
              <swiper-container ref={swiperThumbsRef} class="w-full h-full mx-auto" init="false">
                {researches.map((research, index) => (
                  // @ts-ignore
                  <swiper-slide key={research.title} class={`h-auto py-1 ${activeIndex === index ? "" : "opacity-75"}`}>
                    {/* <img src={research.image} className="w-full h-full object-cover" /> */}
                    <div
                      onClick={() => swiperThumbsRef.current?.swiper.slideTo(index)}
                      className={`relative flex items-center justify-center w-full h-full max-w-[250px] pl-3 pr-6 py-7 bg-black/50 after:absolute after:right-full after:top-2 after:-bottom-1 after:w-1 after:bg-gradient-to-b before:absolute before:top-full before:right-2 before:-left-1 before:h-1 before:bg-gradient-to-l after:from-[var(--active-research-color-1)] after:to-[var(--active-research-color-2)] before:from-[var(--active-research-color-1)] before:to-[var(--active-research-color-2)]`}
                    >
                      <h3 className="font-bold text-lg text-white text-center">{research.title_en}</h3>
                    </div>
                  </swiper-slide>
                ))}

              </swiper-container>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
