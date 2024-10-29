import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

type News = {
  image?: string;
  title?: string;
  category?: string;
  date?: Date;
};

type Props = {
  news: News;
};

export default function NewsCard({ news }: Props) {
  return (
    <div className="max-w-[400px] mx-auto flex flex-col shadow-[1px_2px_6px_rgb(0,0,0,.2)] rounded-lg overflow-hidden">
      <div className="aspect-[10/7] m-2 rounded-lg overflow-hidden shadow-md">
        <img src={news.image || ""} alt="" className="w-full h-full object-fill" />
      </div>
      <div className="flex flex-col grow mx-3 pb-14 md:pb-4">
        <p className="mt-3 w-fit px-2 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-medium ">{news.category}</p>
        <h4 className="mt-2 mb-4 text-sm font-bold">{news.title}</h4>
        <h4 className="mt-auto font-medium text-xs text-slate-500">
          Le {new Date(news.date || "").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </h4>
      </div>
    </div>
  );
}
