import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useMediaQuery } from "react-responsive";
import "./ImageGallery.css";

const GetVideoTitle = ({ videoId }: { videoId: string }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(
      `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de la vidéo :",
          error
        );
      });
  }, [videoId]);

  return <h1>{title}</h1>;
};

const YouTubeThumbnail = ({ url }: { url: string }) => {
  // Fonction pour extraire l'ID de la vidéo à partir de l'URL YouTube
  const getVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/(?:www\.)?youtube\.com(?:\/(?:[^\/\n\s]+\/\S+\/\S*\/|\S*\/)?(?:v|e(?:mbed)?)\/(\S{11}))|youtu\.be\/([a-zA-Z0-9_-]{11}))\S*/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  const videoId = getVideoId(url);

  if (!videoId) return <div>Invalid YouTube URL</div>;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <img
      src={thumbnailUrl}
      alt="YouTube Video Thumbnail"
      className="w-full h-[100px] object-cover rounded-xl"
    />
  );
};

const VideoGallery = ({ videos = [] }: { videos: any[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        loop={true}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        className="rounded-xl shadow-lg"
      >
        {videos.length > 0 &&
          videos.map((item) => (
            <SwiperSlide key={item.id}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${item?.video_id}?rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[400px] object-cover rounded-xl shadow-helmi"
              />
            </SwiperSlide>
          ))}
        <div className="w-full h-full top-0 z-10 absolute flex items-center justify-between  pointer-events-none">
          <div className="swiper-prev ml-2.5 pointer-events-auto">
            <ChevronLeftIcon className="text-[#3E3232]" />
          </div>
          <div className="swiper-next mr-2.5 pointer-events-auto">
            <ChevronRightIcon className="text-[#3E3232]" />
          </div>
        </div>
      </Swiper>

      {/* Thumbnail Swiper */}
      {isDesktop ? (
        <div className="px-10 relative mt-[30px] ">
          <Swiper
            modules={[Thumbs, FreeMode, Navigation]}
            onSwiper={setThumbsSwiper}
            navigation={{
              nextEl: ".thumb-next",
              prevEl: ".thumb-prev",
            }}
            spaceBetween={25}
            slidesPerView={4}
            watchSlidesProgress={true}
            className="mt-4"
          >
            {videos.length > 0 &&
              videos.map((item) => (
                <SwiperSlide key={item.id} className="cursor-pointer">
                  <YouTubeThumbnail
                    url={`https://www.youtube.com/embed/${item?.video_id}`}
                  />
                  <GetVideoTitle videoId={item?.video_id} />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="w-full h-full top-0 left-0 z-50 absolute flex items-center justify-between pointer-events-none">
            <div className="thumb-prev relative  z-50 pointer-events-auto">
              <ChevronLeftIcon className="text-[#3E3232]" />
            </div>
            <div className="thumb-next relative z-50 pointer-events-auto">
              <ChevronRightIcon className="text-[#3E3232]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="px-10 relative mt-[30px]">
          <Swiper
            modules={[Thumbs, FreeMode, Navigation]}
            onSwiper={setThumbsSwiper}
            navigation={{
              nextEl: ".thumb-next",
              prevEl: ".thumb-prev",
            }}
            spaceBetween={20}
            slidesPerView={4}
            watchSlidesProgress={true}
            className="mt-4"
          >
            {videos.length > 0 &&
              videos.map((item, index) => (
                <SwiperSlide key={item.id || index} className="cursor-pointer">
                  <YouTubeThumbnail
                    url={`https://www.youtube.com/embed/${item?.video_id}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="w-full h-full top-0 left-0 z-50 absolute flex items-center justify-between">
            <div className="thumb-prev relative z-50">
              <ChevronLeftIcon className="text-[#3E3232]" />
            </div>
            <div className="thumb-next relative z-50">
              <ChevronRightIcon className="text-[#3E3232]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
