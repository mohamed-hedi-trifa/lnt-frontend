import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderSection from '@/components/atoms/HeaderSection';
import CardRelatedTarining from './CardRelatedTarining';

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

interface TrainingType {
  id: number;
  slug: string;
  date: string;
  image: string;
  title_fr?: string;
  title_en?: string;
  themes?: ThemeType[];
}

// Props : on reçoit la réalisation courante
export default function RelatedTrainings({ currentTraining }: { currentTraining: TrainingType | null }) {
  const [relatedList, setRelatedList] = useState<TrainingType[]>([]);

  useEffect(() => {
    // Si pas encore de data, on ne fait rien
    if (!currentTraining) return;

    // Récupérer toutes les achievements
    axios
      .get<TrainingType[]>('/api/training')
      .then((res) => {
        const allAchievements = res.data || [];

        // Récupère la liste d'IDs de thèmes du current
        const currentThemeIds = currentTraining.themes?.map((t) => t.id) || [];

        // Filtrer celles qui partagent au moins un thème
        const filtered = allAchievements.filter((ach) => {
          if (ach.id === currentTraining.id) return false; // exclude itself

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
  }, [currentTraining]);

  // Si aucune Achievement connexe, on n'affiche rien ou on affiche un message
  if (relatedList.length === 0) return null;

  return (
    <div>
      <HeaderSection headerName="Réalisations Connexes" />
      <div className="divide-y divide-black w-full text-start">
        {relatedList.map((ach) => (
          <CardRelatedTarining
            key={ach.id}
            imgSrc={`${process.env.GATSBY_API_URL ?? ''}${ach.image}`}
            title={ach.title_fr || ach.title_en || 'Sans titre'}
            date={formatDate(ach.date)}
          />
        ))}
      </div>
    </div>
  );
}
