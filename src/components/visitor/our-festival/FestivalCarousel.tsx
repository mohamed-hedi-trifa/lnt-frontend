import React, { useState, useEffect, ReactNode } from "react";

interface Props {
  switcher: ReactNode[];
}

const FestivalCarousel: React.FC<Props> = ({ switcher }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);
  const [thumbnailsToShow, setThumbnailsToShow] = useState(10); // Default to 10 thumbnails

  // Adjust the number of thumbnails displayed based on screen size
  const updateThumbnailCount = () => {
    let newThumbnailsToShow = 10; // Default for large screens

    if (window.innerWidth <= 640) {
      newThumbnailsToShow = 4; // Small screens
    } else if (window.innerWidth <= 1024) {
      newThumbnailsToShow = 10; // Medium screens
    }

    // Adjust thumbnailStart if necessary
    if (thumbnailStart + newThumbnailsToShow > switcher.length) {
      setThumbnailStart(Math.max(switcher.length - newThumbnailsToShow, 0));
    }
    setThumbnailsToShow(newThumbnailsToShow);
  };

  useEffect(() => {
    updateThumbnailCount(); // Initial check for screen size
    window.addEventListener("resize", updateThumbnailCount); // Update on resize
    return () => {
      window.removeEventListener("resize", updateThumbnailCount); // Cleanup
    };
  }, [thumbnailStart, switcher.length]);

  useEffect(() => {
    // Reset to first image and thumbnail start when switcher changes
    setActiveIndex(0);
    setThumbnailStart(0);
  }, [switcher]);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % switcher.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? switcher.length - 1 : prevIndex - 1
    );
  };

  const nextThumbnails = () => {
    setThumbnailStart((prevStart) => {
      const maxStart = switcher.length - thumbnailsToShow;
      return Math.min(prevStart + 1, maxStart);
    });
  };

  const prevThumbnails = () => {
    setThumbnailStart((prevStart) => Math.max(prevStart - 1, 0));
  };

  return (
    <div className="relative">
      {/* Main Image Carousel */}
      <div className="flex items-center justify-center">
        {/* Previous Button */}
        <button
          className="text-white w-[56px] h-[56px] rounded-full absolute left-0 z-10"
          onClick={prevImage}
          aria-label="Previous Image"
        >
          <img src="/carousel_images/right.svg" alt="Previous" />
        </button>

        {/* Main Image */}
        <div className="mx-4">
          {switcher.length > 0 ? (
            
              switcher[activeIndex % switcher.length]
        
          ) : (
            <p className="text-center text-gray-500">No media to display</p>
          )}
        </div>

        {/* Next Button */}
        <button
          className="text-white w-[56px] h-[56px] rounded-full absolute right-0 z-10"
          onClick={nextImage}
          aria-label="Next Image"
        >
          <img src="/carousel_images/left.svg" alt="Next" />
        </button>
      </div>

      {/* Thumbnail List */}
      {/* <div className="flex items-center justify-center mt-4">
        <button
          className="text-white bg-white p-2 w-[56px] h-[56px] rounded-full"
          onClick={prevThumbnails}
          aria-label="Previous Thumbnails"
        >
          <img src="/carousel_images/right.svg" alt="Previous" />
        </button>
        <div className="flex overflow-x-auto space-x-4 mx-2">
          {switcher.length > 0 &&
            switcher
              .slice(thumbnailStart, thumbnailStart + thumbnailsToShow)
              .map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden ${
                    index + thumbnailStart === activeIndex
                      ? "border-[#0270A0]"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveIndex(index + thumbnailStart)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + thumbnailStart}`}
                    className="h-[50px] sm:w-[100px] sm:h-[100px] w-[70px] object-cover"
                  />
                </div>
              ))}
        </div>
        <button
          className="text-white p-2 w-[56px] h-[56px] rounded-full"
          onClick={nextThumbnails}
          aria-label="Next Thumbnails"
        >
          <img src="/carousel_images/left.svg" alt="Next" />
        </button>
      </div> */}
    </div>
  );
};

export default FestivalCarousel;


// import React, { useState, useEffect, ReactNode } from "react";

// interface Props {
//   switcher: ReactNode[];
// }

// const FestivalCarousel: React.FC<Props> = ({ switcher }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [thumbnailStart, setThumbnailStart] = useState(0);
//   const [thumbnailsToShow, setThumbnailsToShow] = useState(10); // Default to 10 thumbnails

//   // Adjust the number of thumbnails displayed based on screen size
//   const updateThumbnailCount = () => {
//     let newThumbnailsToShow = 10; // Default for large screens

//     if (window.innerWidth <= 640) {
//       newThumbnailsToShow = 4; // Small screens
//     } else if (window.innerWidth <= 1024) {
//       newThumbnailsToShow = 10; // Medium screens
//     }

//     // Adjust thumbnailStart if necessary
//     if (thumbnailStart + newThumbnailsToShow > switcher.length) {
//       setThumbnailStart(Math.max(switcher.length - newThumbnailsToShow, 0));
//     }
//     setThumbnailsToShow(newThumbnailsToShow);
//   };

//   useEffect(() => {
//     updateThumbnailCount(); // Initial check for screen size
//     window.addEventListener("resize", updateThumbnailCount); // Update on resize
//     return () => {
//       window.removeEventListener("resize", updateThumbnailCount); // Cleanup
//     };
//   }, [thumbnailStart, switcher.length]);

//   useEffect(() => {
//     // Reset to first image and thumbnail start when switcher changes
//     setActiveIndex(0);
//     setThumbnailStart(0);
//   }, [switcher]);

//   const nextImage = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % switcher.length);
//   };

//   const prevImage = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === 0 ? switcher.length - 1 : prevIndex - 1
//     );
//   };

//   const nextThumbnails = () => {
//     setThumbnailStart((prevStart) => {
//       const maxStart = switcher.length - thumbnailsToShow;
//       return Math.min(prevStart + 1, maxStart);
//     });
//   };

//   const prevThumbnails = () => {
//     setThumbnailStart((prevStart) => Math.max(prevStart - 1, 0));
//   };

//   return (
//     <div className="relative">
//       {/* Main Image Carousel */}
//       <div className="flex items-center justify-center">
//         {/* Previous Button */}
//         <button
//           className="text-white w-[56px] h-[56px] rounded-full absolute left-0 z-10"
//           onClick={prevImage}
//           aria-label="Previous Image"
//         >
//           <img src="/carousel_images/right.svg" alt="Previous" />
//         </button>

//         {/* Main Image */}
//         <div className="mx-4">
//           {switcher.length > 0 ? (
            
//               switcher[activeIndex % switcher.length]
        
//           ) : (
//             <p className="text-center text-gray-500">No media to display</p>
//           )}
//         </div>

//         {/* Next Button */}
//         <button
//           className="text-white w-[56px] h-[56px] rounded-full absolute right-0 z-10"
//           onClick={nextImage}
//           aria-label="Next Image"
//         >
//           <img src="/carousel_images/left.svg" alt="Next" />
//         </button>
//       </div>

//       {/* Thumbnail List */}
//       {/* <div className="flex items-center justify-center mt-4">
//         <button
//           className="text-white bg-white p-2 w-[56px] h-[56px] rounded-full"
//           onClick={prevThumbnails}
//           aria-label="Previous Thumbnails"
//         >
//           <img src="/carousel_images/right.svg" alt="Previous" />
//         </button>
//         <div className="flex overflow-x-auto space-x-4 mx-2">
//           {switcher.length > 0 &&
//             switcher
//               .slice(thumbnailStart, thumbnailStart + thumbnailsToShow)
//               .map((image, index) => (
//                 <div
//                   key={index}
//                   className={`cursor-pointer rounded-md overflow-hidden ${
//                     index + thumbnailStart === activeIndex
//                       ? "border-[#0270A0]"
//                       : "border-transparent"
//                   }`}
//                   onClick={() => setActiveIndex(index + thumbnailStart)}
//                 >
//                   <img
//                     src={image}
//                     alt={`Thumbnail ${index + thumbnailStart}`}
//                     className="h-[50px] sm:w-[100px] sm:h-[100px] w-[70px] object-cover"
//                   />
//                 </div>
//               ))}
//         </div>
//         <button
//           className="text-white p-2 w-[56px] h-[56px] rounded-full"
//           onClick={nextThumbnails}
//           aria-label="Next Thumbnails"
//         >
//           <img src="/carousel_images/left.svg" alt="Next" />
//         </button>
//       </div> */}
//     </div>
//   );
// };

// export default FestivalCarousel;


