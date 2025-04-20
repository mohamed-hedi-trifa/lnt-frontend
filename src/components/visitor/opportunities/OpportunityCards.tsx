import React, { useEffect, useState } from 'react'

import axios from "axios"


import { Link } from 'gatsby';



import Pagination from '../Pagination';
import OpportunityCard from './OpportunityCard';
import NoOpportunityMessage from './NoOpportunityMessage';

interface OpportunityCardsProps {
  filter: {
    searchQuery?: string | null;
    opportunityTypes?: string[];
    dateFilter?: string | null;
    sortOrder?: 'desc' | 'asc';
  };
  setIsOpened: (val: boolean) => void;
}

export default function OpportunityCards({filter}: OpportunityCardsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); // Set the limit of posts per page




  const handleSearchChange = (e: any) => {

    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);

  function getOpportunities(query: any, page = currentPage) {
    setLoading(true);
    axios.get(`/api/get-active-opportunities/${limit ? limit : ""}`, {
      params: {
        query: query,
        page: page,
        dateFilter: filter.dateFilter,
        opportunityTypes: filter.opportunityTypes,
      }
    }).then(res => {
      setItemsList(res.data.data);
      setTotalPages(res.data.last_page); // Get total pages from response
     
      setLoading(false);
    }).catch(err => {
      // Swal.fire('Error', err?.response?.data?.message, "error");
      setLoading(false);
    });
  }

  useEffect(() => {
    getOpportunities(filter.searchQuery, currentPage, filter.opportunityTypes || []);
  }, [filter, currentPage]);

  if (loading) return "Loading..."

  return (
    <section className='flex flex-col gap-8 w-full relative z-10 my-5 justify-center items-center'>
      {itemsList && itemsList.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-5 ">
          {itemsList.map((opportunity: any) => (
            <OpportunityCard opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <NoOpportunityMessage />
      )}
      {totalPages > 1 && (
        <div className="flex justify-center px-4 sm:px-0">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      )}
    </section>
  )
}
