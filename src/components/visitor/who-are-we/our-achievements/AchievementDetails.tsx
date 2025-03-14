import React, { useEffect, useState } from 'react'
import axios from "axios";
import newsDeteails from '../../../../assets/images/newsDeteails.jpg'
import NewsImage from '../../news/NewsImage';
import AchievementDetailsContent from './AchievementDetailsContent';
import FollowUs from '../../news/FollowUs';
import Question from '../../news/Question';
import RelatedNews from '../../news/NewsDetails/RelatedNews';
import Breadcrumbs from '../../../Breadcumbs'
import HeroAcheivement from './HeroAcheivement';


export default function AchievementDetails({ location, params }: { location: any; params: any }) {
    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");
  
    
    const [achievement, setAchievement] = useState([]);
    const [moreEvents, setMoreNews] = useState([]);
    
    const getAchievements = async (slugAchievements) => {
      try {
        const response = await axios.get(`/api/achievements/${slugAchievements}`);
        setAchievement(response.data);
      } catch (error) {
        console.error("Error fetching achievement types:", error);
      }
    };
  

  
    useEffect(() => {
      const slugAchievements = params.slug;
      getAchievements(slugAchievements);
  
    }, [location]);


    const [isOpened, setIsOpened] = useState(false);
    return (
        <div>
            <main className={`relative`}>

            <HeroAcheivement/>

                {/* <div className="max-w-[1223px] mx-auto mt-3 lg:mt-6 ml-5 sm:ml-0" > */}
                <div className="max-w-full mx-auto   pl-6 sm:pl-0 ">
                    <Breadcrumbs />
                </div>

                <section className='flex gap-20 sm:flex-row flex-col   my-5 text-center max-w-7xl w-full mx-auto   mt-20 px-5 h-fit  '>

                    <div className='sm:w-[2500px]'>
                        <AchievementDetailsContent params={params} location={location} />
                    </div>

                    <div className='h-full w-full md:col-span-1 col-span-2 flex flex-col gap-10'>
                        <FollowUs />
                        <Question />
                        <RelatedNews/>

                    </div>

                </section>


            </main>
        </div>
    )
}
