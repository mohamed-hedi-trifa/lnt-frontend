import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    label?: string;
    divClassNames?: string;
    customClassName?: string;
    error?: string;
    accept?: string; // Add accept prop for file types
}

const Input: React.FC<InputProps> = ({
    type = "text",
    label,
    divClassNames = "",
    customClassName = "",
    error,
    accept, // Destructure accept prop
    ...rest
}) => {
    // Handle file input change to validate PDF files
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "file" && accept === "application/pdf") {
            const file = e.target.files?.[0];
            if (file && file.type !== "application/pdf") {
                alert("Please upload a PDF file."); // Show error message
                e.target.value = ""; // Clear the input
            }
        }
        if (rest.onChange) {
            rest.onChange(e); // Call the original onChange handler
        }
    };

    return (
        <div className={`${divClassNames} flex flex-col gap-1`}>
            {label && (
                <label className="block text-slate-500 text-sm font-medium mb-2 cap-first">
                    {label}
                </label>
            )}
            <input
                className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring ring-blue-400 ${customClassName}`}
                type={type}
                accept={accept} // Pass accept prop to input
                onChange={handleFileChange} // Use custom file change handler
                {...rest}
            />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
};

export default Input;