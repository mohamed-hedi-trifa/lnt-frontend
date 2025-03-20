import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DateRangeSelector.css";

type DateRangeSelectorProps = {
  value: Range;
  onDateRangeChange?: (range: Range) => void;
};

const DateRangeSelector = ({ value, onDateRangeChange }: DateRangeSelectorProps) => {
  const handleSelect = (item: RangeKeyDict) => {
    const selection = item.selection;
    
    // Ensure endDate is defined, or fallback to today
    const adjustedEndDate = selection.endDate ? new Date(selection.endDate) : new Date();
    adjustedEndDate.setHours(23, 59, 59, 999); // Set end date to last moment of the day

    const adjustedSelection: Range = {
      ...selection,
      endDate: adjustedEndDate,
    };

    onDateRangeChange && onDateRangeChange(adjustedSelection);
  };

  return (
    <div className="small-date-range">
      <DateRange
        onChange={handleSelect}
        displayMode="dateRange"
        moveRangeOnFirstSelection={false}
        ranges={[value]}
      />
    </div>
  );
};

export default DateRangeSelector;
