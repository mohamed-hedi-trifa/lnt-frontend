import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import LeftSidebar from './LeftSidebar';
import NewsCards from './NewsCards';
import axios from "axios";
import SidebarFilters from '../who-are-we/our-achievements/SidebarFilters';
import { useTranslation } from '@/contexts/TranslationContext';

export default function AllNews() {
  const { lang } = useTranslation();
  const [themes, setThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isCustomDateRangeModified, setIsCustomDateRangeModified] = useState(false);




  useEffect(() => {
    document.querySelector("body")!.style.overflow = isOpened ? "hidden" : "visible";
  }, [isOpened]);

  useEffect(() => {
    axios.get('/api/theme').then((res) => setThemes(res.data)).finally(() => setThemesLoading(false));
  }, []);


  const [themesLoading, setThemesLoading] = useState(true);

  // ---- NEW: All‑themes + individual themes state ----
  const [selectedAllThemes, setSelectedAllThemes] = useState(true);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [isCustomDropdownOpen, setIsCustomDropdownOpen] = useState(false);



  const handleAllThemesChange = (checked: boolean) => {
    setSelectedAllThemes(checked);
    if (checked) {
      // deselect all individual themes
      setSelectedThemes([]);
    }
  };


  const handleThemeChange = (id: string, checked: boolean) => {
    // if user starts picking individual themes, clear "All Themes"
    if (checked && selectedAllThemes) {
      setSelectedAllThemes(false);
    }
    setSelectedThemes((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };


  const resetFilters = () => {
    setSelectedAllThemes(false);
    setSelectedThemes([]);
    setSelectedDateFilter(null);
    setSearchQuery('');
  };
  const [searchQuery, setSearchQuery] = useState('');
  const filters = {
    themes: selectedAllThemes ? [] : selectedThemes,
    dateFilter: selectedDateFilter,

    searchQuery,
  };

  return (
    <div className="mt-10 w-full">
      <div className="px-5">
        <HeaderSection headerName="Toutes les Actualités" />
      </div>
      <div className="flex flex-col sm:flex-row gap-5 mt-10">
        <SidebarFilters
          isSticky={false}
          lang={lang}
          themes={themes}
          themesLoading={themesLoading}

          // themes props
          selectedAllThemes={selectedAllThemes}
          handleAllThemesChange={handleAllThemesChange}
          selectedThemes={selectedThemes}
          handleThemeChange={handleThemeChange}
          showAllThemes={showAllThemes}
          setShowAllThemes={setShowAllThemes}

          // date props
          selectedDateFilter={selectedDateFilter}
          setSelectedDateFilter={setSelectedDateFilter}
          setIsCustomDropdownOpen={setIsCustomDropdownOpen}

          // common
          resetFilters={resetFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isOpened={isOpened}
          setIsOpened={setIsOpened}

        />
        <section className="flex-1">
          <NewsCards
            filter={filters}
            setIsOpened={setIsOpened}
          />
        </section>
      </div>
    </div>
  );
}
