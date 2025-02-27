import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ButtonDropdown from '@/components/ButtonDropdown';
import sortIcon from '@/assets/icons/sort-icon.png';
import FilterIcon from '@/assets/icons/FilterIcon';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import PreviousEditionSidebar from './PreviousEditionSidebar';
import PreviousEditionCard from './PreviousEditionCard';
import Pagination from '../../Pagination';

export default function DisplayEditionList() {
  const [edition, setEdition] = useState([]);
  const [prevEditions, setPrevEditions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('name'); // Default sort by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order ascending
  const [language, setLanguage] = useState('en'); // Default language is English
  const [filteredYears, setFilteredYears] = useState<number[]>([]); // State for filtered years
  const [isOpened, setIsOpened] = useState(false); // State for sidebar open/close

  // Fetch current edition
  const getEdition = async () => {
    try {
      const res = await axios.get('/api/get-current-edition');
      setEdition(res.data);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to fetch Edition', 'error');
    }
  };

  // Fetch previous editions with filters
  const getPrevEditions = async (page = 1) => {
    try {
      const res = await axios.get('/api/previous-editions-pagination', {
        params: {
          page: page,
          per_page: 10,
          sort_by: sortCriteria,
          order: sortOrder,
          language: language,
          years: filteredYears.join(','), // Pass filtered years to the API
        },
      });
      setPrevEditions(res.data.data);
      setTotalPages(res.data.last_page);
      setTotalItems(res.data.total);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to fetch Edition', 'error');
    }
  };

  // Handle page change for pagination
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      getPrevEditions(newPage);
    }
  };

  // Handle sorting criteria selection
  const handleSortChange = (item: { id: number; name: string }) => {
    if (item.name === 'Trier par Nom') {
      setSortCriteria('name');
    } else if (item.name === 'Trier par Date') {
      setSortCriteria('start_date');
    }
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    getEdition();
    getPrevEditions(currentPage);
  }, [sortCriteria, sortOrder, language, filteredYears, currentPage]);

  // Handle body overflow when sidebar is opened
  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'visible';
  }, [isOpened]);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {/* Sidebar for filters */}
        <PreviousEditionSidebar
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          filteredYears={filteredYears}
          setFilteredYears={setFilteredYears}
        />

        {/* Main content */}
        <section className="">
          {/* Sorting and pagination info */}
          <div className="hidden sm:flex justify-between relative z-20">
            {/* Sorting dropdown */}
            <ButtonDropdown
              items={[
                { id: 1, name: 'Trier par Nom' },
                { id: 2, name: 'Trier par Date' },
              ]}
              position="left"
              renderItem={(item) => (
                <div
                  className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSortChange(item)}
                >
                  {item.name}
                </div>
              )}
            >
              {(isOpen) => (
                <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                  <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                    <div className="text-primary">
                      <img src={sortIcon} className="size-6" />
                    </div>
                    <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">
                      Trier
                    </div>
                    <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? '-rotate-180' : ''}`}>
                      <ArrowDownIcon />
                    </div>
                  </div>
                </button>
              )}
            </ButtonDropdown>

            {/* Pagination info */}
            <div className="text-center text-black text-xl font-semibold font-['Montserrat'] leading-tight tracking-tight mt-[2px]">
              {currentPage * 10 - 9} - {Math.min(currentPage * 10, totalItems)} de {totalItems} Publications
            </div>
          </div>

          {/* Mobile: Sorting and filters */}
          <div className="sm:hidden flex justify-between pr-5 relative z-20">
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex"
            >
              <FilterIcon />
              <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
            </button>
            <ButtonDropdown
              items={[
                { id: 1, name: 'Trier par Nom' },
                { id: 2, name: 'Trier par Date' },
              ]}
              position="right"
              renderItem={(item) => (
                <div
                  className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSortChange(item)}
                >
                  {item.name}
                </div>
              )}
            >
              {(isOpen) => (
                <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                  <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                    <div className="text-primary">
                      <img src={sortIcon} className="size-6" />
                    </div>
                    <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">
                      Trier
                    </div>
                    <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? '-rotate-180' : ''}`}>
                      <ArrowDownIcon />
                    </div>
                  </div>
                </button>
              )}
            </ButtonDropdown>
          </div>

          {/* Mobile: Pagination info */}
          <div className="sm:hidden px-5 font-semibold leading-[20px] pt-5 sm:text-center text-start">
            {currentPage * 10 - 9} - {Math.min(currentPage * 10, totalItems)} de {totalItems} Publications
          </div>

          {/* List of previous editions */}
          <div className="sm:mx-0 mx-6">
            {prevEditions?.map((edition, index) => (
              <PreviousEditionCard
                key={index}
                date={`${edition.start_date} - ${edition.end_date}`}
                description={language === 'en' ? edition.card_description_en : edition.card_description_fr}
                titre={language === 'en' ? edition.name_en : edition.name_fr}
                lieu={language === 'en' ? edition.place_en : edition.place_fr}
                slug={edition.slug}
                year={edition.year}
              />
            ))}
          </div>

          {/* Pagination component */}
          <div className="flex justify-center px-4 sm:px-0 mt-5">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
}