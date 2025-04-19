import Line from '@/components/atoms/Line'
import { Link } from 'gatsby'
import React from 'react'

export default function TitleSectionEvent({ headerName, showButton = true, eventTypeSlug }: { headerName: string, showButton: boolean, eventTypeSlug: string }) {
    return (
        <div className='flex  flex-col justify-start items-start w-full '>

            <div className="rounded-sm font-bold transform py-2 w-full flex flex-wrap items-center justify-between gap-2">
                <div className="text-[#183354] text-xl font-bold leading-relaxed text-start ">
                    {headerName}
                </div>
                {showButton && (
                    <Link to={`/event/${eventTypeSlug}`}>
                        <div className="rounded-md flex gap-4 items-center border border-[#CFCFCF] px-[7px]  py-[6px]  cursor-pointer flex-shrink-0">
                            <span className="text-[#183354] font-medium text-[13px]">VOIR TOUT</span>
                            <div className="relative w-[10px] h-[10px]">
                                <img src="/carousel_images/blueArrow.svg" alt="Previous" className="w-full h-full" />
                                <img src="/carousel_images/blueArrow.svg" alt="Previous" className="absolute top-full right-full w-[10px] h-[10px] opacity-35" />
                            </div>
                        </div>
                    </Link>
                )}
            </div>



            <div className="flex items-center  w-full gap-1">
                <div
                    className="bg-[#0270A0] w-10 h-[5px]"
                    style={{
                        clipPath: "polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)"
                    }}
                ></div>
                <div className="flex flex-col w-full ">
                    <div className="flex flex-col   gap-[3px] w-full justify-end items-end">
                        <div className="h-[0.5px] bg-gray-500" style={{ width: "calc(100% - 3px)" }}></div>
                        <div className="h-[0.5px] bg-gray-500 w-full"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}
