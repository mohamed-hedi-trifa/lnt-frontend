import React from "react";
import LangLink from "../../LangLink";
interface CardProps {
  
  titre: string;
  description: string;
  lieu: string;
  date: string;
  properties : string ; 
  buttonsTitles : string ; 
  buttonPosition : string;
  imageUrl : string;
  lien : string;

  }

    const  CardFestival: React.FC<CardProps> = ({  titre,description,lieu,date,properties,buttonsTitles,imageUrl,lien }) => {
    return(
            <div className="bg-white rounded-xl shadow-[0_-5px_10px_rgba(0,0,0,0.1),0_5px_10px_rgba(0,0,0,0.1)] relative h-full w-full">
                <div className={`${properties} `}>
                        <div className="w-full bg-cover bg-center p-4" style={{backgroundImage:'festivales_images/img.jpg'}} >
                        {imageUrl && <img src={`${process.env.GATSBY_API_URL}${imageUrl}`} alt="festival card" className='w-full h-36 object-cover rounded-md' />}
                        </div>
                        <div className="w-full px-4 ">
                            <h3 className="text-2xl font-semibold mt-4 ">{titre}</h3>
                            <p className="mt-4 text-gray-700 text-justify">
                                {description}
                            </p>
                            <hr className='mt-4 border-[#C4C4C4]'/>
                            <div className="mt-4">
                                <span className="text-lg font-bold text-[#0270A0]">Lieu:</span> {lieu}
                            </div>
                            <div className="mt-4">
                                <span className="text-lg font-bold text-[#0270A0]">Date:</span> {date}
                            </div>
                          
                           
                                <div className="flex">
                                <LangLink to={`${lien}`} 
                                    children=
                                    {
                                        <button className=" px-8 py-3 my-4 bg-gradient-to-r from-[#51ADC6] to-[#006E9F] text-white font-bold rounded-full hover:shadow-lg transition duration-300 ">
                                                {`${buttonsTitles}`}
                                        </button>
                                    }
                                />
                               
                            </div>
                        </div>
                    </div>
               
                    
            </div>
    );
}

export default CardFestival;

