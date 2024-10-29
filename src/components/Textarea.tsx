import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    divClassNames?: string;
    customClassnames?: string;
    error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
    label,
    placeholder = "",
    name = "",
    value,
    onChange,
    divClassNames = "",
    customClassnames = "",
    error,
    ...rest
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={`${divClassNames} flex flex-col gap-2`}>
            {label && (
                <label className="block text-slate-500 text-sm font-medium mb-2">
                    {label}
                </label>
            )}
            <textarea
                className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring ring-blue-400 ${customClassnames}`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                {...rest}
            />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
};

export default Textarea;
