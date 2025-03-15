import React from 'react'
import Title from '@/components/atoms/titles/Title'

export default function CardRelatedAchievements({
  imgSrc,
  title,
  date,
}: {
  imgSrc: string;
  title: string;
  date: string;
}) {
  return (
    <article className="flex flex-col gap-[15px] py-[25px] w-full">
      <div className="w-full lg:w-[330px] lg:h-[226px] overflow-hidden">
        <img
          src={imgSrc}
          className="rounded-xl shadow-[0px_4px_4px_0px_#00000040] object-cover"
        />
      </div>
      <Title size="text-[20px] font-semibold leading-[32px] capitalize" customClassName="">
        {title}
      </Title>
      <div className="text-sm text-gray-500">{date}</div>
    </article>
  )
}
