
// import React from "react";
// import LangLink from "../../LangLink";
// interface CardProps {
  
//   titre: string;
//   description: string;
//   lieu: string;
//   date: string;
//   properties : string ; 
//   buttonsTitles : string ; 
//   buttonPosition : string;
//   imageUrl : string;
//   lien : string;

//   }

//     const  CardFestival: React.FC<CardProps> = ({  titre,description,lieu,date,properties,buttonsTitles,imageUrl,lien }) => {
//     return(
//             <div className="bg-white rounded-xl shadow-[0_-5px_10px_rgba(0,0,0,0.1),0_5px_10px_rgba(0,0,0,0.1)] relative h-full w-full">
//                 <div className={`${properties} `}>
//                         <div className="w-full bg-cover bg-center p-4" style={{backgroundImage:'festivales_images/img.jpg'}} >
//                         {imageUrl && <img src={`${process.env.GATSBY_API_URL}${imageUrl}`} alt="festival card" className='w-full h-36 object-cover rounded-md' />}
//                         </div>
//                         <div className="w-full px-4 ">
//                             <h3 className="text-2xl font-semibold mt-4 ">{titre}</h3>
//                             <p className="mt-4 text-gray-700 text-justify">
//                                 {description}
//                             </p>
//                             <hr className='mt-4 border-[#C4C4C4]'/>
//                             <div className="mt-4">
//                                 <span className="text-lg font-bold text-[#0270A0]">Lieu:</span> {lieu}
//                             </div>
//                             <div className="mt-4">
//                                 <span className="text-lg font-bold text-[#0270A0]">Date:</span> {date}
//                             </div>
                          
                           
//                                 <div className="flex">
//                                 <LangLink to={`${lien}`} 
//                                     children=
//                                     {
//                                         <button className=" px-8 py-3 my-4 bg-gradient-to-r from-[#51ADC6] to-[#006E9F] text-white font-bold rounded-full hover:shadow-lg transition duration-300 ">
//                                                 {`${buttonsTitles}`}
//                                         </button>
//                                     }
//                                 />
                               
//                             </div>
//                         </div>
//                     </div>
               
                    
//             </div>
//     );
// }

// export default CardFestival;


import { Link } from 'gatsby';
import React from 'react';

function formatDate(date: Date) {
    if(!date) return ""
  const options: Intl.DateTimeFormatOptions = { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
  };
  return new Date(date).toLocaleDateString("en", options);
}

export default function FestivalCard({ post }:{post:any}) {
    const lang = typeof window !== 'undefined' && location?.pathname.startsWith("/fr/") ? "fr" : "en";
    
    return (
        <Link to={`/our-festival/upcoming/${post.slug}?lang=${lang}`} key={post.id} className='bg-white shadow-[0px_4px_4px_0px_#00000040] flex flex-col rounded-xl hover:shadow-lg transition duration-300 h-full'>
            {post?.image && <img src={`${process.env.GATSBY_API_URL}${post.image}`} alt={post.title_en || post.title_fr} className='w-full h-[321px] object-cover rounded-t-md' />}
            <div className='p-4 flex flex-col gap-4'>
            <div className='text-lg font-medium'>{post[`title_${lang}`]}</div>
            <div className='text-sm text-[#666666]'>{post[`summary_${lang}`]}</div>
            <hr />
            <div className='flex flex-col gap-[10px]'>
                <div className='text-[#0270A0] font-semibold leading-[26px]'>Lieu:</div><div>{post[`location_${lang}`]}</div>
                <div className='text-[#0270A0] font-semibold leading-[26px]'>Date:</div><div>{formatDate(post?.date)}</div>
            </div>
            </div>
            
        </Link>
    );
}

