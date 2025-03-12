import React, { useEffect, useState } from 'react'

import axios from "axios"
import NewCard from './NewsCard';
import Pagination from '../Pagination';
import NewsCard from './NewsCard';
import { Link } from 'gatsby';
import recentArticle1 from '../../../assets/images/recentArticle1.jpg'
import recentArticle2 from '../../../assets/images/recentArticle2.jpg'
import ButtonDropdown from '@/components/ButtonDropdown'
import sortIcon from "@/assets/icons/sort-icon.png"
import FilterIcon from '@/assets/icons/FilterIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'

export default function NewsCards() {
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
    const [itemsList, setItemsList] = useState([]);

    function getNews(query: any, page = currentPage) {
        setLoading(true);
        axios.get(`/api/get-active-news/${limit ? limit : ""}`, {
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
        getNews(searchQuery, currentPage);
    }, [searchQuery, currentPage]);

    if (loading) return "Loading..."
    const lang = typeof window !== 'undefined' && location?.pathname.startsWith("/fr/") ? "fr" : "en";

    const CATEGORIES = [
        {
            id: 1,
            name: "All themes"
        },
        {
            id: 2,
            name: "Conservation Marine"
        },
        {
            id: 3,
            name: "Tourisme Responsable"
        },
        {
            id: 4,
            name: "Peche Durable"
        },
        {
            id: 5,
            name: "Ecologie et Environmenet"
        },
        {
            id: 6,
            name: "Education et Formation"
        }
    ]
    return (
        <div>
            <div className='hidden sm:flex justify-between relative z-20'>
                <ButtonDropdown
                    items={CATEGORIES}
                    position="left"
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

                <div className=" text-black text-xl font-semibold font-['Montserrat'] leading-tight tracking-tight mt-[2px]"> {`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList.length)} de ${itemsList.length} Publicaciones`}</div>
            </div>
            <div className='sm:hidden flex justify-between pr-5 relative z-20'>
                <button type='button' onClick={() => setIsOpened(true)} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
                    <FilterIcon />
                    <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
                </button>
                <ButtonDropdown
                    items={CATEGORIES}
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
            <div className='sm:hidden px-5 font-semibold leading-[20px] pt-5 text-start'>{`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList.length)} de ${itemsList.length} Publicaciones`}</div>
            <section className='flex flex-col gap-8 w-full relative z-10 my-5 sm:my-10 col-span-1'>

                <div className='grid sm:grid-cols-2 gap-4 px-4 sm:px-0'>
                    {itemsList.map((article: any) => (
                        <Link key={article.id} to={`/news/${article.slug}`}>
                            <NewsCard article={article} />
                        </Link>
                    ))}
                </div>

                <div className='flex justify-center px-4 sm:px-0'><Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /></div>
            </section>
        </div>
    )
}
