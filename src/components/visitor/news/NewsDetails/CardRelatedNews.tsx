import Title from '@/components/atoms/titles/Title'
import React from 'react'

export default function CardRelatedNews({imgSrc, title, date } : {imgSrc: any , title : string , date: string}) {
  return (
    <article className="flex flex-col gap-[15px] py-[25px] w-full">
      <div className="w-full lg:w-[300px] lg:h-[226px] overflow-hidden">
        <img src={imgSrc} className="rounded-xl shadow-[0px_4px_4px_0px_#00000040] object-cover" />
      </div>
      <Title
        size="text-[20px] font-semibold leading-[32px] capitalize"
        customClassName=""
      >
        {title}
      </Title>
      <div className="text-sm text-gray-500">{date}</div>
    </article>
  )
}
