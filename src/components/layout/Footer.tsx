import { Link } from "gatsby";
import React, { useEffect } from "react";
import NewsLetterSub from "../NewsLetterSub";
import LangLink from "../LangLink";

export default function Footer() {
  const lang = window?.location?.pathname.startsWith("/fr/") ? "fr" : "en";

  return (
    <footer className="px-5 sm:px-3 py-10 lg:py-[65px] sm:mt-0 bg-gradient-to-r from-[#51ADC6] to-[#006E9F] relative z-50">
      <div className="max-w-7xl mx-auto text-white  sm:mt-0">
        {/* <section className="divide-y sm:divide-y-0 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"> */}
        <section className="divide-y sm:divide-y-0 grid gap-8 sm:justify-around lg:justify-normal sm:grid-cols-[minmax(auto,500px),auto] lg:grid-cols-[minmax(250px,1fr)_minmax(150px,auto)_minmax(150px,auto)_minmax(250px,1fr)]">
          <div className="order-1 text-justify">
            <div className="flex gap-1 items-center">
              <img src="/logo.png" alt="AKDDCL" className="w-11 h-11 shrink-0" />
              <p className="max-w-[200px] text-white text-xl font-bold">
                <span className="">AKDDCL</span>
              </p>
            </div>
            <p className="font-medium leading-7">
              <b>L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL)</b> œuvre pour la préservation des ressources naturelles et
              du patrimoine culturel de Kerkennah, en soutenant le développement durable et la biodiversité marine.
            </p>
          </div>
          <div className="order-2">
            <h3 className="pb-4 font-bold text-lg mt-2">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              {links.map((element) => (
                <li key={element.text} className="hover:text-sky-900 duration-200  ">
                  <LangLink to={element.path}>{element.text}</LangLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-3">
            <h3 className="pb-4 font-bold text-lg mt-2">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <p className="font-bold">Email:</p>
                <a href="mailto:akddcl.kerkennah@gmail.com" className="hover:text-sky-900 duration-200 break-words">
                  akddcl.kerkennah@gmail.com
                </a>
              </li>
              <li>
                <p className="font-bold">Téléphone:</p>
                <a href="tel:+21654525509" className="hover:text-sky-900 duration-200">
                  +216 54 525 509
                </a>
              </li>
              <li>
                <h3 className="mt-6 pb-3 font-bold text-lg ">Suivez-nous</h3>
                <ul className="z-10 flex gap-2 items-center flex-wrap">
                  <li>
                    <a
                      href="#"
                      className="shrink-0 flex items-center justify-center size-9 rounded-full border border-black hover:bg-slate-100/25 duration-200"
                    >
                      <FacebookIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="shrink-0 flex items-center justify-center size-9 rounded-full border border-black hover:bg-slate-100/25 duration-200"
                    >
                      <InstagramIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="shrink-0 flex items-center justify-center size-9 rounded-full border border-black hover:bg-slate-100/25 duration-200"
                    >
                      <LinkedinIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="shrink-0 flex items-center justify-center size-9 rounded-full border border-black hover:bg-slate-100/25 duration-200"
                    >
                      <XIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="shrink-0 flex items-center justify-center size-9 rounded-full border border-black hover:bg-slate-100/25 duration-200"
                    >
                      <YoutubeIcon />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="order-[-1] sm:order-2 lg:order-4">
            <NewsLetterSub />
          </div>
        </section>
        <div className="h-px mt-20 mb-4 bg-slate-200"></div>
        <div className="flex divide-x divide-black text-black text-sm font-medium">
          <p className="px-4">&copy; 2024 AKDDCL</p>
          <p className="px-4">Mentions légales</p>
          <p className="px-4">Politique de confidentialité</p>
        </div>
      </div>
    </footer>
  );
}

const links = [
  {
    text: "Qui Sommes-Nous",
    path: "/who-are-we/our-history",
  },
  {
    text: "Aire Marine et Côtière Protégée",
    path: "/protected-air-marine-coastal-areas/presentation",
  },
  {
    text: "Notre Festival",
    path: "/our-festival",
  },
  {
    text: "Actualités",
    path: "/news",
  },
  {
    text: "Événements",
    path: "/event",
  },
  {
    text: "Opportunités",
    path: "/opportunities",
  },
  {
    text: "Devenir Bénévole",
    path: "/benevole",
  },
];

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="black" width={20} height={20}>
    <path d="m279.1 288 14.2-92.7h-88.9v-60.1c0-25.4 12.4-50.1 52.2-50.1H297V6.3S260.4 0 225.4 0c-73.2 0-121.1 44.4-121.1 124.7v70.6H22.9V288h81.4v224h100.2V288z"></path>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12m0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8" clipRule="evenodd"></path>
    <path d="M18 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path>
    <path
      fillRule="evenodd"
      d="M1.654 4.276C1 5.56 1 7.24 1 10.6v2.8c0 3.36 0 5.04.654 6.324a6 6 0 0 0 2.622 2.622C5.56 23 7.24 23 10.6 23h2.8c3.36 0 5.04 0 6.324-.654a6 6 0 0 0 2.622-2.622C23 18.44 23 16.76 23 13.4v-2.8c0-3.36 0-5.04-.654-6.324a6 6 0 0 0-2.622-2.622C18.44 1 16.76 1 13.4 1h-2.8c-3.36 0-5.04 0-6.324.654a6 6 0 0 0-2.622 2.622M13.4 3h-2.8c-1.713 0-2.878.002-3.778.075-.877.072-1.325.202-1.638.361a4 4 0 0 0-1.748 1.748c-.16.313-.29.761-.36 1.638C3.001 7.722 3 8.887 3 10.6v2.8c0 1.713.002 2.878.075 3.778.072.877.202 1.325.361 1.638a4 4 0 0 0 1.748 1.748c.313.16.761.29 1.638.36.9.074 2.065.076 3.778.076h2.8c1.713 0 2.878-.002 3.778-.075.877-.072 1.325-.202 1.638-.361a4 4 0 0 0 1.748-1.748c.16-.313.29-.761.36-1.638.074-.9.076-2.065.076-3.778v-2.8c0-1.713-.002-2.878-.075-3.778-.072-.877-.202-1.325-.361-1.638a4 4 0 0 0-1.748-1.748c-.313-.16-.761-.29-1.638-.36C16.278 3.001 15.113 3 13.4 3"
      clipRule="evenodd"
    ></path>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="black" width={20} height={20}>
    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3M447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"></path>
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="black" width={20} height={20}>
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"></path>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="black" width={20} height={20}>
    <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C14.9 167 14.9 256.4 14.9 256.4s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3M232.2 337.6V175.2l142.7 81.2z"></path>
  </svg>
);
