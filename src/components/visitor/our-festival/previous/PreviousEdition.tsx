import React, { useState } from 'react';
import previousEditionImage from '../../../../assets/images/previousEdition.jpg';
import FollowUsPreviousEdition from './FollowUsPreviousEdition';
import QuestionEvent from '../../Event/QuestionEvent';
import PreviousEditionImage from './PreviousEditionImage';
import AboutFestival from './AboutFestival';
import DisplayEditionList from './DisplayEditionList';
import UpcomingEdition from './UpcomingEdition';
import Breadcrumbs from "@/components/Breadcumbs";

export default function PreviousEdition() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className=''>
      <main className="relative">
        {/* Overlay pour la sidebar */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-500 z-40 ${
            isOpened ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpened(false)}
        ></div>

        <PreviousEditionImage imgSrc={previousEditionImage} />
        <div className="max-w-full mx-auto px-4">
          <Breadcrumbs />
        </div>
        <div className="max-w-[1400px] mx-auto px-4">
          <section className="my-10 text-center">
            <AboutFestival />
          </section>
          <section className="border-t border-gray-800 pt-10">
            <DisplayEditionList />
          </section>
          <section className="my-10 text-center">
            <hr className="border-gray-800 mb-8 mt-16" />
            <UpcomingEdition />
          </section>
        </div>
      </main>
    </div>
  );
}
