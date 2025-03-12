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
import QuestionEvent from '../../Event/QuestionEvent';

export default function DisplayEditionList() {
  const [edition, setEdition] = useState([]);
  const [prevEditions, setPrevEditions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('name'); // Tri par défaut sur le nom
  const [sortOrder, setSortOrder] = useState('asc'); // Ordre croissant par défaut
  const [language, setLanguage] = useState('en'); // Langue par défaut
  const [filteredYears, setFilteredYears] = useState<number[]>([]); // Années filtrées
  const [isSidebarOpened, setIsSidebarOpened] = useState(false); // État d'ouverture de la sidebar

  // Récupération de l'édition courante
  const getEdition = async () => {
    try {
      const res = await axios.get('/api/get-current-edition');
      setEdition(res.data);
    } catch (err: any) {
      Swal.fire('Error', err.response?.data?.message || 'Erreur lors de la récupération de l\'édition', 'error');
    }
  };

  // Récupération des éditions précédentes avec filtres
  const getPrevEditions = async (page = 1) => {
    try {
      const res = await axios.get('/api/previous-editions-pagination', {
        params: {
          page,
          per_page: 10,
          sort_by: sortCriteria,
          order: sortOrder,
          language,
          years: filteredYears.join(','),
        },
      });
      setPrevEditions(res.data.data);
      setTotalPages(res.data.last_page);
      setTotalItems(res.data.total);
    } catch (err: any) {
      Swal.fire('Error', err.response?.data?.message || 'Erreur lors de la récupération des éditions', 'error');
    }
  };

  // Gestion du changement de page
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      getPrevEditions(newPage);
    }
  };

  // Gestion du tri
  const handleSortChange = (item: { id: number; name: string }) => {
    if (item.name === 'Trier par Nom') {
      setSortCriteria('name');
    } else if (item.name === 'Trier par Date') {
      setSortCriteria('start_date');
    }
    // Inverse l'ordre à chaque clic
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Chargement initial et lors des changements de filtres/tri
  useEffect(() => {
    getEdition();
    getPrevEditions(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCriteria, sortOrder, language, filteredYears, currentPage]);

  // Gestion du débordement lors de l'ouverture de la sidebar
  useEffect(() => {
    document.body.style.overflow = isSidebarOpened ? 'hidden' : 'visible';
  }, [isSidebarOpened]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-3 gap-6">
          <PreviousEditionSidebar
            isOpened={isSidebarOpened}
            setIsOpened={setIsSidebarOpened}
            filteredYears={filteredYears}
            setFilteredYears={setFilteredYears}
          />
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-6 flex flex-col gap-6">
          {/* En-tête Desktop */}
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
                  <img src={sortIcon} alt="Icône de tri" className="w-6 h-6" />
                  <span className="text-black text-lg font-medium">Trier</span>
                  <div className={`transition-transform duration-200 ${isOpen ? '-rotate-180' : ''}`}>
                    <ArrowDownIcon />
                  </div>
                </button>
              )}
            </ButtonDropdown>
            <div className="text-black text-lg font-semibold">
              {currentPage * 10 - 9} - {Math.min(currentPage * 10, totalItems)} de {totalItems} Publications
            </div>
          </div>

          {/* En-tête Mobile */}
          <div className="sm:hidden flex justify-between items-center z-20 sticky top-0  py-2">
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
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer "
                  onClick={() => handleSortChange(item)}
                >
                  {item.name}
                </div>
              )}
            >
              {(isOpen) => (
                <button className="flex items-center gap-2 border-2 border-black rounded-lg px-4 py-2 shadow-lg">
                  <img src={sortIcon} alt="Icône de tri" className="w-6 h-6" />
                  <span className="text-black text-lg font-medium">Trier</span>
                  <div className={`transition-transform duration-200 ${isOpen ? '-rotate-180' : ''}`}>
                    <ArrowDownIcon />
                  </div>
                </button>
              )}
            </ButtonDropdown>
          </div>

          {/* Liste des éditions */}
          <div className="grid grid-cols-1 gap-6">
            {prevEditions?.map((edition, index) => (
              <PreviousEditionCard
                key={index}
                date={`${edition.start_date} - ${edition.end_date}`}
                description={language === 'en' ? edition.card_description_en : edition.card_description_fr}
                titre={language === 'en' ? edition.name_en : edition.name_fr}
                lieu={language === 'en' ? edition.place_en : edition.place_fr}
                slug={edition.slug}
                year={edition.year}
                image={edition.image}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center py-6">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>

        {/* Colonne complémentaire */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <FollowUsPreviousEdition />
          <QuestionEvent />
        </div>
      </div>
    </div>
  );
}
