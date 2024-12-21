import React, { ReactNode } from "react";

interface CardProps {
    title: ReactNode;
    right?: ReactNode;
    children: ReactNode;
    customClassNames?: string;
    contentClassNames?: string;
}

const Card: React.FC<CardProps> = ({ title, children, right, customClassNames, contentClassNames }) => {
    return (
        <div className={`flex flex-col w-full bg-white rounded-xl px-3 py-4 shadow-lg grow ${customClassNames}`}>
            {title ? (
                <div className="flex flex-wrap justify-between items-center rounded-xl bg-blue-500 py-8 px-4 translate-y-[-32px]">
                    <div className="text-white font-bold text-lg capitalize">{title}</div> <div className="ml-auto">{right}</div>{" "}
                </div>
            ) : (
                ""
            )}
            <div className={`py-2 flex flex-col grow ${contentClassNames}`}>{children}</div>
        </div>
    );
};

export default Card;