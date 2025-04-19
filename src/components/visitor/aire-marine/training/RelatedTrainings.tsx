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

   
  }, [currentTraining]);

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
