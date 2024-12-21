import React, { ButtonHTMLAttributes, ReactNode } from "react";

const VARIANTS:any = {
    primary:"text-lg w-fit  px-[26px] py-[10px] text-white font-semibold rounded-full bg-[linear-gradient(to_right,#50ACC6,#3344DC,#50ACC6)] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right shadow-[-1px_2px_5px_rgb(0,0,0,.3)]",
    secondary:"text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
}


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    customClassnames?: string;
    bg?: string;
    variant?:string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    customClassnames = "",
    bg,
    variant,
    ...rest
}) => {
    return (
        <button
            className={`${bg ? bg : ""} ${variant ? VARIANTS[variant] : "bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"} ${customClassnames}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
