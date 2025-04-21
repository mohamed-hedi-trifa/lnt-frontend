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
import FollowUsPreviousEdition from './FollowUsPreviousEdition';
import Question from '@/components/atoms/Question';
import { useTranslation } from '@/contexts/TranslationContext';

interface Edition {
  id: string;
  name_en: string;
  name_fr: string;
  start_date: string;
  end_date: string;
  card_description_en: string;
  card_description_fr: string;
  place_en: string;
  place_fr: string;
  slug: string;
  year: number;
  image: string;
}

export default function DisplayEditionList() {
  const { lang } = useTranslation();
  const [editions, setEditions] = useState<Edition[]>([]);
  const [prevEditions, setPrevEditions] = useState<Edition[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortCriteria, setSortCriteria] = useState<'name' | 'start_date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editionsLoading, setEditionsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAllEditions, setSelectedAllEditions] = useState(true);
  const [selectedEditions, setSelectedEditions] = useState<string[]>([]);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const formatDateRange = (startDate: string, endDate: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const isSameYear = start.getFullYear() === end.getFullYear();
    const isSameMonth = start.getMonth() === end.getMonth() && isSameYear;

    if (isSameMonth) {
      return `Du ${start.getDate()} au ${end.toLocaleDateString("fr-FR", options)}`;
    } else if (isSameYear) {
      return `Du ${start.getDate()} ${start.toLocaleDateString("fr-FR", { month: "long" })} au ${end.toLocaleDateString("fr-FR", options)}`;
    } else {
      return `Du ${start.toLocaleDateString("fr-FR", options)} au ${end.toLocaleDateString("fr-FR", options)}`;
    }
  };

  // Fetch all editions for sidebar filters
  useEffect(() => {
    const fetchEditions = async () => {
      try {
        const response = await axios.get('/api/previous-editions');
        setEditions(response.data);
      } catch (error) {
        console.error('Error fetching editions:', error);
      } finally {
        setEditionsLoading(false);
      }
    };
    
    fetchEditions();
  }, []);

  // Fetch paginated previous editions with filters
  const fetchPrevEditions = async (page = currentPage) => {
    try {
      const response = await axios.get('/api/previous-editions-pagination', {
        params: {
          searchQuery,
          page,
          editions: selectedAllEditions ? [] : selectedEditions,
          sortBy: sortCriteria,
          sortOrder,
        },
      });
      
      setPrevEditions(response.data.data);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (error) {
      Swal.fire('Error', 'Error fetching previous editions', 'error');
      console.error('Error fetching previous editions:', error);
    }
  };

  useEffect(() => {
    fetchPrevEditions();
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedAllEditions, selectedEditions, sortCriteria, sortOrder]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSortChange = (item: { id: number; name: string }) => {
    if (item.name === 'Trier par Nom') {
      setSortCriteria('name');
    } else if (item.name === 'Trier par Date') {
      setSortCriteria('start_date');
    }
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleAllEditionsChange = (checked: boolean) => {
    setSelectedAllEditions(checked);
    if (checked) {
      setSelectedEditions([]);
    }
  };

  const handleEditionChange = (id: string, checked: boolean) => {
    if (checked && selectedAllEditions) {
      setSelectedAllEditions(false);
    }
    setSelectedEditions(prev => 
      checked ? [...prev, id] : prev.filter(x => x !== id)
    );
  };

  const resetFilters = () => {
    setSelectedAllEditions(true);
    setSelectedEditions([]);
    setSearchQuery('');
    setSortCriteria('name');
    setSortOrder('asc');
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpened ? 'hidden' : 'visible';
  }, [isSidebarOpened]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-3 gap-6">
          <PreviousEditionSidebar
            isSticky={false}
            lang={lang}
            editions={editions}
            editionsLoading={editionsLoading}
            selectedAllEditions={selectedAllEditions}
            handleAllEditionsChange={handleAllEditionsChange}
            selectedEditions={selectedEditions}
            handleEditionChange={handleEditionChange}
            resetFilters={resetFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isOpened={isSidebarOpened}
            setIsOpened={setIsSidebarOpened}
          />
        </div>

        {/* Main Content */}
        <div className="md:col-span-6 flex flex-col gap-6">
          {/* Desktop Header */}
          <div className="hidden sm:flex justify-between items-center py-4">
            <ButtonDropdown
              items={[
                { id: 1, name: 'Trier par Nom' },
                { id: 2, name: 'Trier par Date' },
              ]}
              position="left"
              renderItem={(item) => (
                <div
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSortChange(item)}
                >
                  {item.name}
                </div>
              )}
            >
              {(isOpen) => (
                <button className="flex items-center gap-2 border-2 border-black rounded-lg px-4 py-2">
                  <img src={sortIcon} alt="Sort icon" className="w-6 h-6" />
                  <span className="text-black text-lg font-medium">Trier</span>
                  <div className={`transition-transform duration-200 ${isOpen ? '-rotate-180' : ''}`}>
                    <ArrowDownIcon />
                  </div>
                </button>
              )}
            </ButtonDropdown>
            <div className="text-black text-lg font-semibold">
              {Math.min((currentPage - 1) * 10 + 1, totalItems)} - {Math.min(currentPage * 10, totalItems)} of {totalItems} Publications
            </div>
          </div>

          {/* Mobile Header */}
          <div className="sm:hidden flex justify-between items-center z-20 sticky top-0 py-2">
            <button
              type="button"
              onClick={() => setIsSidebarOpened(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-lg rounded-br-lg px-4 py-2 shadow-lg"
            >
              <FilterIcon />
              <span className="text-white text-sm font-bold">Filtres</span>
            </button>
            <ButtonDropdown
              items={[
                { id: 1, name: 'Trier par Nom' },
                { id: 2, name: 'Trier par Date' },
              ]}
              position="right"
              renderItem={(item) => (
                <div
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSortChange(item)}
                >
                  {item.name}
                </div>
              )}
            >
              {(isOpen) => (
                <button className="flex items-center gap-2 border-2 border-black rounded-lg px-4 py-2 shadow-lg">
                  <img src={sortIcon} alt="Sort icon" className="w-6 h-6" />
                  <span className="text-black text-lg font-medium">Trier</span>
                  <div className={`transition-transform duration-200 ${isOpen ? '-rotate-180' : ''}`}>
                    <ArrowDownIcon />
                  </div>
                </button>
              )}
            </ButtonDropdown>
          </div>

          {/* Editions List */}
          <div className="grid grid-cols-1 gap-6">
            {prevEditions.map((edition, index) => (
              <PreviousEditionCard
                key={index}
                date={formatDateRange(edition.start_date, edition.end_date)}
                description={lang === 'en' ? edition.card_description_en : edition.card_description_fr}
                titre={lang === 'en' ? edition.name_en : edition.name_fr}
                lieu={lang === 'en' ? edition.place_en : edition.place_fr}
                slug={edition.slug}
                year={edition.year}
                image={edition.image}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center px-4 sm:px-0">
              <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                onPageChange={handlePageChange} 
              />
            </div>
          )}
        </div>

        {/* Complementary Column */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <FollowUsPreviousEdition />
          <Question />
        </div>
      </div>
    </div>
  );
}