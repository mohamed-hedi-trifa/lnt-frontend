import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import Posts from './Posts';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function BlogPageCmp({ lang }: { lang: string }) {
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

    return (
        <div className='min-h-[calc(100vh-80px)] px-8 mx-auto pt-[20px] flex flex-col justify-between'>
            <div>

                <div className='flex items-center'>
                    <div className='relative'>
                        <Input
                            name="search"
                            placeholder="Search Blog Posts"
                            customClassName="shadow-xl border-2 border-gray-300"
                            onChange={handleSearchChange}
                            value={searchQuery}
                        />
                        <div className='absolute top-0 right-[4px] h-full'>
                            <div className='flex items-center h-full mt-[-2px]'>
                                <MagnifyingGlassIcon className='text-gray-400 h-6 w-6' />
                            </div>
                        </div>
                    </div>
                </div>
                <Posts
                    searchQuery={searchQuery}
                    currentPage={currentPage}
                    setTotalPages={setTotalPages}
                    limit={limit}
                    gridCols="grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"
                />
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center my-4">
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span className="mx-2">{currentPage} of {totalPages}</span>
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

