import React from 'react'

export default function PageTitle({ title, color, fontSize="text-5xl sm:text-[64px]", spacing }: { title: string, color?:string, fontSize?:string, spacing?:string }) {
    return (
        <section className={`${spacing ? spacing : "my-8"} flex justify-center text-center max-w-7xl mx-auto w-full`}>
                <div className='flex flex-col items-start'>
                    <h1 className={`${color ? color : "text-primary" } sm:w-auto title font-bold leading-[58px] sm:leading-[64px] ${fontSize}`}>{title}</h1>
                </div>
        </section>
    )
}
