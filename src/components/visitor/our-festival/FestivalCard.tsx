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
