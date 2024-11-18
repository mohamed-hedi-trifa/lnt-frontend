import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

const DateRangeSelector = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <DateRangePicker
      onChange={(item: { selection: { startDate: Date; endDate: Date; key: string; }; }) => setState([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  );
};

export default DateRangeSelector;
