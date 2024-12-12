import React from 'react'

export default function PageTitle({ title, width, color }: { title: string, width?: string, color?:string }) {
    return (
        <section className='my-8 flex justify-center text-center'>
                <div className='flex flex-col items-start'>
                    <h1 className={`${color ? color : "text-primary" } w-min sm:w-auto title font-bold text-5xl sm:text-[64px]`}>{title}</h1>
                    <div className="flex gap-2">
                        <div className="h-[9px] w-[30px] bg-primary"></div>
                        <div className={`h-[9px] ${width ? width : "w-20"} bg-primary`}></div>
                    </div>
                </div>
        </section>
    )
}
