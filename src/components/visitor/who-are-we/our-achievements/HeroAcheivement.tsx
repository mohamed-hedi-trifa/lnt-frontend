import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/autoplay';    

type Achievement = {
  id: number;
  slug: string;
  date: string;         // ex: "2023-06-10"
  image: string;        // URL de l'image (ou chemin)
  title_fr?: string;
  title_en?: string;
  themes?: Array<{
    id: number;
    name_fr?: string;
    name_en?: string;
  }>;
};

// Format de la date
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Pour convertir la liste des thèmes en texte
function getThemeLabels(themes?: Array<{id: number; name_fr?: string; name_en?: string;}>) {
  if (!themes) return '';
  return themes
    .map((t) => t.name_fr || t.name_en)
    .filter(Boolean)
    .join(' • ');
}

export default function HeroAcheivement() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // 1) Récupère tous les achievements
    fetch('/api/achievements')
      .then((res) => res.json())
      .then((data: Achievement[]) => {
        if (!data) return;
        // 2) Trie par date DESC
        const sorted = [...data].sort((a, b) => {
          // date b - date a pour tri descendant
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        // 3) Garde seulement les 4 premiers
        const latest4 = sorted.slice(0, 4);
        setAchievements(latest4);
      })
      .catch((err) => {
        console.error('Erreur de fetch achievements:', err);
      });
  }, []);

  // S’il n’y a rien (encore en chargement ou pas de data)
  if (achievements.length === 0) {
    return (
      <div className="relative w-full h-[50vh] sm:h-[80vh] bg-gray-200 flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] sm:h-[80vh] overflow-hidden">
      <Swiper
        // modules
        modules={[Navigation, Autoplay]}
        // props
        navigation // flèches "précédent/suivant"
        autoplay={{ delay: 5000, disableOnInteraction: false }} // slider auto
        loop={true}
        className="w-full h-full"
      >
        {achievements.map((achievement) => {
          const themeText = getThemeLabels(achievement.themes);
          return (
            <SwiperSlide key={achievement.id}>
              {/* Chaque slide est en "relative" pour superposer overlay + texte */}
              <div className="relative w-full h-[50vh] sm:h-[80vh]">
                {/* Image de fond */}
                <img
                  src={achievement.image}
                  alt={achievement.title_fr || achievement.title_en || 'Achievement'}
                  className="w-full h-full object-cover"
                />

                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />

                {/* Contenu (texte) */}
                <div className="absolute left-[20px] bottom-[20px] right-[60px] sm:bottom-[100px] sm:left-[40px] text-white max-w-2xl flex flex-col gap-2 sm:gap-4">
                  <div className="text-xl sm:text-[44px] sm:leading-tight font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {achievement.title_fr || achievement.title_en}
                  </div>

                  {themeText && (
                    <div className="sm:text-2xl font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {themeText}
                    </div>
                  )}

                  <div className="sm:text-xl font-normal drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {formatDate(achievement.date)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
