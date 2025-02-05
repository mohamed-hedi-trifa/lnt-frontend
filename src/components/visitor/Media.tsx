import React, { useState } from 'react'
import Title from '../atoms/titles/Title'
import ImageGallery from './ImageGallery'

export default function Media() {
    const [media, setMedia] = useState<"photos" | "videos">("photos");
  return (
    <div className='flex flex-col gap-[60px]'>
        <div className="flex items-center flex-col gap-[30px]">
   
        <div className="flex text-[24px] font-bold">
          <div className={`rounded-l-[12px] py-4 px-10 leading-[20px] cursor-pointer transition-all  gradient-transition ${media == "photos" ? "gradient-active text-white" : " "}`} onClick={() => setMedia("photos")}>Photos</div>
          <div className={`rounded-r-[12px] bg-[#EBEBEB] py-4 px-10 leading-[20px] transition-all  cursor-pointer gradient-transition ${media == "videos" ? "gradient-active text-white" : ""}`} onClick={() => setMedia("videos")}>Vidéos</div>
        </div>
      </div>
    
      {media == "photos" ? <div className="">
        <ImageGallery />
      </div> :
        <div>
          video
        </div>}
    </div>
  )
}
