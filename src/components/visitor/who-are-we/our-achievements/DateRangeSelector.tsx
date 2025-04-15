import React, { useState, useEffect } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DateRangeSelector.css";

type DateRangeSelectorProps = {
  value: Range;
  onDateRangeChange?: (range: Range) => void;
};

const DateRangeSelector = ({ value, onDateRangeChange }: DateRangeSelectorProps) => {
  // Use local state for display purposes only
  const [localRange, setLocalRange] = useState<Range>(value);

  // Update local state if parent value changes externally
  useEffect(() => {
    setLocalRange(value);
  }, [value]);

  const handleSelect = (item: RangeKeyDict) => {
    const selection = item.selection;

    // Ensure endDate is defined, or fallback to today
    const adjustedEndDate = selection.endDate ? new Date(selection.endDate) : new Date();
    adjustedEndDate.setHours(23, 59, 59, 999); // Set end date to last moment of the day

    const adjustedSelection: Range = {
      ...selection,
      endDate: adjustedEndDate,
    };

    // Update local display state
    setLocalRange(adjustedSelection);
    // Call parent's handler to update the ref (or state) if provided
    onDateRangeChange && onDateRangeChange(adjustedSelection);
  };

  return (
    <div className="small-date-range">
      <DateRange
        onChange={handleSelect}
        displayMode="dateRange"
        moveRangeOnFirstSelection={false}
        ranges={[localRange]}
      />
    </div>
  );
};

export default DateRangeSelector;
