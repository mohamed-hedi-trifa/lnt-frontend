import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    customClassnames?: string;
    bg?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    customClassnames = "",
    bg,
    ...rest
}) => {
    return (
        <button
            className={`${bg ? bg : "bg-primary hover:bg-primaryHover"} text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${customClassnames}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
