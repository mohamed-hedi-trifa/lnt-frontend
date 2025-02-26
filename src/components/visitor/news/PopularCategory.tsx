import React from 'react'
import HeaderSection from './HeaderSection'
import recentArticle1 from '../../../assets/images/recentArticle2.jpg'

export default function PopularCategory() {
    return (
        <div className=''>
            <HeaderSection headerName="Catégories Populaires" />
            <div className="flex w-full flex-col mt-8 gap-2">
                <div className="relative flex w-full h-[70px]">

                    <div className="z-20 flex items-center justify-between w-full gap-2 px-5 py-0.5 rounded-md">

                        <div className="text-white font-medium bg-white/20 px-1.5 py-0.5 rounded-lg text-xs">
                            SUIVI SCIENTIFIQUE
                        </div>


                        <div className="relative w-4 h-4">
                            <img src="/carousel_images/vector.svg" alt="Previous" className="w-full h-full" />
                            <img src="/carousel_images/vector.svg" alt="Previous" className="absolute top-full right-full w-3 h-3 opacity-35" />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black  rounded-md opacity-40 z-10"></div>


                    <img
                        src={recentArticle1}
                        alt=""
                        className="absolute inset-0 object-cover rounded-md w-full h-full z-1"
                    />

                </div>

                <div className="relative flex w-full h-[70px]">

                    <div className="z-20 flex items-center justify-between w-full gap-2 px-5 py-0.5 rounded-md">

                        <div className="text-white font-medium bg-white/20 px-1.5 py-0.5 rounded-lg text-xs">
                            SUIVI SCIENTIFIQUE
                        </div>


                        <div className="relative w-4 h-4">
                            <img src="/carousel_images/vector.svg" alt="Previous" className="w-full h-full" />
                            <img src="/carousel_images/vector.svg" alt="Previous" className="absolute top-full right-full w-3 h-3 opacity-35" />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black rounded-md  opacity-40 z-10"></div>


                    <img
                        src={recentArticle1}
                        alt=""
                        className="absolute inset-0 object-cover rounded-md w-full h-full z-1"
                    />

                </div>

                <div className="relative flex w-full h-[70px]">

                    <div className="z-20 flex items-center justify-between w-full gap-2 px-5 py-0.5 rounded-md">

                        <div className="text-white font-medium bg-white/20 px-1.5 py-0.5 rounded-lg text-xs">
                            SUIVI SCIENTIFIQUE
                        </div>


                        <div className="relative w-4 h-4">
                            <img src="/carousel_images/vector.svg" alt="Previous" className="w-full h-full" />
                            <img src="/carousel_images/vector.svg" alt="Previous" className="absolute top-full right-full w-3 h-3 opacity-35" />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black rounded-md  opacity-40 z-10"></div>


                    <img
                        src={recentArticle1}
                        alt=""
                        className="absolute inset-0 object-cover rounded-md w-full h-full z-1"
                    />

                </div>

                <div className="relative flex w-full h-[70px]">

                    <div className="z-20 flex items-center justify-between w-full gap-2 px-5 py-0.5 rounded-md">

                        <div className="text-white font-medium bg-white/20 px-1.5 py-0.5 rounded-lg text-xs">
                            SUIVI SCIENTIFIQUE
                        </div>


                        <div className="relative w-4 h-4">
                            <img src="/carousel_images/vector.svg" alt="Previous" className="w-full h-full" />
                            <img src="/carousel_images/vector.svg" alt="Previous" className="absolute top-full right-full w-3 h-3 opacity-35" />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black rounded-md  opacity-40 z-10"></div>


                    <img
                        src={recentArticle1}
                        alt=""
                        className="absolute inset-0 object-cover rounded-md w-full h-full z-1"
                    />

                </div>


            </div>
        </div>
    )
}
