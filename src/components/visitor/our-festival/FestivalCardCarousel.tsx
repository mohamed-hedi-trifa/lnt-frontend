import React from "react";
interface CardProps {
  
  titre: string;
  description: string;
  lieu: string;
  date: string;

  }

    const  FestivalCardCarousel: React.FC<CardProps> = ({  titre,description,lieu,date }) => {
    return(
        <section >
            <div className=" mx-auto  bg-white rounded-xl shadow-xl relative p-4  ">
                    <div className={`flex flex-col sm:flex-row `}>
                        <div className="w-full bg-cover bg-center" style={{backgroundImage:'festivales_images/img.jpg'}} >
                            <img src='/festivales_images/img.jpg' alt="Festival Image" className="rounded-lg shadow-lg w-full h-full "/>
                        </div>
                        <div className="w-full px-4 relative  ">
                            <h3 className="text-[16px] md:text-[24px] font-bold mt-4 ">{titre}</h3>
                            <p className="mt-4 text-[14px] sm:text-[16px] text-gray-700 text-justify">
                                {description}
                            </p>
          
                            <hr className='mt-4'/>
                            <div className="mt-4 text-[14px] sm:text-[16px]">
                                <span className=" font-bold text-[#0270A0] ">Lieu:</span> {lieu}
                            </div>
                            <div className="mt-4 text-[14px] sm:text-[16px]">
                                <span className=" font-bold text-[#0270A0]">Date:</span> {date}
                            </div>
                            <div className=" grid  ">
                                
                                <div className=""></div>

                                <div className="flex items-center justify-center sm:items-end sm:justify-end">
                                    <button className=" px-8 py-3 my-4 bg-gradient-to-r from-[#51ADC6] to-[#006E9F] text-white font-bold rounded-full hover:shadow-lg transition duration-300 ">
                                            {`Explorer`}
                                    </button>
                                </div>
                                <div className=""></div>
                            </div>
                            
                        </div>
                       
                    </div>
                        
                    
            </div>
        </section>
    );
}

export default FestivalCardCarousel;

