<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import CardFestival from "./FestivalCard";
import axios from "axios";

interface CardProps {
  cards: {
    date: string;
    description: string;
    lieu: string; 
    titre:string;
    imageUrl : string;
    lien : string

  }[];
  itemsPerPage: number;
  properties : string ; 
  gridSystem : string;
  buttonsTitles : string
  buttonPosition : string
  hiddenPagiation : string

}

const ListCardFestivales: React.FC<CardProps> = ({ cards, itemsPerPage,properties,gridSystem,buttonsTitles,buttonPosition,hiddenPagiation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); // Set the limit of posts per page

  const handleSearchChange = (e: any) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
          setCurrentPage(newPage);
      }
  };
const [loading, setLoading] = useState(true);
const [itemsList, setItemsList] = useState<any[]>([]);

function getPosts(query: any, page = currentPage) {
  setLoading(true);
  axios.get(`/api/get-active-posts/${limit ? limit : ""}`, {
      params: { query, page }
  }).then(res => {
      setItemsList(res.data.data);
      console.log(res.data.data)
      setTotalPages(res.data.last_page); // Get total pages from response
      setLoading(false);
  }).catch(err => {
      // Swal.fire('Error', err?.response?.data?.message, "error");
      setLoading(false);
  });
}

useEffect(() => {
  getPosts(searchQuery, currentPage);
}, [searchQuery, currentPage]);

  // Get the cards for the current page
  const currentCards = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change page
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Pagination Range (show numbers and the '...' button when there are more pages)
  const getPaginationRange = () => {
    let pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5; // Maximum pages to show at once

    // If we have fewer pages than the max, show all of them
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Display the first page
      pageNumbers.push(1);
      
      // Display an ellipsis if there's a gap after the first page
      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      // Show the current page and its neighbors (previous and next)
      if (currentPage > 2) pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 1);
      
      // Display an ellipsis if there's a gap before the last page
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      // Display the last page
      pageNumbers.push(totalPages);
    }

    // Remove duplicates (if any)
    return pageNumbers.filter((item, index, self) => self.indexOf(item) === index);
  };

  return (
    <div>
      <div className={`mt-12 ${gridSystem}`}>
        {itemsList.map((card, index) => (
          <CardFestival
            key={index}
            date={"date"}
            description={card.summary_fr || card.summary_en}
            titre={card.title_en || card.title_fr}
            lieu={"Lieu"}
            properties={`${properties}`}
            buttonsTitles={`${buttonsTitles}`}
            buttonPosition={`${buttonPosition}`}
            imageUrl={card.image} 
            lien={card.lien}      

            />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={`flex justify-center mt-10 gap-4 items-center ${hiddenPagiation}`}>
        {/* Prev Button with Chevron Left */}
        <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-[60px] h-[60px] p-[16px] gap-0 rounded-[4px] rounded-bl-[4px] border-l-[0px] border-r-[0px] transition-opacity bg-transparent"
                >
                <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>


        {/* Page Number Buttons */}
        {getPaginationRange().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof page === "number") {
                goToPage(page);
              }
            }}
            className={` w-[60px] h-[60px] px-4 py-2 rounded-lg ${page === currentPage ? "bg-[#51ADC6] text-white" : "bg-gray-200"}`}
          >
            {page}
          </button>
        ))}

        {/* Next Button with Chevron Right */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-[60px] h-[60px] p-[16px] gap-0  rounded-[4px] transition-opacity bg-transparent "
        >
          <ChevronRightIcon className="w-6 h-6 text-black " />
        </button>
      </div>
    </div>
  );
};

export default ListCardFestivales;
=======
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import axios from "axios";
import FestivalCard from "./FestivalCard";

interface CardProps {
  cards: {
    date: string;
    description: string;
    lieu: string; 
    titre:string;
    imageUrl : string;
    lien : string

  }[];
  itemsPerPage: number;
  properties : string ; 
  gridSystem : string;
  buttonsTitles : string
  buttonPosition : string
  hiddenPagiation : string

}

const ListCardFestivales: React.FC<CardProps> = ({ cards, itemsPerPage,properties,gridSystem,buttonsTitles,buttonPosition,hiddenPagiation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); // Set the limit of posts per page

  const handleSearchChange = (e: any) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
          setCurrentPage(newPage);
      }
  };
const [loading, setLoading] = useState(true);
const [itemsList, setItemsList] = useState<any[]>([]);

function getPosts(query: any, page = currentPage) {
  setLoading(true);
  axios.get(`/api/get-active-posts/${limit ? limit : ""}`, {
      params: { query, page }
  }).then(res => {
      setItemsList(res.data.data);
      console.log(res.data.data)
      setTotalPages(res.data.last_page); // Get total pages from response
      setLoading(false);
  }).catch(err => {
      // Swal.fire('Error', err?.response?.data?.message, "error");
      setLoading(false);
  });
}

useEffect(() => {
  getPosts(searchQuery, currentPage);
}, [searchQuery, currentPage]);

  // Get the cards for the current page
  const currentCards = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change page
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Pagination Range (show numbers and the '...' button when there are more pages)
  const getPaginationRange = () => {
    let pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5; // Maximum pages to show at once

    // If we have fewer pages than the max, show all of them
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Display the first page
      pageNumbers.push(1);
      
      // Display an ellipsis if there's a gap after the first page
      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      // Show the current page and its neighbors (previous and next)
      if (currentPage > 2) pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 1);
      
      // Display an ellipsis if there's a gap before the last page
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      // Display the last page
      pageNumbers.push(totalPages);
    }

    // Remove duplicates (if any)
    return pageNumbers.filter((item, index, self) => self.indexOf(item) === index);
  };

  return (
    <div className="max-w-[1074px] mx-auto">
      <div className={`mt-12 ${gridSystem}`}>
        {itemsList.map((card, index) => (
          <FestivalCard
            key={index}
            post={card}  

            />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={`flex justify-center mt-10 gap-4 items-center ${hiddenPagiation}`}>
        {/* Prev Button with Chevron Left */}
        <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-[60px] h-[60px] p-[16px] gap-0 rounded-[4px] rounded-bl-[4px] border-l-[0px] border-r-[0px] transition-opacity bg-transparent"
                >
                <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>


        {/* Page Number Buttons */}
        {getPaginationRange().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof page === "number") {
                goToPage(page);
              }
            }}
            className={` w-[60px] h-[60px] px-4 py-2 rounded-lg ${page === currentPage ? "bg-[#51ADC6] text-white" : "bg-gray-200"}`}
          >
            {page}
          </button>
        ))}

        {/* Next Button with Chevron Right */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-[60px] h-[60px] p-[16px] gap-0  rounded-[4px] transition-opacity bg-transparent "
        >
          <ChevronRightIcon className="w-6 h-6 text-black " />
        </button>
      </div>
    </div>
  );
};

export default ListCardFestivales;
>>>>>>> 92e42f645dca74d846795714bae508fc2edc6a79
