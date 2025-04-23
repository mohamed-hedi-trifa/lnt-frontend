import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import LeftSidebar from './LeftSidebar';
import NewsCards from './NewsCards';
import axios from "axios";
import SidebarFilters from '../who-are-we/our-achievements/SidebarFilters';
import { useTranslation } from '@/contexts/TranslationContext';
import NewsImage from './NewsImage';
import newssImage from '../../../assets/images/news.jpg';
import PageTitle from '@/components/atoms/titles/PageTitle';
import PageParagraph from '@/components/atoms/PageParagraph';

export default function AllNewsFilter({ location, params }: { location: any; params: any }) {
  const { lang } = useTranslation();
  const [themes, setThemes] = useState([]);
  // params.slug ? [params.slug] : [] 
  const [selectedThemes, setSelectedThemes] = useState(params.id ? [parseInt(params.id)] : []);
  console.log(selectedThemes)

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
  const [selectedAllThemes, setSelectedAllThemes] = useState(params.id ? false: true );
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
    <main className="relative">
      {/* Overlay */}
      <div
        className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpened(false)}
      />

      <NewsImage
        imgSrc={newssImage}
        btnText="Evénement culturel"
        paragraph="Journées d'Échange Culturel à Kerkennah : Valorisation du Patrimoine Naturel et Culturel"
        date="LE 4 OCTOBRE 2024"
      />

      <section className="my-5 text-center sm:max-w-[1282px] max-w-7xl mx-auto mt-20 px-5">
        <PageTitle title="Actualités" />
        <PageParagraph fontWeight="font-semibold" spacing="leading-[1.4]">
          Découvrez toutes les actualités de l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL). À travers cette page, restez informé des dernières initiatives, des projets en cours, des événements marquants, et des actions menées pour préserver et valoriser le patrimoine naturel et culturel de l’archipel de Kerkennah. Que ce soit des actualités scientifiques, culturelles, ou associatives, chaque article reflète notre engagement envers un avenir durable et solidaire. Explorez, partagez, et plongez au cœur de nos réalisations et de nos ambitions.
        </PageParagraph>
      </section>

      <section className="my-5 max-w-7xl mx-auto mt-20">





        <div className="mt-10 w-full">
          <div className="">
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
      </section>
    </main>
  );
}
