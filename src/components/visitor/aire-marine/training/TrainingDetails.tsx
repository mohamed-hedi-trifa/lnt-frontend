import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumbs from "@/components/Breadcumbs";
import RelatedTrainings from "./RelatedTrainings";
import FollowUsTraining from "./FollowUsTraining";
import Question from "@/components/atoms/Question";
import HeroTraining from "./HeroTraining";
import TrainingDetailsContent from "./TrainingDetailsContent";
import RelatedBlog from "../../news/RelatedBlog";




export default function TrainingDetails({ location, params }: { location: any; params: any }) {
  const searchParams = new URLSearchParams(location?.search);
  const paramLang = searchParams.get("lang");

  // Au lieu d'un tableau vide, on stocke un objet ou null
  const [training, setTraining] = useState<any>(null);

  const getTrainings = async (slug: string) => {
    try {
      const response = await axios.get(`/api/training/${slug}`);
      // On suppose que l'API renvoie directement un seul training
      setTraining(response.data);
    } catch (error) {
      console.error("Error fetching training:", error);
    }
  };

  const [relatedTraining, setRelatedTraining] = useState([]);

  const getRelatedNews = async (slugNews: string) => {
    try {
      const response = await axios.get(`/api/related-training/${slugNews}`);
      setRelatedTraining(response.data);
    } catch (error) {
      console.error("Error fetching news types:", error);
    }
  };

  useEffect(() => {
    const slugParam = params.slug;
    getTrainings(slugParam);
    getRelatedNews(slugParam);
  }, [location]);

  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="relative">
      <HeroTraining />


      <div className="max-w-full mx-auto pl-6 sm:pl-0">
        <Breadcrumbs />
      </div>

      <section className="flex justify-center gap-20 sm:flex-row flex-col my-5 text-center max-w-7xl w-full mx-auto mt-20 px-5 h-fit">
        <div className="">

          <TrainingDetailsContent params={params} location={location} />
        </div>

        <div className="h-full md:col-span-1 col-span-2 flex flex-col gap-10 pb-10 sm:pb-0">
          <FollowUsTraining />
          <Question />
          {
            relatedTraining.length > 0 && <RelatedBlog relatedBlog={relatedTraining} headerName="Connexes" route="/protected-air-marine-coastal-areas/training/"/>
          }

        </div>
      </section>
    </main>
  );
}

