import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import FilterTitle from '../../posts/FilterTitle';
import Checkbox from '../../posts/Checkbox';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

export default function PreviousEditionSidebar({
  isOpened,
  setIsOpened,
  filteredYears,
  setFilteredYears,
}: {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  filteredYears: number[];
  setFilteredYears: (years: number[]) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>(filteredYears);

  // Update `isAllChecked` whenever `selectedYears` changes
  const isAllChecked = selectedYears.length === years.length;

  // Handle individual year checkbox change
  const handleYearCheckboxChange = (year: number) => {
    const newSelectedYears = selectedYears.includes(year)
      ? selectedYears.filter((y) => y !== year) // Remove year if already selected
      : [...selectedYears, year]; // Add year if not selected

    setSelectedYears(newSelectedYears);
  };

  // Handle "All Editions" checkbox change
  const handleAllCheckboxChange = () => {
    if (isAllChecked) {
      setSelectedYears([]); // Deselect all years
    } else {
      setSelectedYears([...years]); // Select all years
    }
  };

  // Apply filters and close the sidebar
  const handleApplyFilters = () => {
    setFilteredYears(selectedYears);
    setIsOpened(false); // Close the sidebar
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedYears([]);
    setFilteredYears([]);
  };

  // Fetch available years on component mount
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await axios.get('/api/previous-editions-years');
        setYears(res.data);
      } catch (err) {
        console.error('Failed to fetch years:', err);
      }
    };

    fetchYears();
  }, []);

  // Update body overflow when sidebar is opened/closed
  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'visible';
  }, [isOpened]);

  return (
    <aside
      className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${
        isOpened ? 'translate-x-0' : 'translate-x-[-100%]'
      }`}
      onClick={() => setIsOpened(false)}
    >
      <form
        className="opacity-90 sm:opacity-100 bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to parent
      >
        {/* Search Input */}
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input type="text" placeholder="Recherche" />
        </div>

        {/* Date Filter */}
        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Éditions" />
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <Checkbox
                checked={isAllChecked}
                onChange={handleAllCheckboxChange}
                label="Tous les Éditions"
              />
              <span>({years.length})</span>
            </div>

            {/* Display either the first 4 or all years based on `showAll` */}
            {years.slice(0, showAll ? years.length : 4).map((year) => (
              <Checkbox
                key={year}
                checked={selectedYears.includes(year)}
                onChange={() => handleYearCheckboxChange(year)}
                label={`Éditions ${year}`}
              />
            ))}

            {/* Show toggle button only if there are more than 4 years */}
            {years.length > 4 && (
              <div
                className="flex gap-2 bg-[#EFEFEF] rounded-lg w-fit px-2 py-1 mt-2 cursor-pointer"
                onClick={() => setShowAll(!showAll)}
              >
                <PlusIcon className="w-[18px]" />
                {showAll ? 'Afficher moins' : `Afficher ${years.length - 4} de plus`}
              </div>
            )}
            <div className='flex gap-2 bg-[#efefef] rounded-lg w-fit px-2 py-1 mt-2 cursor-pointer' >
            <PlusIcon  className='w-[18px]'/> Afficher 3 de plus
            </div>
           
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleApplyFilters}
            className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold"
          >
            Appliquer les Filtres
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]"
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </aside>
  );
}