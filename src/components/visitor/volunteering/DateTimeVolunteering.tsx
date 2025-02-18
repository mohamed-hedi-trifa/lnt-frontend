import React, { useState } from "react";
import "./VounteeringStyle.css"
export default function DateTimeVolunteering() {
  const [time, setTime] = useState("00:00");

  return (
    <div className="relative w-[149px]">
      {/* Label inside the input */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold pointer-events-none">
        Heures :
      </span>

      <input
        type="time"
        className="border border-[#D6DDEB] text-end px-4 py-2 rounded-md  font-semibold text-sm w-full bg-transparent placeholder-transparent focus:outline-none appearance-none custom-time-input"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </div>
  );
}
