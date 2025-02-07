import React from "react";
interface CardProps {
  
  titre: string;
  description: string;
  lieu: string;
  date: string;

  }

    const  FestivalCardCarousel: React.FC<CardProps> = ({  titre,description,lieu,date }) => {
    return(
        
            <div className="mx-auto  bg-white rounded-xl shadow-xl relative h-[366px] flex">
                    
                        <div className="p-2.5 shrink-0" >
                            <img src='/festivales_images/img.jpg' alt="Festival Image" className="rounded-lg shadow-lg w-[474px] h-[346px] "/>
                        </div>
                        <div className="w-full px-4 relative  flex flex-col gap-[17px] py-3">
                            <h3 className="text-[16px] md:text-[24px] font-bold  ">{titre}</h3>
                            <p className=" text-[14px] sm:text-[16px] text-gray-700 text-justify grow">
                                {description}
                            </p>
          
                            <hr className=''/>
                            <div className="flex justify-between">
<div className="flex flex-col gap-2.5">
                            <div className=" text-[14px] sm:text-[16px]">
                                <span className=" font-bold text-[#0270A0] ">Lieu:</span> {lieu}
                            </div>
                            <div className=" text-[14px] sm:text-[16px]">
                                <span className=" font-bold text-[#0270A0]">Date:</span> {date}
                            </div>
</div>
<button className="px-8 py-3 my-4 bg-gradient-to-r from-[#51ADC6] to-[#006E9F] text-white font-bold rounded-full hover:shadow-lg transition duration-300 ">
                                {`Explorer`}
                            </button>
                            </div>
           
                          
                                
                        </div>
                       
                    
                        
                    
            </div>
        
    );
}

export default FestivalCardCarousel;

