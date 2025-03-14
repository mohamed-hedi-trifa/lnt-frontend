import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AchievementCard from './AchievementCard';
import Pagination from '../../Pagination';
import ButtonDropdown from '@/components/ButtonDropdown';
import FilterIcon from '@/assets/icons/FilterIcon';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import sortIcon from '@/assets/icons/sort-icon.png';
import { Link } from 'gatsby';

interface AchievementsCardsProps {
  searchQuery: string;
  selectedThemes: number[];
  dateFilter: any;          // ou un type plus précis si vous préférez
  sortOrder: 'desc' | 'asc';
  setIsOpened: (val: boolean) => void; // pour ouvrir la sidebar en mobile
}

export default function AchievementsCards({
  searchQuery,
  selectedThemes,
  dateFilter,
  sortOrder,
  setIsOpened,
}: AchievementsCardsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(10); // Limite d'éléments par page
  const [loading, setLoading] = useState<boolean>(true);
  const [itemsList, setItemsList] = useState<any[]>([]);

  // Définir la fonction de tri ici (en fonction de la date)
  function sortByDate(data: any[], order: 'desc' | 'asc'): any[] {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return order === 'desc'
        ? dateB - dateA // le plus récent en premier
        : dateA - dateB; // le plus ancien en premier
    });
    return sortedData;
  }

  // Petit helper pour éviter les erreurs si le tableau est undefined
  const resSafeLength = (arr: any[]) => (Array.isArray(arr) ? arr.length : 0);

  // Récupérer les achievements depuis le backend
  const getAchievements = (page: number) => {
    setLoading(true);

    axios
      .get(`/api/get-active-achievements/${limit}`, {
        params: {
          query: searchQuery,
          page,
          themes: selectedThemes,
          dateFilter,
          sortOrder,
        },
      })
      .then((res) => {
        // data brute reçue du backend
        const data = res.data.data || [];

        // trier localement par date, selon sortOrder
        const sortedData = sortByDate(data, sortOrder);

        setItemsList(sortedData);
        setTotalPages(res.data.last_page || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching achievements:', err);
        setLoading(false);
      });
  };

  // Chaque fois que la page ou un filtre change, on recharge les données
  useEffect(() => {
    getAchievements(currentPage);
  }, [searchQuery, selectedThemes, dateFilter, sortOrder, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Indices pour l'affichage "X - Y de ..."
  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, resSafeLength(itemsList));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Barre du haut (version desktop) pour le tri */}
      <div className="hidden sm:flex justify-between relative z-20">
        {/* Dropdown de tri (exemple minimaliste) */}
        <ButtonDropdown
          items={[
            { key: 'desc', name: 'Les plus récents' },
            { key: 'asc', name: 'Les plus anciens' },
          ]}
          position="left"
          onSelect={(item) => {
            // Ici, vous pouvez gérer le changement du sortOrder
            // en le remontant au parent. Exemple:
            // setSortOrder(item.key as 'desc' | 'asc');
            console.log('Selected sort:', item);
          }}
          renderItem={(item) => (
            <div className="py-1 px-4 cursor-pointer">{item.name}</div>
          )}
        >
          {(isOpen) => (
            <button className="h-12 rounded-[10px] border-2 border-black flex items-center">
              <div className="px-2 py-1.5 flex items-center gap-2">
                <img src={sortIcon} className="size-6" alt="Sort Icon" />
                <div className="text-black text-xl font-medium font-['Montserrat']">
                  Trier
                </div>
                <div
                  className={`w-6 h-6 transition duration-200 ${
                    isOpen ? '-rotate-180' : ''
                  }`}
                >
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>

        <div className="text-black text-xl font-semibold font-['Montserrat'] mt-[2px]">
          {` ${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList.length)} de ${itemsList.length} Réalisations`}
        </div>
      </div>

      {/* Barre du haut (version mobile) */}
      <div className="sm:hidden flex justify-between pr-5 relative z-20">
        {/* Bouton pour ouvrir la sidebar de filtres (mobile) */}
        <button
          type="button"
          onClick={() => setIsOpened(true)}
          className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl flex items-center gap-2.5"
        >
          <FilterIcon />
          <div className="text-white text-sm font-bold font-['Montserrat']">
            Filtres
          </div>
        </button>

        {/* Dropdown de tri (mobile) */}
        <ButtonDropdown
          items={[
            { key: 'desc', name: 'Les plus récents' },
            { key: 'asc', name: 'Les plus anciens' },
          ]}
          position="right"
          onSelect={(item) => {
            // Gérer le changement du sortOrder
            // setSortOrder(item.key as 'desc' | 'asc');
            console.log('Selected sort:', item);
          }}
          renderItem={(item) => (
            <div className="py-1 px-4 cursor-pointer">{item.name}</div>
          )}
        >
          {(isOpen) => (
            <button className="h-12 rounded-[10px] border-2 border-black flex items-center">
              <div className="px-2 py-1.5 flex items-center gap-2">
                <img src={sortIcon} className="size-6" alt="Sort Icon" />
                <div className="text-black text-xl font-medium font-['Montserrat']">
                  Trier
                </div>
                <div
                  className={`w-6 h-6 transition duration-200 ${
                    isOpen ? '-rotate-180' : ''
                  }`}
                >
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>
      </div>

      {/* Info text sur mobile */}
      <div className="sm:hidden px-5 font-semibold pt-5">
        {`${startIndex} - ${endIndex} de ??? réalisations`}
      </div>

      {/* Grille de cartes */}
      <section className="flex flex-col gap-8 w-full relative z-10 my-5">
        <div className="grid sm:grid-cols-2 gap-4">

          {itemsList.map((achievement: any) => (
              <Link key={achievement.id} to={`/who-are-we/our-achievements/${achievement.slug}`}>
                <AchievementCard key={achievement.id} achievement={achievement} />
              </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
}
