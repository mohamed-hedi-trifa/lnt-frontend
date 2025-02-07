import React, { useState } from "react";

interface CheckboxProps {
  label?: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: string;
  borderColor?: string;
  nb?:string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label = "Checkbox",
  name = "custom-checkbox",
  checked = false,
  onChange,
  color = "bg-blue-500",
  borderColor = "border-black",
  nb=""
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className="flex items-center gap-[10px]">
      {/* Hidden checkbox input */}
      <input
        type="checkbox"
        id={name}
        name={name}
        className="hidden"
        checked={isChecked}
        onChange={handleToggle}
      />

      {/* Custom checkbox UI */}
      <div
        onClick={handleToggle}
        className={`w-6 h-6 flex items-center justify-center rounded-lg border-2 ${borderColor} cursor-pointer transition-all ${
          isChecked ? color : "bg-transparent"
        }`}
      >
        {isChecked && (
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Label */}
      <label
        htmlFor={name}
        className="text-gray-800 cursor-pointer"
        onClick={handleToggle}
      >
        {label}
      </label>
      {nb&&<div className="font-medium">({nb})</div>}
    </div>
  );
};

export default Checkbox;
