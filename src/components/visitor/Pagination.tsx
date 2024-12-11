import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const generatePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4 px-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md font-bold ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-primary hover:bg-blue-100"
        }`}
      >
        &lt;
      </button>
      {generatePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`h-[46px] w-[46px] sm:h-[60px] sm:w-[60px] flex justify-center items-center font-bold rounded-md ${
            currentPage === page
              ? "bg-primary border border-[rgba(0,0,0,0.5)] text-white"
              : "text-[#757575] hover:bg-blue-100"
          } ${page === "..." ? "cursor-default" : ""}`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md font-bold ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-primary hover:bg-blue-100"
        }`}
      >
        &gt;
      </button>
    </div>
  );
}
