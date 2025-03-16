import { Link } from 'gatsby';
import React from 'react';

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
  };
  return new Date(date).toLocaleDateString("en", options);
}

export default function TrainingCard({ training }:{training:any}) {
    const lang = typeof window !== 'undefined' && location?.pathname.startsWith("/fr/") ? "fr" : "en";
    console.log(training);
    return (
        <Link to={`/protected-air-marine-coastal-areas/training/${training.slug}?lang=${lang}`} key={training.id} className='bg-white shadow-[0px_4px_4px_0px_#00000040] p-4 flex flex-col gap-4 rounded-xl hover:shadow-lg transition duration-300'>
            {training?.image && <img src={`${process.env.GATSBY_API_URL}${training.image}`} alt={training.title_en || training.title_fr} className='w-full h-36 object-cover rounded-md' />}
            
            <div className='flex gap-4'>
                {training?.themes?.map((theme:string, index:number) => (
                    <div key={index} className='bg-[#4B6BFB0D] text-[#006E9F] font-medium py-1 px-3 rounded-md w-fit'>
                        {theme.name_en || theme.name_fr}
                    </div>
                ))}
            </div>
            
            <div className='text-xl font-semibold'>{training[`title_${lang}`]}</div>
            <div className='text-[#97989F]'>{training.created_at ? formatDate(training.created_at) : ''}</div>
            
        </Link>
    );
}
