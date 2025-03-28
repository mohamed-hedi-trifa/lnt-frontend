import React, { useEffect, useState } from 'react'
import Pagination from '../../Pagination'
import axios from "axios"
import TrainingCard from './TrainingCard';
import ButtonDropdown from '@/components/ButtonDropdown';
import FilterIcon from '@/assets/icons/FilterIcon';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import sortIcon from "@/assets/icons/sort-icon.png"
import { Link } from 'gatsby';
import Loader from '@/components/atoms/loader';

interface TrainingCardsProps {
  filter: {
    searchQuery?: string;
    themes?: number[];
    dateFilter?: string | null;
    sortOrder?: 'desc' | 'asc';
  };
  setIsOpened: (val: boolean) => void;
}

export default function TrainingCards({ filter, setIsOpened }: TrainingCardsProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10); 
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>(filter.sortOrder || 'desc');
    const resSafeLength = (arr: any[]) => (Array.isArray(arr) ? arr.length : 0);
    const lang = window?.location?.pathname.startsWith('/fr/') ? 'fr' : 'en';
    const [themes, setThemes] = useState<number[]>(filter.themes || []);
    const [loading, setLoading] = useState<boolean>(true);
    const [itemsList, setItemsList] = useState<any[]>([]);
    
    

    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    function getPosts(query: any, page = currentPage, themes: number[]) {
        setLoading(true);
        axios.get(`/api/get-active-training/${limit}`, {
            params: { 
              query: query,
              themes: themes,
              page: page,
              sortOrder: sortOrder,
              dateFilter: filter.dateFilter,
            }
        }).then(res => {
            setItemsList(res.data.data);
            console.log(res.data.data)
            setTotalPages(res.data.last_page); 
            setLoading(false);
        }).catch(err => {
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
      getPosts(searchQuery, currentPage, filter?.themes || []);
    }, [searchQuery, currentPage, filter, sortOrder]);
  
    if (loading) return  <div className='flex justify-center sm:pt-40 w-full'> <Loader/> </div>;
  
    const startIndex = (currentPage - 1) * limit + 1;
    const endIndex = Math.min(currentPage * limit, resSafeLength(itemsList));
  
    return (
        <section className="flex-1">
        <div className='hidden sm:flex justify-between relative z-20'>
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
              <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                  <div className='text-primary'> <img src={sortIcon} className='size-6' /> </div>
                  <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">Trier</div>
                  <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? "-rotate-180" : ""}`}><ArrowDownIcon /></div>
                </div>
              </button>
            )}
          </ButtonDropdown>

          <div className="text-center text-black text-xl font-semibold font-['Montserrat'] leading-tight tracking-tight mt-[2px]">        {`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList.length)} de ${itemsList.length} Publications`}</div>
        </div>
        <div className='sm:hidden flex justify-between pr-5 relative z-20'>
          <button type='button' onClick={() => setIsOpened(true)} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
            <FilterIcon />
            <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
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
              <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                  <div className='text-primary'> <img src={sortIcon} className='size-6' /> </div>
                  <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">Trier</div>
                  <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? "-rotate-180" : ""}`}><ArrowDownIcon /></div>
                </div>
              </button>
            )}
          </ButtonDropdown>
        </div>
        <div className='sm:hidden px-5 font-semibold leading-[20px] pt-5'>        {`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList.length)} de ${itemsList.length} Publicaciones`}</div>
     
        <section className='flex flex-col gap-8 w-full relative z-10 my-5 sm:my-10 col-span-1'>

            <div className='grid sm:grid-cols-2 gap-4 px-4 sm:px-0'>
                {itemsList.map((training: any) =>(
                  <Link to={`/protected-air-marine-coastal-areas/training/${training.slug}`}>
                    <TrainingCard key={training.id} training={training} />

                  </Link>
                ))}
            </div>

            <div className='flex justify-center px-4 sm:px-0'><Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /></div>
        </section>
      </section>
    )
}
