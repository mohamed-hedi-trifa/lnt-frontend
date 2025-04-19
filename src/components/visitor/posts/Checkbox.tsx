// src/components/posts/Checkbox.tsx
import React from "react";

interface CheckboxProps {
  label?: string;
  name?: string;
  checked: boolean;
  onChange: (checked: boolean, e?: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
  borderColor?: string;
  nb?: number;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label = "Checkbox",
  name = "custom-checkbox",
  checked,
  onChange,
  color = "bg-blue-500",
  borderColor = "border-black",
  nb,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, e);
  };

  const handleBoxClick = () => {
    onChange(!checked);
  };

  return (
    <div className="flex items-center gap-[10px]">
      {/* Hidden native checkbox for accessibility */}
      <input
        type="checkbox"
        id={name}
        name={name}
        className="hidden"
        checked={checked}
        onChange={handleInputChange}
      />

      {/* Visible box */}
      <div
        onClick={handleBoxClick}
        className={`w-6 h-6 flex items-center justify-center rounded-lg border-2 ${borderColor} cursor-pointer transition-all ${
          checked ? color : "bg-transparent"
        }`}
      >
        {checked && (
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
      <label htmlFor={name} className="text-gray-800 cursor-pointer">
        {label}
      </label>

      {/* Optional count */}
      {nb !== undefined && <div className="font-medium">({nb})</div>}
    </div>
  );
};

export default Checkbox;
