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
            { variant == "pill" ?<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.544 0.610327C7.92405 0.390906 8.35516 0.275391 8.794 0.275391C9.23284 0.275391 9.66395 0.390906 10.044 0.610327L16.338 4.24333C16.718 4.46274 17.0336 4.77833 17.253 5.15836C17.4725 5.5384 17.588 5.9695 17.588 6.40833V13.6763C17.588 14.1152 17.4725 14.5463 17.253 14.9263C17.0336 15.3063 16.718 15.6219 16.338 15.8413L10.044 19.4753C9.66395 19.6947 9.23284 19.8103 8.794 19.8103C8.35516 19.8103 7.92405 19.6947 7.544 19.4753L1.25 15.8413C0.869961 15.6219 0.554373 15.3063 0.334953 14.9263C0.115532 14.5463 1.13235e-05 14.1152 1.75416e-07 13.6763V6.40933C-0.000164255 5.97033 0.115273 5.53902 0.334702 5.1588C0.554132 4.77857 0.869814 4.46283 1.25 4.24333L7.544 0.610327Z" fill="#0270A0"/>
</svg>
 : ""}
            {children}
        </div>
    );
}
