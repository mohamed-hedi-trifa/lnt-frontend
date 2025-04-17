import ResearchCard from "@/components/visitor/aire-marine/monitoring/terrestre/ResearchCard";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { SwiperOptions } from "swiper/types";
import { Link } from "gatsby";




export default function DecouvrezDautresEspeces({ currentBlog }: { currentBlog: any }) {

  const [researches, setResearches] = useState();

  const getResearches = async () => {
    try {

      const res = await axios.get(`/api/get-${currentBlog.type}-researches`);
      setResearches(res.data);
      console.log(res.data)

    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch edition", "error");
    } finally {

    }
  };

  useEffect(() => {
    getResearches();
  }, [])

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
          {researches
            ?.filter((research) => research.id !== currentBlog.id)
            .map((research, index) => (
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
          {researches
            ?.filter((research) => research.id !== currentBlog.id)
            .map((research, index) => (
              <div key={index} className="relative">
                <Link to={`/protected-air-marine-coastal-areas/monitoring/${research.type}/${research.slug}`}>
                  <ResearchCard image={research.image} title={research.title_en || research.title_fr} />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </article>
  );
}
