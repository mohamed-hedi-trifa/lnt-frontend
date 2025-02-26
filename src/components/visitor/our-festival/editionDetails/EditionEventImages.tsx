import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";

const EditionEventImages = ({ media = [], id }: { media: string[]; id: string }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // Generate unique class names for navigation buttons
    const nextButtonClass = `.swiper-nexxt-${id}`;
    const prevButtonClass = `.swiper-previous-${id}`;



    return (
        <div className="w-[500px] h-[280px] relative">
            <Swiper
                modules={[Navigation, Thumbs]}
                loop={true}
                spaceBetween={10}
                navigation={{
                    nextEl: nextButtonClass,
                    prevEl: prevButtonClass,
                }}
                thumbs={{ swiper: thumbsSwiper }}
                className="shadow-lg h-full rounded-2xl"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {media.map((item, idx) => (
                    <SwiperSlide key={idx} className="relative w-full h-[412px] sm:h-[607px] bg-cover bg-center">
                        {item.media_type === 'video' ? (
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${item?.video_id}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full object-cover rounded-xl shadow-helmi"
                            />
                        ) : (
                            <img
                            src={`${process.env.GATSBY_API_URL}${item.media_url}`}
                            alt="evenement"
                            className="w-full h-[400px] object-cover rounded-xl shadow-helmi"
                          />
                        )}
           
                    </SwiperSlide>
                ))}
            </Swiper>


            <button className={`swiper-previous-${id} absolute left-3 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full`}>
                <LeftIcon />
            </button>

            <button className={`swiper-nexxt-${id} absolute right-3 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full`}>
                <RightIcon />
            </button>

            {/* Pagination dots */}
            < div className="absolute bottom-[-35px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none" >
                <div className="flex sm:gap-5 gap-3 w-fit sm:px-3 px-2 sm:py-2 py-1 rounded-xl">
                    {media.map((_, idx) => (
                        <div
                            key={idx}
                            className={`sm:w-3 w-3 sm:h-3 h-3 rounded-full transition-all duration-500 ease-in-out
                                ${idx === activeIndex ? "bg-[#0270A0] scale-125 opacity-100 shadow-lg" : "bg-black/30 scale-100 opacity-60"}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default EditionEventImages;