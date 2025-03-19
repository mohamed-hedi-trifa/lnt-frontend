import PageParagraph from "@/components/atoms/PageParagraph";
import { Link } from "gatsby";
import React from "react";
import PageParagraph2 from "@/components/atoms/PageParagraph2";
import LangLink from "@/components/LangLink";
import Button from "../../../atoms/Button";
import ButtonCard from "@/components/atoms/ButtonCard";

interface CardProps {
    titre: string;
    description: string;
    lieu: string;
    date: string;
    slug: string;
    year: string;
    image: string; 
}

const PreviousEditionCard: React.FC<CardProps> = ({ titre, description, lieu, date, slug, year, image }) => {
    
    return (
        <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row gap-4 shadow-helmi mt-3 min-h-[200px] w-full transition-all duration-300 ">
            <div className="shrink-0 relative sm:w-fit w-full">
                <img 
                    src={`${process.env.GATSBY_API_URL}${image}`} 
                    alt="Festival Image" 
                    className="rounded-lg shadow-lg sm:w-[224px] w-full sm:max-h-[240px] h-full" 
                />
                <span className="absolute text-[#0270A0] top-2 left-2 bg-white px-2 py-1 text-sm rounded-md font-semibold shadow-helmi">
                    Édition {year}
                </span>
            </div>
            <div className="w-full relative flex flex-col gap-[7px] py-3 justify-start items-start">
                <h2 className="text-[16px] md:text-[20px] font-bold text-start">{titre}</h2>
                <PageParagraph2 fontWeight="font-light" spacing="leading-[1.4]">
                     <p className="text-[14px] sm:text-[16px] text-gray-900 text-justify grow">
                          {description
                         ? description.length > 120
                           ? description.slice(0, description.lastIndexOf(" ", 120)) + "..."
                           : description
                         : ""}
                     </p>
                </PageParagraph2>
                <div className="bg-[#CBD5E1] h-[1px] w-[90%]" />
                <div className="flex justify-between flex-col sm:flex-row w-full sm:items-center gap-3 sm:gap-0">
                    <div className="flex flex-col gap-2.5 sm:items-start items-start justify-start">
                        <div className="text-[16px] sm:text-[14px] text-start">
                            <span className="font-bold text-[#0270A0]">Lieu:</span> {lieu}
                        </div>
                        <div className="text-[16px] sm:text-[14px] text-start">
                            <span className="font-bold text-[#0270A0]">Date:</span> {date}
                        </div>
                    </div>
                    <div className="sm:w-fit w-full sm:pt-2 ">
                        {/* <Link to={`/our-festival/previous/${slug}`}>
                            <button className="h-fit sm:px-12 px-[28px] sm:py-2 pt-[4px] w-fit rounded-full bg-gradient-to-r from-[#51ADC6] to-[#006E9F] text-[16px] text-white font-bold shadow-lg transition duration-300">
                                Explorer
                            </button>
                        </Link> */}
                        <Link to={`/our-festival/previous/${slug}`}>
                            <ButtonCard variant="primary" >
                               Explorer
                            </ButtonCard>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviousEditionCard;
