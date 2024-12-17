import React from 'react'

export default function SectionTitle({ title, width, color, fontSize, spacing }: { title: string, width?: string, color?:string, fontSize?:string, spacing?:string }) {
    return (
        <section className={`${spacing ? spacing : "my-8"} flex`}>
                <div className='flex flex-col items-start'>
                    <h1 className={`${color ? color : "text-black" } w-min sm:w-auto title font-bold ${fontSize ? fontSize : "text-2xl sm:text-[40px] leading-[48px]" }`}>{title}</h1>
                    <div className="flex gap-2">
                        <div className="h-[9px] w-[30px] bg-primary"></div>
                        <div className={`h-[9px] ${width ? width : "w-20"} bg-primary`}></div>
                    </div>
                </div>
        </section>
    )
}
