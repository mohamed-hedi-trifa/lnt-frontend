import React from "react";

interface SelectFieldProps {
  id: string;
  name: string;
  required?: boolean;
  options: string[];
  valueoptions?: string[]; // Optional prop for custom values
  placeholder?: string;
  width?: string;
  height?: string;
  value?: string; // Controlled value
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Handle changes
}

const SelectFieldOpportunity: React.FC<SelectFieldProps> = ({
  id,
  name,
  required = false,
  options,
  valueoptions, // Optional custom values
  placeholder = "",
  width = "300px",
  height = "39px",
  value = "", // Default value is empty string
  onChange, // Handle changes
}) => {
  return (
    <div className="flex flex-col items-start gap-1" style={{ width }}>
      <select
        name={name}
        id={id}
        style={{ height }}
        className="border border-[#D6DDEB] font-bold text-sm h-[34px] pl-4 w-full"
        value={value} // Controlled component
        onChange={onChange} // Handle changes
        required={required}
      >
        {/* Placeholder option */}
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {/* Dynamic options */}
        {options.map((option, index) => (
          <option
            key={index}
            value={valueoptions ? valueoptions[index] : option} // Use valueoptions if provided, else use option text
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFieldOpportunity;