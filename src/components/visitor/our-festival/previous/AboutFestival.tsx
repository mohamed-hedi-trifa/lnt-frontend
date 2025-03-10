import React from 'react';
import edition1 from '../../../../assets/images/edition1.jpg';
import edition2 from '../../../../assets/images/edition2.jpg';
import edition3 from '../../../../assets/images/edition3.jpg';
import edition4 from '../../../../assets/images/edition4.jpg';
import edition5 from '../../../../assets/images/edition5.jpg';
import edition6 from '../../../../assets/images/edition6.jpg';
import edition7 from '../../../../assets/images/edition7.jpg';
import edition8 from '../../../../assets/images/edition8.jpg';

export default function AboutFestival() {
  return (
    <div className="px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Informations textuelles */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h1 className="font-bold text-3xl lg:text-5xl text-center md:text-left max-w-md text-gray-800">
            <span className="text-[#0270A0]">Festival</span> de La Culture des Îles Méditerranéennes
          </h1>
          <div className="flex flex-wrap gap-5">
            <div className="bg-[#0270A0] rounded-lg px-4 py-3 flex flex-col items-center max-w-[150px] text-white shadow-md">
              <span className="text-2xl font-bold">8+</span>
              <p className="font-semibold text-sm text-center">Éditions Organisées</p>
            </div>
            <div className="bg-[#0270A0] rounded-lg px-4 py-3 flex flex-col items-center max-w-[150px] text-white shadow-md">
              <span className="text-2xl font-bold">40+</span>
              <p className="font-semibold text-sm text-center">Événements Réalisés</p>
            </div>
          </div>
        </div>

        {/* Galerie d’images en grille */}
        <div className="grid grid-cols-2 sm:grid-cols-4  ">
          <img src={edition1} alt="Edition 1" className="object-cover w-full h-24 sm:h-32 lg:h-44 rounded-tl-lg" />
          <img src={edition2} alt="Edition 2" className="object-cover w-full h-24 sm:h-32 lg:h-44" />
          <img src={edition3} alt="Edition 3" className="object-cover w-full h-24 sm:h-32 lg:h-44" />
          <img src={edition4} alt="Edition 4" className="object-cover w-full h-24 sm:h-32 lg:h-44 sm:rounded-tr-lg" />
          <img src={edition5} alt="Edition 5" className="object-cover w-full h-24 sm:h-32 lg:h-44 sm:rounded-bl-lg" />
          <img src={edition6} alt="Edition 6" className="object-cover w-full h-24 sm:h-32 lg:h-44" />
          <img src={edition7} alt="Edition 7" className="object-cover w-full h-24 sm:h-32 lg:h-44" />
          <img src={edition8} alt="Edition 8" className="object-cover w-full h-24 sm:h-32 lg:h-44 rounded-br-lg" />
        </div>
      </div>
    </div>
  );
}
