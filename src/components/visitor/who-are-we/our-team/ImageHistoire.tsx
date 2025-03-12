import React from "react";
import { Link } from "gatsby";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { useLocation } from "@reach/router";
import './ImageHistoire.css';

const HistoryCard = ({ image, title, description, path }) => (
  <div className="w-full rounded-[10px] relative group shadow-helmi">
    <img
      src={image}
      className="object-cover rounded-[12px] w-full h-[297px]"
      alt={title}
    />
    <div className="absolute inset-0 flex justify-center items-end pb-3 px-[33px] group-hover:flex">
      <Link
        to={path}
        className="bg-white bg-opacity-70 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out overflow-hidden max-h-[82px] group-hover:max-h-[300px]"
      >
        <h3 className="font-bold text-center text-[#0270A0] text-[26px] sm:text-[30px]">
          {title}
        </h3>
        <p className="text-sm lg:text-base font-medium text-center text-black mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          {description}
        </p>
        <div className="flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          <ChevronDoubleRightIcon className="h-6 w-6" style={{ color: '#0270A0' }} />
        </div>
      </Link>
    </div>
  </div>
);

const ImageHistoire = () => {
  const location = useLocation();
  // On normalise le chemin courant en retirant la barre oblique finale s'il y en a une
  const currentPath = location.pathname.replace(/\/$/, "");

  // Détermination de la langue (basé sur le pathname)
  const lang = currentPath.startsWith("/fr") ? "fr" : "en";

  // Définition des cartes avec leurs chemins
  const cards = [
    {
      image: '/images/images_histoire/img5.png',
      title: "Notre Histoire",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...",
      path: `/${lang}/who-are-we/our-history`
    },
    {
      image: '/images/images_histoire/img2.png',
      title: "Principes et Valeurs",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...",
      path: `/${lang}/who-are-we/our-values`
    },
    {
      image: '/images/images_histoire/img7.jpg',
      title: "Our Mission & Vision",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...",
      path: `/${lang}/who-are-we/our-mission-and-vision`
    },
    {
      image: '/images/images_histoire/img3.png',
      title: "Nos Réalisations",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...",
      path: `/${lang}/who-are-we/our-achievements`
    },
    {
      image: '/images/images_histoire/img4.png',
      title: "Notre Équipe",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...",
      path: `/${lang}/who-are-we/our-team`
    },
    {
      image: '/images/images_histoire/img1.png',
      title: "Partenaires",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...",
      path: `/${lang}/who-are-we/partners`
    },
    {
      image: '/images/images_histoire/img6.png',
      title: "Rapports Financiers",
      description: "Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP) ...",
      path: `/${lang}/who-are-we/financial-report`
    },
  ];

  // Normalisation des chemins dans les cartes (retirer la barre oblique finale)
  const normalizedCards = cards.map(card => ({
    ...card,
    path: card.path.replace(/\/$/, "")
  }));

  // Exclusion de la carte dont le chemin correspond à la page courante
  const filteredCards = normalizedCards.filter(card => card.path !== currentPath);

  // Découpage : première partie en grille et la dernière en format large
  // const gridCards = filteredCards.slice(0, filteredCards.length - 1);
  // const largeCard = filteredCards[filteredCards.length - 1];

  return (
    <div className='images flex justify-center items-center flex-col mt-10'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-[34px]">
        {filteredCards.map((card, index) => (
          <HistoryCard
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            path={card.path}
          />
        ))}
      </div>
      {/* {largeCard && (
        <div className="flex justify-center lg:w-[586px] mt-[34px] max-765:w-full">
          <HistoryCard
            image={largeCard.image}
            title={largeCard.title}
            description={largeCard.description}
            path={largeCard.path}
          />
        </div>
      )} */}
    </div>
  );
};

export default ImageHistoire;
