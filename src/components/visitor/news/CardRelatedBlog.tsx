import Title from '@/components/atoms/titles/Title'
import React from 'react'

export default function CardRelatedBlog({ imgSrc, title, date }: { imgSrc: any, title: string, date: string }) {
  return (
    <>
      <article className="flex flex-col gap-4 py-[25px] w-full ">
        <div className="w-full lg:w-[300px] lg:h-[200px] overflow-hidden">
          <img src={`${process.env.GATSBY_API_URL}${imgSrc}`}
            className="rounded-xl h-full w-full shadow-[0px_4px_4px_0px_#00000040] object-cover" />
        </div>
        <Title
          size="text-[20px] font-semibold leading-[32px] capitalize"
          customClassName=""
        >
          {title}
        </Title>
        <div className="text-sm text-gray-500">{date}</div>
      </article>

    </>
  )
}
