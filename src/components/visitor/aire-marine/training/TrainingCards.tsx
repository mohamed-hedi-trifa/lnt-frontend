import React, { useEffect, useState } from 'react'
import Pagination from '../../Pagination'
import axios from 'axios'
import TrainingCard from './TrainingCard'
import ButtonDropdown from '@/components/ButtonDropdown'
import FilterIcon from '@/assets/icons/FilterIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'
import sortIcon from '@/assets/icons/sort-icon.png'
import { Link } from 'gatsby'
import EmptyAchievements from '../../who-are-we/our-achievements/EmptyAchievements'
import EmptyTraining from './EmptyTraining'

const ShimmerBar = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
)

const TrainingCardSkeleton = () => (
  <div className="bg-white shadow-helmi p-4 flex flex-col gap-4 rounded-xl min-h-[420px] h-full">
    <ShimmerBar className="h-[240px] w-full rounded-md" />
    <ShimmerBar className="h-6 w-3/4" />
    <ShimmerBar className="h-4 w-1/2" />
  </div>
)

interface TrainingCardsProps {
  filter: {
    searchQuery?: string;
    themes?: number[];
    type?: string;
    dateFilter?: string | null;
    sortOrder?: 'desc' | 'asc';
    startDate?: Date | null;
    endDate?: Date | null;
  };
  setIsOpened: (val: boolean) => void;
}

export default function TrainingCards({ filter, setIsOpened }: TrainingCardsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit] = useState(10)
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>(filter.sortOrder || 'desc')
  const [loading, setLoading] = useState(true)
  const [itemsList, setItemsList] = useState<any[]>([])


  const handlePageChange = (p: number) => p > 0 && p <= totalPages && setCurrentPage(p)

  const fetchTraining = (query: any, page = currentPage) => {
    setLoading(true)
    axios
      .get(`/api/get-active-training/${limit}`, {
        params: {
          query,
          themes: filter.themes || [],
          type: filter.type || "",
          page,
          sortOrder,
          dateFilter: filter.dateFilter,
          startDate: filter.startDate,
          endDate: filter.endDate,
        },
      })
      .then(res => {
        setItemsList(res.data.data)
        setTotalPages(res.data.last_page)

      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTraining(filter.searchQuery, currentPage);
  }, [filter, currentPage, sortOrder]);

  if (loading)
    return (
      <section className="flex-1">
        <div className="grid sm:grid-cols-2 gap-4 px-4 sm:px-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <TrainingCardSkeleton key={i} />
          ))}
        </div>
      </section>
    )

  const startIndex = (currentPage - 1) * limit + 1
  const endIndex = Math.min(currentPage * limit, itemsList.length)

  return (
    <section className="flex-1">
      <div className="hidden sm:flex justify-between relative z-20">
        <ButtonDropdown
          items={[
            { key: 'desc', name: 'Les plus récents' },
            { key: 'asc', name: 'Les plus anciens' },
          ]}
          position="left"
          onSelect={item => setSortOrder(item.key)}
          renderItem={item => <div className="py-1 px-4 cursor-pointer">{item.name}</div>}
        >
          {open => (
            <button className="h-12 rounded-[10px] border-2 border-black flex items-center">
              <div className="px-2 py-1.5 flex items-center gap-2">
                <img src={sortIcon} className="size-6" alt="" />
                <div className="text-black text-xl font-medium">Trier</div>
                <div className={`w-6 h-6 transition ${open ? '-rotate-180' : ''}`}>
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>
        {itemsList.length === 0 ? (
          ""
        ) : (
          <>
            <div className="text-black text-xl font-semibold mt-[2px]">{`${startIndex} - ${endIndex} de ${itemsList.length} Publications`}</div>
          </>
        )}
      </div>

      <div className="sm:hidden flex justify-between pr-5 relative z-20">
        <button
          onClick={() => setIsOpened(true)}
          className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl flex items-center gap-2.5"
        >
          <FilterIcon />
          <div className="text-white text-sm font-bold">Filtres</div>
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
          {open => (
            <button className="h-12 rounded-[10px] border-2 border-black flex items-center">
              <div className="px-2 py-1.5 flex items-center gap-2">
                <img src={sortIcon} className="size-6" alt="" />
                <div className="text-black text-xl font-medium">Trier</div>
                <div className={`w-6 h-6 transition ${open ? '-rotate-180' : ''}`}>
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>
      </div>
      {itemsList.length === 0 ? (
        ""
      ) : (
        <>
          <div className="sm:hidden px-5 font-semibold pt-5">{`${startIndex} - ${endIndex} de ${itemsList.length} Publications`}</div>
        </>
      )}


      <section className="flex flex-col gap-8 w-full relative z-10 my-5 sm:my-10">
        {itemsList.length === 0 ? (
          <EmptyTraining />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4 px-4 sm:px-0">
              {itemsList.map(t => (
                <Link key={t.id} to={`/protected-air-marine-coastal-areas/training/${t.slug}`}>
                  <TrainingCard training={t} />
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
    </section>
  )
}
