import React, { useEffect, useState } from 'react';
import axios from "axios";
import Breadcrumbs from '../../../Breadcumbs';
import HeroAcheivement from './HeroAcheivement';
import FollowUs from '../../news/FollowUs';
import Question from '../../news/Question';
import AchievementDetailsContent from './AchievementDetailsContent';
import RelatedAchievement from './RelatedAchievement';
import FollowUsAchivement from './FollowUsAchivement';
import QuestionAchivement from './QuestionAchivement';


export default function AchievementDetails({ location, params }: { location: any; params: any }) {
  const searchParams = new URLSearchParams(location?.search);
  const paramLang = searchParams.get("lang");
  
  // Au lieu d'un tableau vide, on stocke un objet ou null
  const [achievement, setAchievement] = useState<any>(null);

  const getAchievements = async (slugAchievements: string) => {
    try {
      const response = await axios.get(`/api/achievements/${slugAchievements}`);
      // On suppose que l'API renvoie directement un seul achievement
      setAchievement(response.data);
    } catch (error) {
      console.error("Error fetching achievement:", error);
    }
  };

  useEffect(() => {
    const slugAchievements = params.slug;
    getAchievements(slugAchievements);
  }, [location]); 

  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="relative">
      <HeroAcheivement />

      {/* Fil d'Ariane */}
      <div className="max-w-full mx-auto pl-6 sm:pl-0">
        <Breadcrumbs />
      </div>

      <section className="flex justify-center gap-20 sm:flex-row flex-col my-5 text-center max-w-7xl w-full mx-auto mt-20 px-5 h-fit">
        <div className="">
          {/* Détails de la réalisation */}
          <AchievementDetailsContent params={params} location={location} />
        </div>

        <div className="h-full md:col-span-1 col-span-2 flex flex-col gap-10 pb-10 sm:pb-0">
          <FollowUsAchivement />
          <QuestionAchivement />

          {/* --- Afficher ici les réalisations connexes --- */}
          {/* On passe la réalisation courante au composant RelatedAchievement */}
          <RelatedAchievement currentAchievement={achievement} />
        </div>
      </section>
    </main>
  );
}
