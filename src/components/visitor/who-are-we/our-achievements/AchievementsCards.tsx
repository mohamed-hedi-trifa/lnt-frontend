import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AchievementCard from './AchievementCard';
import Pagination from '../../Pagination';
import ButtonDropdown from '@/components/ButtonDropdown';
import FilterIcon from '@/assets/icons/FilterIcon';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import sortIcon from '@/assets/icons/sort-icon.png';
import { Link } from 'gatsby';
import EmptyAchievements from './EmptyAchievements';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemsList, setItemsList] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>(filter.sortOrder || 'desc');
  const resSafeLength = (arr: any[]) => (Array.isArray(arr) ? arr.length : 0);
  const [searchQuery, setSearchQuery] = useState(filter.searchQuery || '');
  const [themes, setThemes] = useState<number[]>(filter.themes || []);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  function getAchievements(query: any, page = currentPage, themes: number[]) {
    setLoading(true);
    axios
      .get(`/api/get-active-achievements/${limit}`, {
        params: {
          query: query,
          themes: themes,
          page: page,
          sortOrder: sortOrder,
          dateFilter: filter.dateFilter,
          startDate: filter.startDate,
          endDate: filter.endDate,
        },
      })
      .then((res) => {
        setItemsList(res.data.data);
        setTotalPages(res.data.last_page);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  function getThemes() {
    axios
      .get('/api/theme')
      .then((res) => {
        setThemes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getThemes();
  }, []);

  useEffect(() => {
    getAchievements(searchQuery, currentPage, filter.themes || []);
  }, [searchQuery, currentPage, filter, sortOrder]);

  if (loading) return <p className='w-full'>"Loading..."</p>;

  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, resSafeLength(itemsList));

  return (
    <div>
      <div className="hidden sm:flex justify-between relative z-20">
        <ButtonDropdown
          items={[
            { key: 'desc', name: 'Les plus récents' },
            { key: 'asc', name: 'Les plus anciens' },
          ]}
          position="left"
          onSelect={(item: any) => {
            setSortOrder(item.key);
          }}
          renderItem={(item) => <div className="py-1 px-4 cursor-pointer">{item.name}</div>}
        >
          {(isOpen) => (
            <button className="h-12 rounded-[10px] border-2 border-black flex items-center">
              <div className="px-2 py-1.5 flex items-center gap-2">
                <img src={sortIcon} className="size-6" alt="Sort Icon" />
                <div className="text-black text-xl font-medium font-['Montserrat']">Trier</div>
                <div className={`w-6 h-6 transition duration-200 ${isOpen ? '-rotate-180' : ''}`}>
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>

        <div className="text-black text-xl font-semibold font-['Montserrat'] mt-[2px]">
          {`${startIndex} - ${endIndex} de ${itemsList.length} Réalisations`}
        </div>
      </div>

      <div className="sm:hidden flex justify-between pr-5 relative z-20">
        <button
          type="button"
          onClick={() => setIsOpened(true)}
          className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl flex items-center gap-2.5"
        >
          <FilterIcon />
          <div className="text-white text-sm font-bold font-['Montserrat']">Filtres</div>
        </button>

        <ButtonDropdown
          items={[
            { key: 'desc', name: 'Les plus récents' },
            { key: 'asc', name: 'Les plus anciens' },
          ]}
          position="right"
          onSelect={(item: any) => {
            setSortOrder(item.key);
          }}
          renderItem={(item) => <div className="py-1 px-4 cursor-pointer">{item.name}</div>}
        >
          {(isOpen) => (
            <button className="h-12 rounded-[10px] border-2 border-black flex items-center">
              <div className="px-2 py-1.5 flex items-center gap-2">
                <img src={sortIcon} className="size-6" alt="Sort Icon" />
                <div className="text-black text-xl font-medium font-['Montserrat']">Trier</div>
                <div className={`w-6 h-6 transition duration-200 ${isOpen ? '-rotate-180' : ''}`}>
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

      <section className="flex flex-col gap-8 w-full relative z-10 my-5">
        {itemsList.length === 0 ? (
          <EmptyAchievements />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              {itemsList.map((achievement: any) => (
                <Link key={achievement.id} to={`/who-are-we/our-achievements/${achievement.slug}`}>
                  <AchievementCard achievement={achievement} />
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center px-4 sm:px-0">
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
