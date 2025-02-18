import React from "react";

interface SelectFieldProps {
  id: string;
  name: string;
  required?: boolean;
  rounded?: boolean;
  options: string[]; 
  placeholder?: string;
  height?: string; 
}

const SelectFieldBenevole: React.FC<SelectFieldProps> = ({
  id,
  name,
  required = false,
  rounded = false,
  options,
  placeholder = "",
  height = "39px", 
}) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full" >
      <select
        name={name}
        id={id}
        style={{  height }}
        className={`border border-[#D6DDEB] font-bold text-sm h-[34px] pl-4 w-full ${rounded ? 'rounded-md' : 'rounded-none'}`}
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

export default SelectFieldBenevole;
