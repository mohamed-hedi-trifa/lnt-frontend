import React, { useState } from "react";
import Carousel2 from "./Carousel2";

const Media: React.FC = () => {
  const [initialPhotoColor, setInitialPhotoColor] = useState("#ffffff");
  const [initialPhotoBgColor, setInitialPhotoBgColor] = useState("#0270A0");
  const [initialVideoColor, setInitialVideoColor] = useState("#000000");
  const [initialVideoBgColor, setInitialVideoBgColor] = useState("#EBEBEB");

  const images = [
    "/carousel_images/c1.png",
    "/carousel_images/c2.png",
    "/carousel_images/c4.png",
    "/carousel_images/c5.png",
    "/carousel_images/c6.png",
    "/carousel_images/c7.png",
    "/carousel_images/c8.png",
    "/carousel_images/c9.png",
    "/carousel_images/c10.png",
    "/carousel_images/c11.png",
  ];

  const videos = [
    "/images/images_histoire/img1.png",
    "/images/images_histoire/img2.png",
    "/images/images_histoire/img3.png",
    "/images/images_histoire/img4.png",
  ];

  const [media, setMedia] = useState<string[]>(images);

  const handlePhotoClick = () => {
    setInitialPhotoColor("#ffffff");
    setInitialPhotoBgColor("#0270A0");
    setInitialVideoColor("#000000");
    setInitialVideoBgColor("#EBEBEB");
    setMedia(images);
  };

  const handleVideoClick = () => {
    setInitialPhotoColor("#000000");
    setInitialPhotoBgColor("#EBEBEB");
    setInitialVideoColor("#ffffff");
    setInitialVideoBgColor("#0270A0");
    setMedia(videos);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-center">
        {/* Bouton Photos avec styles en ligne pour utiliser les couleurs dynamiques */}
        <div
          onClick={handlePhotoClick}
          style={{ backgroundColor: initialPhotoBgColor, color: initialPhotoColor }}
          className="rounded-l-[20px] w-[100px] sm:w-[241px] h-[32px] sm:h-[53px] flex items-center justify-center text-[22px] sm:text-[30px] font-bold cursor-pointer"
        >
          Photos
        </div>
        {/* Bouton Vidéos */}
        <div
          onClick={handleVideoClick}
          style={{ backgroundColor: initialVideoBgColor, color: initialVideoColor }}
          className="rounded-r-[20px] w-[100px] sm:w-[241px] h-[32px] sm:h-[53px] flex items-center justify-center text-[22px] sm:text-[30px] font-bold cursor-pointer"
        >
          Vidéos
        </div>
      </div>
      <div className="h-10"></div>
      <Carousel2 switcher={media} />
    </div>
  );
};

export default Media;
