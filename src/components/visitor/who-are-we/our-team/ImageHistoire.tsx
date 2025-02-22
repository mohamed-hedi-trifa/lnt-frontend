import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import './ImageHistoire.css';
import { Link } from "gatsby";

const HistoryCard = ({ image, title, description, path }:{path:string, image:string, title:string, description:string}) => {
  return (
    <div className="w-full rounded-[10px] relative group">
      <img
        src={image}
        className="object-cover rounded-[10px] w-full h-[297px]"
        alt={title}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 flex justify-center items-end pb-3 px-[33px] group-hover:flex">
        <Link to={path} className="bg-white bg-opacity-70 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out overflow-hidden max-h-[82px] group-hover:max-h-[300px]">
          
          {/* Title: Always visible */}
          <h3 className="font-bold text-center text-[#0270A0] text-[26px] sm:text-[30px]">
            {title}
          </h3>

          {/* Description: Initially hidden, revealed on hover */}
          <p className="text-sm lg:text-base font-medium text-center text-black mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            {description}
          </p>

          {/* "Learn More" icon: Initially hidden, revealed on hover */}
          <div className="flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <ChevronDoubleRightIcon className="h-6 w-6" style={{ color: '#0270A0' }} />
          </div>
        </Link>
      </div>
    </div>
  );
};

const ImageHistoire = () => {
  const lang = typeof window !== 'undefined' && location?.pathname.startsWith("/fr/") ? "fr" : "en"; 
  const images = [
    { src: '/images/images_histoire/img1.png' },
    { src: '/images/images_histoire/img2.png' },
    { src: '/images/images_histoire/img3.png' },
    { src: '/images/images_histoire/img4.png' },
  ];

  const data = [
    { title: "Notre Histoire", description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...", path:`/${lang}/who-are-we/our-history` },
    { title: "Principes et Valeurs", description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...", path:`/${lang}/who-are-we/our-values` },
    { title: "Nos Réalisations", description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...", path:`/${lang}/who-are-we/our-achievements` },
    { title: "Notre Équipe", description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...", path:`/${lang}/who-are-we/our-team` },
    { title: "Partenaires", description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...", path:`/${lang}/who-are-we/partners` },
  ];

  return (
    <div className='images flex justify-center items-center flex-col mt-10'>
      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-[34px]">
        {images.map((image, index) => (
          <HistoryCard 
            key={index} 
            image={image.src} 
            title={data[index]?.title} 
            description={data[index]?.description}
            path={data[index]?.path}
          />
        ))}
      </div>

      {/* Single Large Card */}
      <div className="flex justify-center lg:w-[550px] mt-[34px]">
        <HistoryCard 
          image='/images/images_histoire/img5.png' 
          title={data[4]?.title} 
          description={data[4]?.description}
          path={data[4]?.path}
        />
      </div>
    </div>
  );
};

export default ImageHistoire;
