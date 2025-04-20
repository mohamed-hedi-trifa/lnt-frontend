import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "gatsby";
import Pagination from "../Pagination";
import OpportunityCard from "./OpportunityCard";
import NoOpportunityMessage from "./NoOpportunityMessage";

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

const SkeletonCard = () => (
  <div className="flex flex-col bg-white rounded-xl pb-5 sm:min-h-[420px] h-full sm:w-[300px] w-[350px] shadow-helmi">
    <div className="flex w-full justify-between px-4 sm:py-2 py-3 items-center">
      <Shimmer className="h-4 w-24" />
      <Shimmer className="w-3 h-3 rounded-full" />
    </div>
    <Shimmer className="w-full sm:h-[222px] h-[202px] rounded-md" />
    <div className="py-2 px-5 flex-grow space-y-3">
      <Shimmer className="h-6 w-full" />
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-4 w-1/2" />
    </div>
    <div className="px-5 space-y-2">
      <Shimmer className="h-px w-full" />
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-4 w-1/2" />
      <div className="flex justify-center pt-2">
        <Shimmer className="h-8 w-24 rounded-full" />
      </div>
    </div>
  </div>
);

interface OpportunityCardsProps {
  filter: {
    searchQuery?: string | null;
    opportunityTypes?: string[];
    dateFilter?: string | null;
    sortOrder?: "desc" | "asc";
  };
  setIsOpened: (val: boolean) => void;
}

export default function OpportunityCards({ filter }: OpportunityCardsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState<any[]>([]);


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


  // useEffect(fetchPosts, [filter, currentPage]);

  return (
    <section className="flex flex-col gap-8 w-full relative z-10 my-5 justify-center items-center">
      {loading ? (
        <div className="grid sm:grid-cols-2 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : itemsList.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 gap-5">
            {itemsList.map((o: any) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center px-4 sm:px-0">
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      ) : (
        <NoOpportunityMessage />
      )}
    </section>
  );
}
