import React from 'react';


export default function NewsCard({ article }: { article: any }) {

    return (
        <>




            <div className='sm:hidden '>
                <div className="self-stretch p-4 bg-white rounded-xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-1 outline-offset-[-1px] outline-[#e8e8ea] inline-flex flex-col justify-center items-center gap-4 overflow-hidden">
                    <img className="w-[360px] h-60 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                        src={`${process.env.GATSBY_API_URL}${article?.image}`}
                        alt={article.title_en || article.title_fr} />
                    <div className="self-stretch p-2 flex flex-col justify-start items-start gap-5">
                        <div className="self-stretch flex flex-col justify-start items-start gap-4">
                            <div className="fles gap-4">

                                {article.themes?.map((item: any) =>
                                    <div data-color="Primary" data-icon="None" data-size="md" data-style="Light" className="px-2.5 py-1 bg-[#4b6bfb]/5 rounded-md inline-flex justify-center items-center gap-4">
                                        <div className="justify-start text-[#006e9f] text-sm font-medium font-['Montserrat'] leading-tight">
                                            {item?.name_en || item?.name_fr}
                                        </div>

                                    </div>
                                )}
                            </div>
                            <div className="self-stretch justify-start text-[#181a2a] text-xl font-semibold font-['Montserrat'] leading-7 text-start">
                                {article.title_en || article.title_fr}
                            </div>
                        </div>
                        <div className="inline-flex justify-start items-center gap-5">
                            <div className="justify-start text-[#97989f] text-base font-normal font-['Work_Sans'] leading-normal">Le {new Date(article.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Larger Screens */}
            <div className="hidden sm:inline-flex w-[392px] shadow-helmi p-4 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-[#e8e8ea]  flex-col justify-center items-center gap-4 overflow-hidden">
                <img className="w-[360px] h-60 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                    src={`${process.env.GATSBY_API_URL}${article?.image}`}
                    alt={article.title_en || article.title_fr} />
                <div className="self-stretch p-2 flex flex-col justify-start items-start gap-5">
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                        <div className="flex gap-2">
                            {article.themes?.map((item: any) =>

                                <div data-color="Primary" data-icon="None" data-size="md" data-style="Light" className="px-2.5 py-1 bg-[#4b6bfb]/5 rounded-md inline-flex justify-center items-center gap-1">
                                    <div className="justify-start text-[#006e9f] text-sm font-medium font-['Montserrat'] leading-tight">
                                        {item?.name_en || item?.name_fr}
                                    </div>
                                </div>
                            )}


                        </div>
                        <div className="self-stretch justify-start text-[#181a2a] text-xl font-semibold font-['Montserrat'] leading-7 text-start" >{article.title_en || article.title_fr}</div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-5">
                        <div className="justify-start text-[#97989f] text-base font-normal font-['Work_Sans'] leading-normal">Le {new Date(article.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}</div>
                    </div>
                </div>
            </div>
        </>
    );
}


