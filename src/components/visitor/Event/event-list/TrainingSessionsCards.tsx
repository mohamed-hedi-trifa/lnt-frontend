import React, { useEffect, useState } from 'react'
import axios from "axios"
import Pagination from '../../Pagination';
import { Link } from 'gatsby';
import EventsCard from '../EventsCard';

export default function TrainingSessionsCards({ lang = "fr", eventTypeSlug }: { lang: string, eventTypeSlug: string }) {
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
    const [itemsList, setItemsList] = useState<any[]>([]);

    // Modify getEvents function to include eventTypeSlug in the API call
    function getEvents(query: string, page = currentPage, eventTypeSlug = eventTypeSlug) {
        setLoading(true);

        // Construct the parameters for the API request
        const params: any = { query, page, limit };

        // Ensure eventTypeSlug is passed to the API
        if (eventTypeSlug) {
            params.eventTypeSlug = eventTypeSlug; // Include eventTypeSlug if it's provided
        }

        console.log(params);  // Debugging log to check params

        // Send the GET request with the params
        axios.get("/api/get-active-events/10", { params })
            .then(res => {
                setItemsList(res.data.data);
                setTotalPages(res.data.last_page);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
                if (err.response && err.response.data.error) {
                    alert(err.response.data.error); 
                }
            });
    }

    useEffect(() => {
        if (eventTypeSlug) {
            getEvents(searchQuery, currentPage, eventTypeSlug);
        }
    }, [searchQuery, currentPage, eventTypeSlug]);

    if (loading) return "Loading...";

    return (
        <section className='flex flex-col gap-8 w-full relative z-10 my-5 sm:my-10 col-span-1'>
            <div className='grid sm:grid-cols-2 gap-4 px-4 sm:px-0'>
                {itemsList.map((event: any) => (
                    event.event_type_id == eventTypeSlug
                    ?
                    <EventsCard key={event.id} event={event} custunCss="px-3" lang={lang} />
                    : ""
                ))}
            </div>

            <div className='flex justify-center px-4 sm:px-0'>
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </section>
    );
}
