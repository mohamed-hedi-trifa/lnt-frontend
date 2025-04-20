import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Pagination from '../Pagination';
import NewsCard from './NewsCard';
import { Link } from 'gatsby';
import ButtonDropdown from '@/components/ButtonDropdown';
import sortIcon from "@/assets/icons/sort-icon.png";
import FilterIcon from '@/assets/icons/FilterIcon';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';

interface NewsCardsProps {
  filter: {
    searchQuery?: string;
    themes?: number[];
    dateFilter?: string | null;
    sortOrder?: 'desc' | 'asc';
  };
  setIsOpened: (val: boolean) => void;
}

export default function NewsCards({ filter, setIsOpened }: NewsCardsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);
 
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>(filter.sortOrder || 'desc');
  const isFirstLoadRef = useRef(true);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getNews = (query: any, page= currentPage) => {
    if (isFirstLoadRef.current) {
      setLoading(true);
    }
    axios.get(`/api/get-active-news/${limit}`, {
      params: {
        query,
        themes:     filter.themes || [],
        page,
        sortOrder,
        dateFilter: filter.dateFilter,

      },
    })
    .then(res => {
      setItemsList(res.data.data);
      setTotalPages(res.data.last_page);
      console.log(filter.themes);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching news:", err);
      setLoading(false);
    });
  };

  useEffect(() => {
    getNews(filter.searchQuery, currentPage);
  }, [filter, currentPage,  sortOrder]);

  if (loading) return <p className='w-full text-center'>Loading...</p>;

  return (
    <div>
      <div className='hidden sm:flex justify-between relative z-20 items-center'>
        <ButtonDropdown
          items={[
            { key: 'desc', name: 'Les plus récents' },
            { key: 'asc', name: 'Les plus anciens' },
          ]}
          position="left"
          onSelect={item => setSortOrder(item.key)}
          renderItem={item => <div className="py-1 px-4 cursor-pointer">{item.name}</div>}
        >
          {(isOpen) => (
            <button className="h-12 rounded-xl border-2 border-black flex items-center">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <img src={sortIcon} alt="sort icon" className="w-6" />
                <span className="text-black text-xl font-medium">Trier</span>
                <div className={`w-6 h-6 transition duration-200 ${isOpen ? "-rotate-180" : ""}`}>
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>
        <div className="text-xl font-semibold mt-[2px] pr-14">
          {`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList.length)} de ${itemsList.length} publications`}
        </div>
      </div>
      <div className="sm:hidden flex justify-between pr-5 relative z-20">
        <button
          type="button"
          onClick={() => setIsOpened(true)}
          className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl flex items-center gap-2.5"
        >
          <FilterIcon />
          <span className="text-white text-sm font-bold">Filtres</span>
        </button>
        <ButtonDropdown
          items={[
            { key: 'desc', name: 'Les plus récents' },
            { key: 'asc', name: 'Les plus anciens' },
          ]}
          position="right"
          onSelect={item => setSortOrder(item.key)}
          renderItem={item => <div className="py-1 px-4 cursor-pointer">{item.name}</div>}
        >
          {(isOpen) => (
            <button className="h-12 rounded-xl border-2 border-black flex items-center">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <img src={sortIcon} alt="Sort Icon" className="w-6" />
                <span className="text-black text-xl font-medium">Trier</span>
                <div className={`w-6 h-6 transition duration-200 ${isOpen ? "-rotate-180" : ""}`}>
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>
      </div>
      <div className='sm:hidden px-5 font-semibold pt-5 text-start'>
        {`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList.length)} de ${itemsList.length} publications`}
      </div>
      <section className='grid sm:grid-cols-2 gap-4 px-4 sm:px-0 my-5 sm:my-10'>
        {itemsList.map((news: any) => (
          <Link key={news.id} to={`/news/${news.slug}`}>
            <NewsCard news={news} />
          </Link>
        ))}
      </section>
      {totalPages > 1 && (
        <div className="flex justify-center px-4 sm:px-0">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}
