import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  width?: string; // Allows dynamic width
}

const InputFieldOpportunity: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  required = false,
  type = "text",
  placeholder = "",
  width = "300px", // Default width
}) => {
  return (
    <div className="flex flex-col items-start gap-1" style={{ width }}>
      <label htmlFor={id} className="font-semibold text-sm">
        {label} {required && <span className="text-[#FF0000]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="border border-[#D6DDEB] h-[34px] px-4 w-full "
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputFieldOpportunity;
