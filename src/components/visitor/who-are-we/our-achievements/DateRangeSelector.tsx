import React, { useState } from "react";
import { DateRange, DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

const DateRangeSelector = () => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <DateRange
      onChange={(item: RangeKeyDict) => setState([item.selection])}
      displayMode="dateRange"
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  );
};

export default DateRangeSelector;
