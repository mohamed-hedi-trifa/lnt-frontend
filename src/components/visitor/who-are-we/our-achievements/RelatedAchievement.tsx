import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderSection from '@/components/atoms/HeaderSection';
import CardRelatedAchievements from './CardRelatedAchievements';

// Pour formater la date si besoin
function formatDate(dateStr: string) {
  // Adaptez le format
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface ThemeType {
  id: number;
  name_fr?: string;
  name_en?: string;
}

interface AchievementType {
  id: number;
  slug: string;
  date: string;
  image: string;
  title_fr?: string;
  title_en?: string;
  themes?: ThemeType[];
}

// Props : on reçoit la réalisation courante
export default function RelatedAchievement({ currentAchievement }: { currentAchievement: AchievementType | null }) {
  const [relatedList, setRelatedList] = useState<AchievementType[]>([]);

  useEffect(() => {
    // Si pas encore de data, on ne fait rien
    if (!currentAchievement) return;

    // Récupérer toutes les achievements
    axios
      .get<AchievementType[]>('/api/achievements')
      .then((res) => {
        const allAchievements = res.data || [];

        // Récupère la liste d'IDs de thèmes du current
        const currentThemeIds = currentAchievement.themes?.map((t) => t.id) || [];

        // Filtrer celles qui partagent au moins un thème
        const filtered = allAchievements.filter((ach) => {
          if (ach.id === currentAchievement.id) return false; // exclude itself

          // Au moins un thème commun ?
          const achThemeIds = ach.themes?.map((t) => t.id) || [];
          // test d'intersection
          const intersection = achThemeIds.filter((id) => currentThemeIds.includes(id));
          return intersection.length > 0; // s'il y a au moins 1 ID commun
        });

        // On ne garde que 4 max
        const max4 = filtered.slice(0, 4);

        setRelatedList(max4);
      })
      .catch((err) => console.error('Error fetching achievements for related:', err));
  }, [currentAchievement]);

  // Si aucune Achievement connexe, on n'affiche rien ou on affiche un message
  if (relatedList.length === 0) return null;

  return (
    <div>
      <HeaderSection headerName="Réalisations Connexes" />
      <div className="divide-y divide-black w-full text-start">
        {relatedList.map((ach) => (
          <CardRelatedAchievements
            key={ach.id}
            // S'il y a un process.env.GATSBY_API_URL :
            imgSrc={`${process.env.GATSBY_API_URL ?? ''}${ach.image}`}
            title={ach.title_fr || ach.title_en || 'Sans titre'}
            date={formatDate(ach.date)}
          />
        ))}
      </div>
    </div>
  );
}
