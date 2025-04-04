import { InboxIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import ReactLoading from "react-loading";
import Post from './Post';
import Swal from 'sweetalert2';

export default function Posts({ limit, searchQuery, currentPage, setTotalPages, gridCols }: { gridCols: string, setTotalPages: (nb: number) => void, currentPage: number, limit: number, searchQuery: string }) {
    const [loading, setLoading] = useState(true);
    const [itemsList, setItemsList] = useState([]);

    function getPosts(query: any, page = currentPage) {
        setLoading(true);
        axios.get(`/api/get-active-posts/${limit ? limit : ""}`, {
            params: { query, page }
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
        getPosts(searchQuery, currentPage);
    }, [searchQuery, currentPage]);

    if (loading) {
        return   "Loading...";
    }

    return (
        <div className='py-10'>
            {itemsList?.length > 0 ?
                <>
                    <div className={`grid gap-4 ${gridCols || ""}`}>
                        {itemsList.map((item: any) => (
                            <Post key={item.id} post={item} />
                        ))}
                    </div>
                </>
                :
                <div className="flex flex-col gap-4 items-center justify-center text-center h-[25vh]">
                    <InboxIcon className="block h-20 w-20" aria-hidden="true" />
                    <h3 className='text-2xl font-bold'>{searchQuery ? "No results found for your search. Try using different keywords or check back later!" : "It seems we don't have any blog posts yet. Stay tuned for updates or check back soon!"}</h3>
                </div>
            }
        </div>
    );
}
