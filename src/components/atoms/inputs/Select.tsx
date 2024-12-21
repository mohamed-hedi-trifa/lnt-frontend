import React, { ChangeEvent, ReactNode } from "react";

interface SelectProps {
    label?: string;
    name?: string;
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    divClassNames?: string;
    labelClassNames?: string;
    selectClassNames?: string;
    error?: string;
    children: ReactNode;
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
    label,
    name = "",
    value,
    onChange,
    divClassNames = "",
    labelClassNames = "",
    selectClassNames = "",
    error,
    children,
    disabled = false,
    ...rest
}) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={`${divClassNames} flex flex-col gap-1`}>
            {label && (
                <label
                    htmlFor={name}
                    className={`block text-slate-500 font-medium mb-2 text-sm ${labelClassNames}`}
                >
                    {label}
                </label>
            )}
            <select
                id={name}
                className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${selectClassNames}`}
                name={name}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                {...rest}
            >
                {children}
            </select>
            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
};

export default Select;
