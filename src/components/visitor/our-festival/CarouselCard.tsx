import React, { useState, useEffect, ReactNode } from "react";
import FestivalCardCarousel from "./FestivalCardCarousel";

type festivalProperties={
  date: string
  description : string
  titre : string
  lieu : string 
  properties : string
  buttonsTitles : string    
  buttonPosition : string 
    
}

interface Props {
  cards: festivalProperties[];
  
}
const CarouselCard: React.FC<Props> = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);
  const [thumbnailsToShow, setThumbnailsToShow] = useState(10); // Default to 10 thumbnails

  const updateThumbnailCount = () => {
    if (typeof window === "undefined") return;
  
    let newThumbnailsToShow = 10; // Default for large screens
  
    if (window.innerWidth <= 640) {
      newThumbnailsToShow = 4; // Small screens
    } else if (window.innerWidth <= 1024) {
      newThumbnailsToShow = 10; // Medium screens
    }
  
    if (thumbnailStart + newThumbnailsToShow > cards.length) {
      setThumbnailStart(Math.max(cards.length - newThumbnailsToShow, 0));
    }
  
    setThumbnailsToShow(newThumbnailsToShow);
  };
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      updateThumbnailCount(); // Initial check
      window.addEventListener("resize", updateThumbnailCount); // Listen to resize
      return () => {
        window.removeEventListener("resize", updateThumbnailCount); // Cleanup
      };
    }
  }, [thumbnailStart, cards.length]);
  

  useEffect(() => {
    // Reset to first image and thumbnail start when cards changes
    setActiveIndex(0);
    setThumbnailStart(0);
  }, [cards]);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const nextThumbnails = () => {
    setThumbnailStart((prevStart) => {
      const maxStart = cards.length - thumbnailsToShow;
      return Math.min(prevStart + 1, maxStart);
    });
  };

  const prevThumbnails = () => {
    setThumbnailStart((prevStart) => Math.max(prevStart - 1, 0));
  };

  return (
    <div className="relative">
      {/* Main Image Carousel */}
      <div className="grid grid-cols-[5%_auto_5%]">
        {/* Previous Button */}
        <div className="flex items-center justify-center">
            <button
              className="text-white w-[56px] h-[56px] rounded-full absolute left-0 z-10"
              onClick={prevImage}
              aria-label="Previous Image"
            >
              <img src="/carousel_images/right.svg" alt="Previous" />
            </button>
        </div>
       

        {/* Main Image */}
        <div className="mx-4 ">
          {cards.length > 0 ? 
          <FestivalCardCarousel
              // key={cards[activeIndex % cards.length].}
              date={cards[activeIndex % cards.length].date}
              description={cards[activeIndex % cards.length].description}
              titre={cards[activeIndex % cards.length].titre}
              lieu={cards[activeIndex % cards.length].lieu} image={""} year={""} slug={""}                      /> : (
                     <p className="text-center text-gray-500">No media to display</p>
          )}
        </div>

        <div className="flex items-center justify-center">
            <button
                className="text-white w-[56px] h-[56px] rounded-full absolute right-0 z-10"
                onClick={nextImage}
                aria-label="Next Image"
              >
                <img src="/carousel_images/left.svg" alt="Next" />
            </button>
        </div>
      
      </div>


    </div>
  );
};

export default CarouselCard;
