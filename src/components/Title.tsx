import React, { ReactNode } from 'react';

interface TitleProps {
    children: ReactNode;
    size?: string;
    customClassName?: string;
}

export default function Title({ children, size = "text-xl", customClassName = "" }: TitleProps) {
    return (
        <div className={`font-bold ${size} ${customClassName}`}>
            {children}
        </div>
    );
}
