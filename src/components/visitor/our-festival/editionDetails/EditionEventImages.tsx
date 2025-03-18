import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";

interface MediaItem {
  media_type: "video" | "image";
  video_id?: string;
  media_url?: string;
}

interface EditionEventImagesProps {
  media: MediaItem[];
  id: string;
}

const EditionEventImages: React.FC<EditionEventImagesProps> = ({ media = [], id }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const nextButtonClass = `.swiper-next-${id}`;
  const prevButtonClass = `.swiper-prev-${id}`;

  return (
    <div className="flex justify-center "> 
      <div className="w-full sm:max-w-lg max-w-[340px] sm:pt-0 pt-4">
        <div className="relative">
          <Swiper
            modules={[Navigation, Thumbs]}
            loop={true}
            spaceBetween={10}
            navigation={{
              nextEl: nextButtonClass,
              prevEl: prevButtonClass,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            className="shadow-lg rounded-2xl aspect-video"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {media.map((item, idx) => (
              <SwiperSlide key={idx} className="w-full h-full">
                {item.media_type === "video" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.video_id}?rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover rounded-xl shadow-helmi"
                  />
                ) : (
                  <img
                    src={`${process.env.GATSBY_API_URL}${item.media_url}`}
                    alt="événement"
                    className="w-full h-full object-cover rounded-xl shadow-helmi"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={`swiper-prev-${id} absolute left-3 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-lg hover:bg-[rgba(0,110,159,0.7)]`}
          >
            <LeftIcon />
          </button>

          <button
            className={`swiper-next-${id} absolute right-3 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-lg hover:bg-[rgba(0,110,159,0.7)]`}
          >
            <RightIcon />
          </button>
        </div>

        {/* Pagination dots sous le slider */}
        <div className="mt-4 flex justify-center gap-3">
          {media.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-transform duration-500 ease-in-out ${
                idx === activeIndex
                  ? "bg-[#0270A0] scale-125 opacity-100 shadow-lg"
                  : "bg-black/30 opacity-60"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditionEventImages;
