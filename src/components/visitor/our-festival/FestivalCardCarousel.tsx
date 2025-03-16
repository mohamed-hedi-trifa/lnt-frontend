import React from "react";
import PageParagraph2 from "@/components/atoms/PageParagraph2";

interface CardProps {
  titre: string;
  description: string;
  lieu: string;
  date: string;
  image: string;
  year: string;
}

const FestivalCardCarousel: React.FC<CardProps> = ({ titre, description, lieu, date, image, year }) => {
  return (
    <div className="max-w-full  ">
      <div className="flex flex-col sm:flex-row bg-white rounded-xl  overflow-hidden h-auto sm:h-[400px] ">
        {/* Partie image */}
        <div className="shrink-0 sm:w-1/2 w-full h-64 sm:h-full relative">
          <img
            src={`${process.env.GATSBY_API_URL}${image}`}
            alt={titre}
            className="w-full h-full object-cover"
          />
          <span className="absolute text-[#0270A0] top-2 left-2 bg-white px-2 py-1 text-xl rounded-md font-semibold ">
                    Édition {year}
                </span>
        </div>
        {/* Partie contenu */}
        <div className="sm:w-1/2 w-full p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{titre}</h3>
            <PageParagraph2>
                <p className="text-gray-700  mb-4 ">
                  {description}
                </p>
            </PageParagraph2>
          </div>
          <div>
            <hr className="mb-2" />
            <div className="text-sm text-gray-800 mb-2">
              <span className="font-bold text-[#0270A0]">Lieu: </span>{lieu}
            </div>
            <div className="text-sm text-gray-800 mb-4">
              <span className="font-bold text-[#0270A0]">Date: </span>{date}
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-2  bg-[linear-gradient(to_right,#006E9F,#51ADC6,#006E9F)] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right shadow-lg text-white font-bold rounded-full ">
                Explorer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalCardCarousel;
