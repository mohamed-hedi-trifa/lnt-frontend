import React from "react";
import PageParagraph2 from "@/components/atoms/PageParagraph2";
import { Link } from "gatsby";
import ButtonCard from "@/components/atoms/ButtonCard";

interface CardProps {
  titre: string;
  description: string;
  lieu: string;
  date: string;
  image: string;
  year: string;
  slug: string;
}

const FestivalCardCarousel: React.FC<CardProps> = ({ titre, description, lieu, date, image, year, slug }) => {
  return (
    <div className="max-w-full max-h-full ">
      <div className="flex flex-col sm:flex-row bg-white rounded-xl  overflow-hidden h-full sm:h-[400px] ">
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
              <Link to={`/our-festival/previous/${slug}`}>
                <ButtonCard variant="primary" >
                   Explorer
                </ButtonCard>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalCardCarousel;
