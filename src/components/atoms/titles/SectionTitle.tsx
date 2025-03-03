import React from 'react'

export default function SectionTitle({ title, width, color, fontSize, spacing, customClassName }: { customClassName?:string, title: string, width?: string, color?:string, fontSize?:string, spacing?:string }) {
    return (
        <section className={`${spacing ? spacing : "my-8"} flex`}>
                <div className='flex flex-col items-start'>
                    <h1 className={`${color ? color : "text-black" } text-center sm:text-start w-min sm:w-auto title font-bold ${fontSize ? fontSize : "text-[28px] sm:text-[40px] leading-[48px]" } ${customClassName}`}>{title}</h1>
                    <div className="flex gap-2 ml-1">
                        <div className="h-[9px] w-[30px] bg-gradient-to-r from-[#51ADC6] to-[#006E9F] rounded-lg"></div>
                        <div className={`h-[9px] ${width ? width : "w-20"} bg-gradient-to-r from-[#51ADC6] to-[#006E9F] rounded-lg`}></div>
                    </div>
                </div>
        </section>
    )
}
