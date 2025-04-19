// src/components/visitor/who-are-we/our-achievements/AchievementsCards.tsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AchievementCard from './AchievementCard';
import Pagination from '../../Pagination';
import ButtonDropdown from '@/components/ButtonDropdown';
import FilterIcon from '@/assets/icons/FilterIcon';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import sortIcon from '@/assets/icons/sort-icon.png';
import { Link } from 'gatsby';
import EmptyAchievements from './EmptyAchievements';

const ShimmerBar = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

const AchievementCardSkeleton = () => (
  <div className="bg-white shadow-helmi p-4 flex flex-col gap-4 rounded-xl min-h-[420px] h-full">
    <ShimmerBar className="h-[240px] w-full rounded-md" />
    <div className="flex gap-2 mt-2">
      <ShimmerBar className="h-6 w-20" />
      <ShimmerBar className="h-6 w-20" />
    </div>
    <ShimmerBar className="h-6 w-3/4 mt-4" />
    <ShimmerBar className="h-4 w-1/3 mt-auto" />
  </div>
);

interface AchievementsCardsProps {
  filter: {
    searchQuery?: string;
    themes?: number[];
    dateFilter?: string | null;
    sortOrder?: 'desc' | 'asc';
    startDate?: Date | null;
    endDate?: Date | null;
  };
  setIsOpened: (val: boolean) => void;
}

export default function AchievementsCards({ filter, setIsOpened }: AchievementsCardsProps) {
  const [currentPage, setCurrentPage]   = useState(1);
  const [totalPages, setTotalPages]     = useState(1);
  const [limit]                        = useState(10);
  const [loading, setLoading]           = useState(true);
  const [itemsList, setItemsList]       = useState<any[]>([]);
  const [sortOrder, setSortOrder]       = useState<'desc' | 'asc'>(filter.sortOrder || 'desc');

  // track whether we've ever loaded once
  const isFirstLoadRef = useRef(true);

  const handlePageChange = (p: number) => {
    if (p > 0 && p <= totalPages) {
      setCurrentPage(p);
    }
  };

  const fetchAchievements = async (query: any, page = currentPage) => {
    // only show skeleton on very first load
    if (isFirstLoadRef.current) {
      setLoading(true);
    }

    try {
      const res = await axios.get(`/api/get-active-achievements/${limit}`, {
        params: {
          query,
          themes:     filter.themes || [],
          page,
          sortOrder,
          dateFilter: filter.dateFilter,
          startDate:  filter.startDate,
          endDate:    filter.endDate,
        },
      });

      setItemsList(res.data.data);
      setTotalPages(res.data.last_page);
    } finally {
      setLoading(false);
      isFirstLoadRef.current = false;
    }
  };

  useEffect(() => {
    fetchAchievements(filter.searchQuery, currentPage);
  }, [filter, currentPage, sortOrder]);

  // ONLY show the skeleton grid on the very first load:
  if (loading && isFirstLoadRef.current) {
    return (
      <section className="grid sm:grid-cols-2 gap-4 my-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <AchievementCardSkeleton key={i} />
        ))}
      </section>
    );
  }

  // compute for header counts
  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex   = Math.min(currentPage * limit, itemsList.length);

  return (
    <div>
      {/* -------- Desktop header -------- */}
      <div className="hidden sm:flex justify-between relative z-20">
        <ButtonDropdown
          items={[
            { key: 'desc', name: 'Les plus récents' },
            { key: 'asc',  name: 'Les plus anciens' },
          ]}
          position="left"
          onSelect={item => setSortOrder(item.key)}
          renderItem={item => <div className="py-1 px-4 cursor-pointer">{item.name}</div>}
        >
          {open => (
            <button
              type="button"
              className="h-12 rounded-[10px] border-2 border-black flex items-center"
            >
              <div className="px-2 py-1.5 flex items-center gap-2">
                <img src={sortIcon} className="size-6" alt="Sort Icon" />
                <div className="text-black text-xl font-medium">Trier</div>
                <div className={`w-6 h-6 transition duration-200 ${open ? '-rotate-180' : ''}`}>
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>

        <div className="text-black text-xl font-semibold mt-[2px]">
          {`${startIndex} - ${endIndex} de ${itemsList.length} Réalisations`}
        </div>
      </div>

      {/* -------- Mobile header -------- */}
      <div className="sm:hidden flex justify-between pr-5 relative z-20">
        <button
          type="button"
          onClick={() => setIsOpened(true)}
          className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl flex items-center gap-2.5"
        >
          <FilterIcon />
          <div className="text-white text-sm font-bold">Filtres</div>
        </button>

        <ButtonDropdown
          items={[
            { key: 'desc', name: 'Les plus récents' },
            { key: 'asc',  name: 'Les plus anciens' },
          ]}
          position="right"
          onSelect={item => setSortOrder(item.key)}
          renderItem={item => <div className="py-1 px-4 cursor-pointer">{item.name}</div>}
        >
          {open => (
            <button
              type="button"
              className="h-12 rounded-[10px] border-2 border-black flex items-center"
            >
              <div className="px-2 py-1.5 flex items-center gap-2">
                <img src={sortIcon} className="size-6" alt="Sort Icon" />
                <div className="text-black text-xl font-medium">Trier</div>
                <div className={`w-6 h-6 transition duration-200 ${open ? '-rotate-180' : ''}`}>
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>
      </div>

      <div className="sm:hidden px-5 font-semibold pt-5">
        {`${startIndex} - ${endIndex} de ${itemsList.length} réalisations`}
      </div>

      {/* -------- Achievements grid -------- */}
      <section className="flex flex-col gap-8 w-full relative z-10 my-5">
        {itemsList.length === 0 ? (
          <EmptyAchievements />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              {itemsList.map(ach => (
                <Link key={ach.id} to={`/who-are-we/our-achievements/${ach.slug}`}>
                  <AchievementCard achievement={ach} />
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center px-4 sm:px-0">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
