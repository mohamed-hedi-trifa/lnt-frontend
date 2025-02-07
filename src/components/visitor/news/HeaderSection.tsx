import React from 'react'

export default function HeaderSection({ headerName }: { headerName: string}) {
    return (
        <div className='flex items-center w-full '>

            <div className="rounded-sm bg-sky-700 text-white font-bold transform py-2 w-fit px-2 -skew-x-12 whitespace-nowrap">
            {headerName}
            </div>

            <div className="flex flex-col items-center gap-1 w-full">
                <div className="h-[0.5px] bg-gray-500 w-full"></div>
                <div className=" h-[0.5px] bg-gray-500 w-full"></div>
            </div>



        </div>
    )
}
