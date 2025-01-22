import React from 'react'

function formatDate(date:Date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' } as any;
    return new Date(date).toLocaleDateString('en', options);
  }
  

export default function PostCard({achievement}:{achievement:any}) {
  return (
    <div className='bg-white shadow-[0px_4px_4px_0px_#00000040] p-4 flex flex-col gap-4 rounded-xl'>
        <img src={achievement.img} alt="" />
        <div className='flex gap-4'>
            {achievement.categories.map((category:any)=><div className='bg-[#4B6BFB0D] text-[#006E9F] font-medium py-1 px-3 rounded-md w-fit'>
{category}
            </div>)}
        </div>
        <div className='text-xl font-semibold'>{achievement.title}</div>
        <div className='text-[#97989F]'>{formatDate(achievement.date)}</div>
    </div>
  )
}
