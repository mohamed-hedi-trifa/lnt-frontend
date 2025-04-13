import React from 'react';
import formatDate from '@/lib/formatDate';
import INews from '@/models/INews';

interface NewsCardProps {
  news: INews;
}

export default function NewsCard({ news }: NewsCardProps) {
  const themesArray = Array.isArray(news.themes) ? news.themes : [];
  return (
    <div className=" bg-white shadow-helmi p-4 flex flex-col gap-4 rounded-2xl w-[350px] min-h-[420px] h-full">
      <img
        src={`${process.env.GATSBY_API_URL}${news.image}`}
        alt="news"
        className="h-[240px] w-full object-cover rounded-md shadow-lg"
      />
      <div className="flex flex-col grow mx-3 pb-14 md:pb-4">
      <div className="flex gap-4 flex-wrap">
      {themesArray.map(theme => {
          const themeName = theme.name_fr || theme.name_en || 'N/A';
          return (
            <div
              key={theme.id}
              className="bg-[#4B6BFB0D] text-[#006E9F] text-sm font-medium py-1 px-3 rounded-md"
            >
              {themeName}
            </div>
          );
        })}
      </div>
        <h4 className="mt-2 mb-4 font-bold">{news.title_fr || news.title_en || 'No Title'}</h4>
        <h4 className="mt-auto font-medium text-sm text-slate-500">
          {formatDate(news.date)}
        </h4>
      </div>
    </div>
  );
}
