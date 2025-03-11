import React from 'react'

function formatDate(date: Date) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('en', options);
}


export default function AchievementCard({ achievement }: { achievement: any }) {
  return (
    <div className='bg-white shadow-[0px_4px_4px_0px_#00000040] p-4 flex flex-col gap-4 rounded-xl'>
      <img src={`${process.env.GATSBY_API_URL}${achievement.image}`} alt="" />
      <div className='flex gap-4'>
        {achievement.themes.map((theme:any)=><div className='bg-[#4B6BFB0D] text-[#006E9F] font-medium py-1 px-3 rounded-md w-fit'>
{theme.name_en || theme.name_fr }
            </div>)}
      </div>
      <div className='text-xl font-semibold'>{achievement.title_en || achievement.title_fr}</div>
      <div className='text-[#97989F]'>{formatDate(achievement.date)}</div>
    </div>
  )
}
