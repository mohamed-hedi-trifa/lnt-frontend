import React from "react";

interface SelectFieldProps {
  id: string;
  name: string;
  required?: boolean;
  options: string[]; 
  placeholder?: string;
  width?: string;
  height?: string; 
}

const SelectFieldOpportunity: React.FC<SelectFieldProps> = ({
  id,
  name,
  required = false,
  options,
  placeholder = "",
  width = "300px", 
  height = "39px", 
}) => {
  return (
    <div className="flex flex-col items-start gap-1" style={{ width }}>
      <select
        name={name}
        id={id}
        style={{  height }}
        className="border border-[#D6DDEB] font-bold text-sm h-[34px] pl-4 w-full"
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFieldOpportunity;
