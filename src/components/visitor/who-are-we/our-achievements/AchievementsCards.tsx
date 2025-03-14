import React, { useEffect, useState } from 'react'
import axios from "axios"
import AchievementCard from './AchievementCard'
import Pagination from '../../Pagination'
import ButtonDropdown from '@/components/ButtonDropdown';
import FilterIcon from '@/assets/icons/FilterIcon';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import sortIcon from "@/assets/icons/sort-icon.png"
import { Link } from 'gatsby';


export default function AchievementsCards({filter}:{filter?:{themes:number[]}}) {
  const lang = window?.location?.pathname.startsWith("/fr/") ? "fr" : "en";
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [themes, setThemes] = useState([]);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);

  function getPosts(query: any, page = currentPage, themes:number[]) {
    setLoading(true);
    axios.get(`/api/get-active-achievements/${limit ? limit : ""}`, {
      params: {
        query: query,
        themes: themes,
        page: page,
      }
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

  function getThemes(){
    axios.get('/api/theme').then(res=>{
      setThemes(res.data);
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    });
  }

  useEffect(()=>{
    getThemes();
  },[]);

  useEffect(() => {
    getPosts(searchQuery, currentPage, filter?.themes || []);
    console.log("fetching again")
  }, [searchQuery, currentPage, filter]);

  if (loading) return "Loading..."


  return (
    <div>
      <div className='hidden sm:flex justify-between relative z-20'>
        <ButtonDropdown
          items={themes}
          position="left"
          renderItem={(item) => (
            <div className='py-1 px-4'> {item[`name_${lang}`]}</div>
          )}
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

        <div className="text-center text-black text-xl font-semibold font-['Montserrat'] leading-tight tracking-tight mt-[2px]"> {`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList?.length)} de ${itemsList?.length} Publicaciones`}</div>
      </div>
      <div className='sm:hidden flex justify-between pr-5 relative z-20'>
        <button type='button' onClick={() => {}} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
          <FilterIcon />
          <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
        </button>
        <ButtonDropdown
          items={themes}
          position="right"
          renderItem={(item) => (
            <div className='py-1 px-4'> {item.name}</div>
          )}
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
      <div className='sm:hidden px-5 font-semibold leading-[20px] pt-5'>
        {`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList?.length)} de ${itemsList?.length} Publicaciones`}
      </div>
      <section className='flex flex-col gap-8 w-full relative z-10 my-5'>
        <div className='grid sm:grid-cols-2 gap-4'>
          {itemsList?.map((achievement: any) => (
            <Link key={achievement.id} to={`/who-are-we/our-achievements/${achievement.slug}`}>
              <AchievementCard key={achievement.id} achievement={achievement} />
            </Link>
          ))}
        </div>

        <div className='flex justify-center'><Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /></div>
      </section>
    </div>
  )
}
