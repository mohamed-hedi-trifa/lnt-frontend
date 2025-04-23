import ResearchCard from "@/components/visitor/aire-marine/monitoring/terrestre/ResearchCard";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { SwiperOptions } from "swiper/types";
import { Link } from "gatsby";


export default function ExplorezSuiviTerrestre() {
  const [researches, setResearches] = useState();

  const getResearches = async () => {
    try {
      const res = await axios.get("/api/get-terrestre-researches");
      setResearches(res.data);
      console.log(res.data);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch edition", "error");
    }
  };

  useEffect(() => {
    getResearches();
  }, []);

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      spaceBetween: 50,
      slidesPerView: "auto",
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, swiperParams);
      swiperRef.current.initialize?.();
    }
  }, []);

  // Add this conditional check
  if (!researches || researches.length === 0) {
    return null;
  }

  return (
    <div>
      <section className='border-t border-[#000000] pb-10'/>
      <article className="">
      <div className="text-justify  text-[24px] sm:text-[32px] font-bold pb-4">
        <p className="text-center text-[30px] sm:text-[32px]">
          <span className="text-[#0270A0]">Explorer</span> Les espéces de Notre Suivi Terrestre{" "}
        </p>
      </div>
      <div className="text-justify  text-[18px] sm:text-[22px] font-bold">
        <p className="text-center text-[18px] sm:text-[20px]">Découvrez les trésors terrestres que nous surveillons pour</p>
        <p className="text-center text-[18px] sm:text-[20px]">préserver l'équilibre écologique.</p>
      </div>
      <div className="hidden md:block">
        <swiper-container ref={swiperRef} class="w-full mt-[50px] mb-[50px] mx-auto" init="false">
          {researches.map((research, index) => (
            <swiper-slide key={index} class="relative w-fit">
              <Link to={`/protected-air-marine-coastal-areas/monitoring/${research.type}/${research.slug}`}>
                <ResearchCard image={research.image} title={research.title_en || research.title_fr} />
              </Link>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      <div className="md:hidden">
        <div className="grid grid-cols-2 mt-[50px] mb-[80px] gap-[20px]">
          {researches.map((research, index) => (
            <div key={index} className="relative">
              <Link to={`/protected-air-marine-coastal-areas/monitoring/${research.type}/${research.slug}`}>
                <ResearchCard image={research.image} title={research.title_en || research.title_fr} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </article>
    </div>

  );
}
