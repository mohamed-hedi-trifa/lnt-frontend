import React, { ReactNode } from 'react';

interface TitleProps {
    children: ReactNode;
    size?: string;
    weight?: string;
    variant?:string;
    spacing?:string;
    customClassName?: string;
}

export default function Title({ children, size = "text-xl", weight = "font-bold", spacing= "", variant, customClassName = "" }: TitleProps) {
    return (
        <div className={`flex items-start sm:items-center gap-2 ${spacing} ${weight} ${size} ${customClassName}`}>
            { variant == "pill" ?<div className='shrink-0 w-[14px] sm:w-[9px] h-[14px] sm:h-[19px] rounded-full bg-black sm:bg-primary mt-[12px] sm:mt-0'></div> : ""}
            {children}
        </div>
    );
}
