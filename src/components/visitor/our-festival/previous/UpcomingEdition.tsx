import React from 'react'
import edition8 from '../../../../assets/images/edition9.jpg'
export default function UpcomingEdition() {
    return (
        <div>
            <div className="relative text-center w-full flex justify-center cursor-pointer">
                <div className="relative w-[80%] ">
                    <img
                        src={edition8}
                        alt=""
                        className="h-[250px] w-full rounded-xl shadow-helmi  "
                    />
                    <div className="absolute top-0 right-0 w-full h-full bg-black/50" ></div>
                    <div className="absolute inset-y-0 left-5 max-w-[432px] text-start  flex flex-col justify-center text-white rounded-xl p-3 items-start gap-4">
                        <h1 className="text-2xl font-bold shadow-lg">Découvrez le Prochain Festival</h1>
                        <h2 className="text-lg font-bold shadow-lg">Restez informé des dates et du programme à venir</h2>
                    </div>
                </div>
            </div>



        </div>
    )
}
