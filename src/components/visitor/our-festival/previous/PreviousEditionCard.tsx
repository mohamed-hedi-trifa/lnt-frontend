import { Link } from "gatsby";
import React from "react";
interface CardProps {

    titre: string;
    description: string;
    lieu: string;
    date: string;
    slug: string;
    year: string;
}

const PreviousEditionCard: React.FC<CardProps> = ({ titre, description, lieu, date, slug, year }) => {
    return (

        <div className="  bg-white rounded-xl py-3 px-4   relative  flex w-full shadow-helmi gap-3 mt-3 flex-col sm:flex-row   min-h-[200px]">

            <div className=" shrink-0 relative  sm:w-fit w-full" >
                <img src='/festivales_images/img.jpg' alt="Festival Image" className="rounded-lg shadow-lg sm:w-[224px] w-full sm:h-full h-[180px] " />
                <span className="absolute text-[#0270A0] top-2 left-2 bg-white px-2 py-1 text-sm rounded-md font-semibold">Édition {year}</span>
            </div>
            <div className="w-full  relative  flex flex-col gap-[7px] py-3 justify-start items-start">
                <h3 className="text-[16px] md:text-[13px] font-bold  text-start">{titre}</h3>
                <p className=" text-[14px] sm:text-[10px] text-gray-700 text-justify grow">
                    {description}
                </p>

                <div className='bg-[#CBD5E1] h-[1px] w-[90%]' />
                <div className="flex justify-between flex-col sm:flex-row  w-full sm:items-center gap-3 sm:gap-0">
                    <div className="flex flex-col gap-2.5 sm:items-start  items-start justify-start">
                        <div className=" text-[12px] sm:text-[12px] text-start">
                            <span className=" font-bold text-[#0270A0] ">Lieu:</span> {lieu}
                        </div>
                        <div className=" text-[12px] sm:text-[12px] text-start">
                            <span className=" font-bold text-[#0270A0]  ">Date:</span> {date}
                        </div>
                    </div>
                    <div className="sm:w-fit
                     w-full ">
                        <Link to={`/our-festival/previous/${slug}`}>
                            <button className=" h-fit sm:px-[18px] px-[28px] sm:py-[7px] py-[4px] w-fit rounded-full bg-gradient-to-r from-[#51ADC6] to-[#006E9F] text-[12px] text-white font-bold  hover:shadow-lg transition duration-300 ">
                                {`Explorer`}
                            </button>
                        </Link>
                    </div>

                </div>



            </div>




        </div>

    );
}

export default PreviousEditionCard;