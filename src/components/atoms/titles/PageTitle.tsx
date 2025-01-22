import React from 'react'

export default function PageTitle({ title, width, color, fontSize, spacing }: { title: string, width?: string, color?:string, fontSize?:string, spacing?:string }) {
    return (
        <section className={`${spacing ? spacing : "my-8"} flex justify-center text-center max-w-7xl mx-auto w-full`}>
                <div className='flex flex-col items-start'>
                    <h1 className={`${color ? color : "text-primary" } w-min sm:w-auto title font-bold ${fontSize ? fontSize : "text-5xl sm:text-[64px]" }`}>{title}</h1>
                </div>
        </section>
    )
}
