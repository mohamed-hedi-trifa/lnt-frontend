import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="grow flex justify-end">
      <div
        className={`flex items-center justify-end max-w-[400px] py-1 rounded-full transition-all duration-300 ${
          isExpanded ? "md:w-full md:px-4 md:bg-gray-800" : "w-0"
        }`}
      >
        <MagnifyingGlassIcon className="shrink-0 h-8 w-8 text-white cursor-pointer -scale-x-100" onClick={toggleSearch} />
        <input
          type="text"
          placeholder="Search..."
          className={`grow w-0 bg-transparent text-white outline-none transition-all duration-300 ${
            isExpanded ? "md:pl-2 md:opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
