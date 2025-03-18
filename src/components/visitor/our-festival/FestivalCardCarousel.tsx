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

const FestivalCardCarousel: React.FC<CardProps> = ({
  titre,
  description,
  lieu,
  date,
  image,
  year,
  slug,
}) => {
  return (
    <div className="max-w-full h-[600px] sm:h-[350px]">
      <div className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden h-full">
        <div className="shrink-0 sm:w-1/2 w-full h-64 sm:h-full relative">
          <img
            src={`${process.env.GATSBY_API_URL}${image}`}
            alt={titre}
            className="w-full h-full object-cover"
          />
          <span className="absolute text-[#0270A0] top-2 left-2 bg-white px-2 py-1 text-xl rounded-md font-semibold">
            Édition {year}
          </span>
        </div>
        <div className="sm:w-1/2 w-full p-4 flex flex-col justify-between flex-1">
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-bold mb-2">{titre}</h3>
            <PageParagraph2>
              <h3 className="flex items-center font-normal text-gray-700 text-[14px] mt-5 min-h-[55px]">
                {/* Version mobile */}
                <span className="block sm:hidden">
                  {description
                    ? description.length > 120
                      ? description.slice(0, description.lastIndexOf(" ", 120)) + "..."
                      : description
                    : ""}
                </span>
                {/* Version desktop */}
                <span className="hidden sm:block">
                  {description || ""}
                </span>
              </h3>
            </PageParagraph2>
          </div>
          {/* Section en bas toujours positionnée */}
          <div className="w-full text-start">
            <div className="flex justify-center">
              <hr className="mt-2 w-full border-t border-gray-600" />
            </div>
            <div className="text-[14px] mt-3 font-normal">
              <span className="text-[#0270A0] font-bold text-[16px] ">Lieu :</span> {lieu}
            </div>
            <div className="text-[14px] mt-1 font-normal pb-4 sm:pb-0">
              <span className="text-[#0270A0] font-bold text-[16px]">Date :</span> {date}
            </div>
            <div className="flex sm:justify-end justify-center">
              <Link to={`/our-festival/previous/${slug}`}>
                <ButtonCard variant="primary">Explorer</ButtonCard>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalCardCarousel;
