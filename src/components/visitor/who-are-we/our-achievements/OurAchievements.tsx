import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Composants/ICônes
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import FilterTitle from '../../posts/FilterTitle';
import Checkbox from '../../posts/Checkbox';
import ButtonDropdown from '@/components/ButtonDropdown';
import DateRangeSelector from './DateRangeSelector';
import AchievementsCards from './AchievementsCards';
import Sidebar from '../../../layout/Sidebar';

import HeroSection from '../../HeroSection';
import achievementsHero from '../../../../assets/images/achievements-hero.jpg';
import PageTitle from '../../../atoms/titles/PageTitle';
import PageParagraph from '../../../atoms/PageParagraph';
import PageBody from '@/components/PageBody';
import NewsLetterSub2 from '@/components/NewsLetterSub2';
import Line from '@/components/atoms/Line';
import FilterIcon from '@/assets/icons/FilterIcon';
import FacebookIcon from '@/assets/icons/FacebookIcon';
import XIcon from '@/assets/icons/XIcon';
import InstagramIcon from '@/assets/icons/InstagramIcon';
import YoutubeIcon from '@/assets/icons/YoutubeIcon';
import LinkedinIcon from '@/assets/icons/LinkedinIcon';
import Button from '@/components/atoms/Button';
import ImageHistoire from '../our-team/ImageHistoire';
import { Link } from 'gatsby';

export default function OurAchievements() {
  // État pour la sidebar mobile
  const [isOpened, setIsOpened] = useState(false);

  // États pour la recherche et le tri
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Thèmes (récupérés via /api/theme)
  const [allThemes, setAllThemes] = useState<any[]>([]);
  // Achievements (récupérés via /api/achievements)
  const [allAchievements, setAllAchievements] = useState<any[]>([]);

  // Thèmes sélectionnés
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);

  // Affichage de la liste de thèmes : 6 par défaut, puis +10
  const [visibleCount, setVisibleCount] = useState(6);

  // Récupération des thèmes et achievements au montage
  useEffect(() => {
    // 1) Récupération de la liste de tous les thèmes
    axios
      .get('/api/theme')
      .then((res) => {
        // Suppose qu'on reçoit : [ {id, name_fr, name_en, slug}, ... ]
        setAllThemes(res.data || []);
      })
      .catch((err) => console.error('Erreur fetch thèmes:', err));

    // 2) Récupération de la liste de tous les achievements
    axios
      .get('/api/achievements')
      .then((res) => {
        // Suppose qu'on reçoit : [ {id, slug, themes: [{id, name_fr}, ...]}, ... ]
        setAllAchievements(res.data || []);
      })
      .catch((err) => console.error('Erreur fetch achievements:', err));
  }, []);

  // Empêcher le scroll si la sidebar est ouverte
  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'visible';
  }, [isOpened]);

  // -------------------------------
  // Calcul du nombre d'achievements par thème (local)
  // -------------------------------
  const themesWithCount = allThemes.map((theme) => {
    const count = allAchievements.reduce((acc, achievement) => {
      // On vérifie si l'achievement contient ce thème
      const hasTheme = achievement.themes?.some((t: any) => t.id === theme.id);
      return hasTheme ? acc + 1 : acc;
    }, 0);

    return { ...theme, achievements_count: count };
  });

  // Total achievements si on coche "Tous les Thèmes"
  const totalAchievementsCount = themesWithCount.reduce(
    (acc, t) => acc + t.achievements_count,
    0
  );

  // On limite l'affichage des thèmes (par défaut 6, puis +10)
  const displayedThemes = themesWithCount.slice(0, visibleCount);
  const hiddenCount = themesWithCount.length - visibleCount;

  // Case "Tous les Thèmes" = sélection de tous
  const isAllSelected =
    selectedThemes.length === themesWithCount.length && themesWithCount.length > 0;

  const handleToggleAllThemes = () => {
    if (isAllSelected) {
      setSelectedThemes([]);
    } else {
      // On sélectionne tous les IDs
      const allIds = themesWithCount.map((theme) => theme.id);
      setSelectedThemes(allIds);
    }
  };

  const handleToggleTheme = (themeId: number) => {
    setSelectedThemes((prev) => {
      if (prev.includes(themeId)) {
        // Retire
        return prev.filter((id) => id !== themeId);
      }
      // Ajoute
      return [...prev, themeId];
    });
  };

  // Barre latérale gauche (filtres)
  const LeftSidebar = () => (
    <aside
      className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition-transform duration-300 lg:translate-x-0 ${
        isOpened ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div
        className="pointer-events-auto bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto h-full"
        style={{
          boxShadow:
            '0px -8px 80px rgba(0,0,0,0.07), 0px -2.92px 29.2px rgba(0,0,0,0.05)',
        }}
      >
        {/* Recherche */}
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input
            type="text"
            placeholder="Recherche"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Section Thèmes */}
        <div className="flex flex-col gap-5">
          <FilterTitle title="Thèmes" />

          <div className="flex flex-col gap-3">
            {/* Tous les Thèmes */}
            <Checkbox
              label="Tous les Thèmes"
              nb={String(totalAchievementsCount)}
              checked={isAllSelected}
              onChange={handleToggleAllThemes}
            />

            {/* Liste des thèmes */}
            {displayedThemes.map((theme) => (
              <Checkbox
                key={theme.id}
                label={theme.name_fr || theme.name_en}
                nb={String(theme.achievements_count)}
                checked={selectedThemes.includes(theme.id)}
                onChange={() => handleToggleTheme(theme.id)}
              />
            ))}

            {/* Bouton “+ Afficher X de plus” si plus de 6 thèmes */}
            {themesWithCount.length > 6 && (
              <div className="mt-2">
                {visibleCount < themesWithCount.length ? (
                  <button
                    className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit font-medium"
                    onClick={() => {
                      setVisibleCount((prev) => prev + 10);
                    }}
                  >
                    + Afficher {Math.min(hiddenCount, 10)} de plus
                  </button>
                ) : (
                  <button
                    className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit font-medium"
                    onClick={() => setVisibleCount(6)}
                  >
                    Afficher moins
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Filtres Date (exemple) */}
        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Date" />
          <div className="flex flex-col gap-3">
            <Checkbox label="Aujourd'hui" />
            <Checkbox label="Cette Semaine" />
            <Checkbox label="Ce Mois" />
            <Checkbox label="Cette Année" />

            <ButtonDropdown
              item={<DateRangeSelector />}
              position="left"
              renderItem={(item) => <div className="py-1">{item.name}</div>}
            >
              {(isOpen) => <Checkbox label="Configurer" />}
            </ButtonDropdown>
          </div>
        </div>

        {/* Actions : Appliquer / Réinitialiser */}
        <div className="flex justify-between">
          <button
            className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold"
            onClick={() => setIsOpened(false)}
          >
            Appliquer
          </button>
          <button
            className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]"
            onClick={() => {
              // Reset
              setSearchTerm('');
              setSelectedThemes([]);
              setDateFilter(null);
              setVisibleCount(6);
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  );

  // Barre latérale droite (Réseaux sociaux / Newsletter)
  const RightSidebar = () => (
    <aside className="flex flex-col gap-6 sm:sticky top-[116px] h-fit px-5">
      <div className="text-[#183354] text-xl font-bold leading-relaxed">Suivez-nous</div>
      <Line />
      <div className='grid grid-cols-2 gap-1'>
            <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
              <div className='text-black'><FacebookIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">facebook</div>
            </Link>
            <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
              <div className='text-black'><XIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">X</div>
            </Link>
            <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
              <div className='text-black'><InstagramIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Instagram</div>
            </Link>
            <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
              <div className='text-black'><YoutubeIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Youtube</div>
            </Link>
            <Link to='#' className="w-full sm:w-[147px] h-[44.50px] px-[31px] py-2.5 bg-[#e8f1f1] rounded-md shadow-xl justify-start items-center gap-[15px] inline-flex">
              <div className='text-black'><LinkedinIcon /></div>
              <div className="w-[72px] h-6 text-[#183354] text-sm font-medium font-['Montserrat'] capitalize leading-normal">Linkedin</div>
            </Link>
          </div>

      <NewsLetterSub2
        title="Ne manquez rien !"
        paragraph="Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles sur nos réalisations et projets directement dans votre boîte mail"
      />

      <div className="h-[279.40px] flex-col justify-center gap-[25px] flex">
        <div className="text-[#183354] text-xl font-bold leading-relaxed">Une Question ?</div>
        <Line />
        <div className="w-[300px] text-black text-[15px] font-bold leading-normal">
          Besoin de plus d'informations ? N'hésitez pas à nous contacter. Cliquez sur le Bouton
          ci-dessous pour accéder à notre page de contact et poser vos questions.
        </div>
        <Button variant="primary" customClassnames="mx-auto">
          <div className="text-white text-xl font-bold">Contactez-Nous</div>
        </Button>
      </div>
    </aside>
  );

  return (
    <main className="relative">
      {/* Overlay mobile (quand la sidebar est ouverte) */}
      <div
        className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${
          isOpened ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpened(false)}
      />

      {/* Hero Section */}
      <HeroSection
        imgSrc={achievementsHero}
        title="Nos Actions, Notre Impact"
        subTitle={
          <div>
            <div>Découvrez les projets qui transforment Kerkennah :</div> des initiatives locales qui
            protègent, valorisent et inspirent
          </div>
        }
      />

      {/* Page Title */}
      <PageTitle title="Our Achievements" />

      <PageBody>
        <section className="w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10">
          {/* If your layout's <Sidebar/> is needed, keep it. Otherwise remove */}
          <Sidebar />
          <section className="w-fit flex flex-col gap-4">
            <PageParagraph>
              Depuis sa création, l’Association Kratten du Développement Durable de la Culture et
              du Loisir (AKDDCL) s'engage activement pour la préservation de l'archipel de
              Kerkennah, en alliant le développement durable, la protection de l’environnement et
              la valorisation de la culture locale. Nous menons des initiatives variées, allant du
              soutien aux pratiques de pêche durable aux projets éducatifs et culturels, afin de
              créer un impact positif et pérenne pour notre communauté. Nos actions, qu’il
              s’agisse d’ateliers de transmission des savoir-faire traditionnels, de festivals
              célébrant le patrimoine ou de programmes de sensibilisation aux enjeux écologiques,
              contribuent à renforcer l’identité et l’autonomie économique de notre île.
            </PageParagraph>
            <PageParagraph>
              Chaque projet est réalisé en étroite collaboration avec nos partenaires locaux et
              internationaux, ainsi qu’avec la communauté, qui est au cœur de notre démarche. De
              plus, nous honorons les anciens membres fondateurs dont la vision et le dévouement
              ont permis d’établir les bases de cette mission essentielle. Leur héritage continue
              de guider nos actions, garantissant ainsi la pérennité et le dynamisme de Kerkennah
              pour les générations futures.
            </PageParagraph>
          </section>
        </section>
      </PageBody>


      <section className="max-w-[1400px] mx-auto">
        <hr className="my-6 border-black" />

        <section className="flex flex-col sm:flex-row gap-5">
          {/* Barre latérale gauche (filtres) */}
          <LeftSidebar />

          {/* Contenu principal : AchievementsCards */}
          <section className="flex-1">
            <AchievementsCards
              searchQuery={searchTerm}
              selectedThemes={selectedThemes}
              dateFilter={dateFilter}
              sortOrder={sortOrder}
              setIsOpened={setIsOpened}
            />
          </section>

          {/* Barre latérale droite */}
          <RightSidebar />
        </section>
      </section>

      <section className="max-w-6xl mx-auto my-10">
        <hr className="border-black" />
        <section className="flex items-start justify-center mb-20 mt-10">
          <div className="w-full flex items-center justify-center">
            <ImageHistoire />
          </div>
        </section>
      </section>
    </main>
  );
}
