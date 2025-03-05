import React, { ChangeEvent } from "react";

interface SelectFieldProps {
  id: string;
  name: string;
  required?: boolean;
  rounded?: boolean;
  options: string[];
  valueoptions?: string[]; 
  placeholder?: string;
  height?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectFieldBenevole: React.FC<SelectFieldProps> = ({
  id,
  name,
  required = false,
  rounded = false,
  options,
  valueoptions, 
  placeholder = "",
  height = "39px",
  value = "", // Default to empty string for placeholder functionality
  onChange,
}) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <select
        name={name}
        id={id}
        value={value} // Ensures controlled behavior
        onChange={onChange}
        style={{ height }}
        className={`border border-[#D6DDEB] font-bold text-sm h-[34px] pl-4 w-full ${
          rounded ? "rounded-md" : "rounded-none"
        }`}
      >
        {/* Placeholder option that remains disabled */}
        {placeholder && (
          <option value=""  >
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={valueoptions ? valueoptions[index] : option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFieldBenevole;
