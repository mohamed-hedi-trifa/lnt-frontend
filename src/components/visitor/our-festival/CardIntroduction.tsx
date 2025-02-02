import React from "react";
interface CardProps {
  
  titre: string;
  description: string;
  lieu: string;
  date: string;

  }

    const  CardIntroduction: React.FC<CardProps> = ({  titre,description,lieu,date}) => {
    return(
        <section >
            <div className=" mx-auto mt-12 rounded-xl relative ">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full h-[554px]  relative">
                        <div className="w-[90%] h-[90%] absolute bottom-0 right-0 z-1 bg-[#0270A0] rounded-[12px]">
                        </div>
                            <img src='/festivales_images/img.jpg' alt="Festival Image" className="rounded-lg shadow-lg w-[90%] h-[90%] absolute left-0 top-0 z-2"/>

                        </div>
                        <div className="w-full px-4 ">
                            <h3 className="text-[25px] text-center sm:text-left sm:text-[35px] font-bold mt-4 sm:mt-2">{titre}</h3>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-justify">
                                {description}
                            </p>
                       
                            <div className="mt-4 text-[18px:] sm:text-[20px] ">
                                <span className="font-bold text-[#0270A0]">Date:</span> {date}
                            </div>
                            <div className='my-10'>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
    );
}

export default CardIntroduction;

