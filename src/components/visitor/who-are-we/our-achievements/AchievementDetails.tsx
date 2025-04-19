import React, { useEffect, useState } from 'react';
import axios from "axios";
import Breadcrumbs from '../../../Breadcumbs';
import HeroAcheivement from './HeroAcheivement';
import AchievementDetailsContent from './AchievementDetailsContent';

import FollowUsAchivement from './FollowUsAchivement';
import Question from '@/components/atoms/Question';
import RelatedBlog from '../../news/RelatedBlog';


export default function AchievementDetails({ location, params }: { location: any; params: any }) {
  const searchParams = new URLSearchParams(location?.search);
  const paramLang = searchParams.get("lang");
  const [achievement, setAchievement] = useState<any>(null);

  const getAchievements = async (slugAchievements: string) => {
    try {
      const response = await axios.get(`/api/achievements/${slugAchievements}`);
      setAchievement(response.data);
    } catch (error) {
      console.error("Error fetching achievement:", error);
    }
  };

  useEffect(() => {
    const slugAchievements = params.slug;
    getAchievements(slugAchievements);
    getRelatedAchievements(slugAchievements);
  }, [location]);

  const [isOpened, setIsOpened] = useState(false);

  const [relatedAchievements, setRelatedAchievements] = useState([]);

  const getRelatedAchievements = async (slugAchievements: string) => {
    try {
      const response = await axios.get(`/api/related-achievements/${slugAchievements}`);
      setRelatedAchievements(response.data);
    } catch (error) {
      console.error("Error fetching achievements types:", error);
    }
  };

  return (
    <main className="relative">
      <HeroAcheivement />


      <div className="max-w-full mx-auto pl-6 sm:pl-0">
        <Breadcrumbs />
      </div>

      <section className="flex justify-center gap-20 sm:flex-row flex-col my-5 text-center max-w-7xl w-full mx-auto mt-20 px-5 h-fit">
        <div className="">
          <AchievementDetailsContent params={params} location={location} />
        </div>

        <div className="h-full md:col-span-1 col-span-2 flex flex-col gap-10 pb-10 sm:pb-0">
          <FollowUsAchivement />
          <Question />
   
            {
              relatedAchievements.length > 0 && <RelatedBlog relatedBlog={relatedAchievements} headerName="Réalisation Connexes" route="/who-are-we/our-achievements/"/>
            }
   

        </div>
      </section>
    </main>
  );
}
