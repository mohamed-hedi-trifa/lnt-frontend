import React from 'react'

export default function PageTitle({ title, width }: { title: string, width?: string }) {
    return (
        <section className='my-8'>
            <div className='flex justify-center'>
                <div className='flex flex-col items-start'>
                    <h1 className='text-primary font-bold text-[64px]'>{title}</h1>
                    <div className="flex gap-2 mt-[-8px]">
                        <div className="h-[9px] w-[30px] bg-primary"></div>
                        <div className={`h-[9px] ${width ? width : "w-20"} bg-primary`}></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
