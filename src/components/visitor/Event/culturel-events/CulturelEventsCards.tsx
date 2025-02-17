import React, { useEffect, useState } from 'react'

import axios from "axios"
import Pagination from '../../Pagination';

import { Link } from 'gatsby';
import recentArticle1 from '../../../../assets/images/recentArticle2.jpg'
import recentArticle2 from '../../../../assets/images/recentArticle2.jpg'
import NewsCard from '../../news/NewsCard';
import EventsCard from '../EventsCard';

export default function EventsCards() {
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

    if (loading) return "Loading..."
    const lang = typeof window !== 'undefined' && location?.pathname.startsWith("/fr/") ? "fr" : "en";
    return (
        <section className='flex flex-col gap-8 w-full relative z-10 my-5 sm:my-10 col-span-1'>

            <div className='grid sm:grid-cols-2 gap-4 px-4 sm:px-0'>
                {/* {itemsList.map((achievement:any)=><NewCard key={achievement.id} post={achievement} />)} */}

                <Link to={`/event/category1?lang=${lang}`} >
                    <EventsCard image={recentArticle1} custunCss="px-3"  title="Formation sur les fondamentaux de la gestion des aires marines protégées (MPA) organisée par MedPAN en Turquie" />
                </Link>

                <Link to={`/event/category2?lang=${lang}`} >
                    <EventsCard image={recentArticle2} custunCss="px-3"   title="Lancement d'une initiative scientifique pour protéger les tortues marines à Kerkennah" />
                </Link>
                <Link to={`/event/category3?lang=${lang}`} >


                    <EventsCard image={recentArticle1} custunCss="px-3"   title="Formation sur les fondamentaux de la gestion des aires marines protégées (MPA) organisée par MedPAN en Turquie" />

                </Link>
                <Link to={`/event/${"category4"}?lang=${lang}`} >
                    <EventsCard image={recentArticle2} custunCss="px-3"   title="Lancement d'une initiative scientifique pour protéger les tortues marines à Kerkennah" />
                </Link>
            </div>

            <div className='flex justify-center px-4 sm:px-0'><Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /></div>
        </section>
    )
}
