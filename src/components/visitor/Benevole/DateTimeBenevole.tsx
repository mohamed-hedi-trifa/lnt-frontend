import React, { ChangeEvent } from "react";
import "./BenevoleStyle.css";

interface DateTimeBenevoleProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeBenevole: React.FC<DateTimeBenevoleProps> = ({
  
  id,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="relative w-[149px] flex flex-col gap-1">


      {/* Time Input */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold pointer-events-none">
          Heures :
        </span>
        <input
          type="time"
          id={id}
          name={name}
          className="border border-[#D6DDEB] text-end px-4 py-2 rounded-md font-semibold text-sm w-full bg-transparent placeholder-transparent focus:outline-none appearance-none custom-time-input"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default DateTimeBenevole;
