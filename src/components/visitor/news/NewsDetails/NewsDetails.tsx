import React, { useEffect, useState } from 'react'
import axios from "axios";
import newsDeteails from '../../../../assets/images/newsDeteails.jpg'
import NewsImage from '../NewsImage';
import Breadcrumbs from '@/components/Breadcumbs';
import NewsDetailsContent from './NewsDetailsContent';
import FollowUs from '../FollowUs';
import Question from '../Question';
import RelatedBlog from '../RelatedBlog';

export default function NewsDetails({ location, params }: { location: any; params: any }) {
    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");
  
    
    const [news, setNews] = useState([]);
    const [relatedNews, setRelatedNews] = useState([]);
    const [moreEvents, setMoreNews] = useState([]);
    
    const getNews = async (slugNews: string) => {
      try {
        const response = await axios.get(`/api/news/${slugNews}`);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news types:", error);
      }
    };
  
    const getRelatedNews = async (slugNews: string) => {
      try {
        const response = await axios.get(`/api/related-news/${slugNews}`);
        setRelatedNews(response.data);
      } catch (error) {
        console.error("Error fetching news types:", error);
      }
    };

    useEffect(() => {
      const slugNews = params.slug;
      getNews(slugNews);
      getRelatedNews(slugNews)
  
    }, [location]);


    const [isOpened, setIsOpened] = useState(false);
    return (
        <div>
            <main className={`relative`}>

                <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
                <NewsImage imgSrc={newsDeteails} btnText="" paragraph="" date="" />

                {/* <div className="max-w-[1223px] mx-auto mt-3 lg:mt-6 ml-5 sm:ml-0" > */}
                <div className="max-w-full mx-auto pl-6 sm:pl-0">
                  <Breadcrumbs />
                 </div>

                <section className="flex justify-center gap-20 sm:flex-row flex-col my-5 text-center max-w-7xl w-full mx-auto mt-20 px-5 h-fit">

                    <div className=''>
                        <NewsDetailsContent params={params} location={location} />
                    </div>

                    <div className='h-full md:col-span-1 col-span-2 flex flex-col gap-20 pb-10 sm:pb-0'>
                        <FollowUs />
                        <Question />
                        <RelatedBlog relatedBlog={relatedNews} headerName='Actualités Connexes' route="/news/"/>

                    </div>

                </section>


            </main>
        </div>
    )
}
