import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { Bars3Icon, ChevronDownIcon, GlobeAltIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LangLink from "../LangLink";
import NavDropdown from "../NavDropdown";

interface NavItem {
  name: string;
  path: string;
  dropdown?: any;
}

// Translation object for the navbar
const translations = {
  en: [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about/" },
    { name: "Activities", path: "/activities/" },
    { name: "Protected armarine", path: "/protected-armarine/" },
    { name: "Festivals", path: "/festivals/" },
    { name: "Contact", path: "/contact/" },
    { name: "Blog", path: "/blog/" },
  ],
  fr: [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about/" },
    { name: "Activities", path: "/activities/" },
    { name: "Protégé armarine", path: "/protected-armarine/" },
    { name: "Festivals", path: "/festivals/" },
    { name: "Contact", path: "/contact/" },
    { name: "Blog", path: "/blog/" },
  ],
};

function Navbar({ location }: { location: any }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Extract the language from the URL path (assuming it's the first part of the path, e.g., /en/ or /fr/)
  const lang = location?.pathname.startsWith("/fr/") ? "fr" : "en";

  // Get the appropriate navigation items based on the language
  const navItems = translations[lang];

  const renderNavItems = () => {
    return navItems.map((item: NavItem, index) => {
      if (item.dropdown) {
        return (
          <li key={index}>
            <Dropdown
              title={item.name}
              items={item.dropdown}
              path={item.dropdown[0].path} // Use the first path for active check
              active={location?.pathname.indexOf(item.dropdown[0].path) === 0}
            />
          </li>
        );
      } else {
        return (
          <li
            key={index}
            className={`py-2 font-open font-normal transition duration-500 ${location?.pathname === item.path ? "text-primary" : "hover:text-primary"}`}
          >
            <Link to={`/${lang}${item.path}`}>{item.name}</Link> {/* Prepend lang */}
          </li>
        );
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight - 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  return (
    <div className="fixed z-30 w-full">
      <header className={`w-full px-3 py-1.5 bg-slate-900 ${isScrolled ? "" : "bg-opacity-25"} duration-200`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto ">
          <LangLink to="/" className="flex gap-1 items-center">
            <img src="/logo.png" alt="AKDDCL" className="w-11 h-11 shrink-0" />
            <p className="max-w-[200px] text-white text-xs font-bold">
              <span className="hidden md:inline">Association Kratten du Développement Durable de la Culture et du Loisir</span>
              <span className="inline md:hidden">AKDDCL</span>
            </p>
          </LangLink>
          <div className="flex gap-3 items-center">
            <button className="hidden md:block">
              <MagnifyingGlassIcon className="h-8 w-8 text-white -scale-x-100" />
            </button>
            <div className="hidden md:inline h-8 w-px bg-white"></div>
            <LangLink
              to="/benevole"
              className="hidden md:inline relative px-4 py-2 text-white text-sm font-semibold rounded-full bg-[linear-gradient(to_right,_#50ACC6,_#00E676,_#50ACC6)] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right"
            >
              DEVENIR BÉNÉVOLE
            </LangLink>
            <button className="flex items-center">
              <GlobeAltIcon className="h-8 w-8 text-white" />
              <p className="text-white font-bold">EN</p>
            </button>
            <button className="block md:hidden">
              <Bars3Icon className="h-8 w-8 text-blue-800" />
            </button>
          </div>
        </div>
      </header>
      <nav className={`hidden md:block w-full px-3 py-0.5 bg-slate-700 ${isScrolled ? "" : "bg-opacity-50"} duration-200`}>
        <ul className="flex items-center justify-between w-full max-w-7xl mx-auto text-white text-[10px] lg:text-sm">
          {items.map((item, index) => {
            if (item.items) {
              return (
                <li key={index}>
                  <NavDropdown
                    items={item.items}
                    position="left"
                    renderItem={(item) => (
                      <LangLink to={item.path || ""} className="block py-2 px-3 rounded font-normal text-black hover:bg-slate-200 transition duration-300">
                        {item.label}
                      </LangLink>
                    )}
                  >
                    {(isOpen) => (
                      <button className={`flex items-center gap-2 hover:underline underline-offset-4`}>
                        {item.label}
                        <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
                      </button>
                    )}
                  </NavDropdown>
                </li>
              );
            } else {
              return (
                <li key={index} className="">
                  <LangLink to={item.path} className="block py-2 font-open font-normal transition duration-500 hover:underline underline-offset-4">
                    {item.label}
                  </LangLink>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

const items = [
  {
    label: "Qui Somme-nous",
    items: [
      {
        label: "Notre Histoire",
        path: "/who-are-we/our-history",
      },
      {
        label: "Principes et Valeurs",
        path: "/who-are-we/our-values",
      },
      {
        label: "Nos Réalisations",
        path: "/who-are-we/our-achievements",
      },
      {
        label: "Notre Équipe",
        path: "/who-are-we/our-team",
      },
      {
        label: "Partenaires",
        path: "/who-are-we/partners",
      },
      {
        label: "Rapport Financier",
        path: "/who-are-we/financial-report",
      },
    ],
  },
  {
    label: "Air Marine et Côtière Protégée",
    items: [
      {
        label: "Info",
        path: "/info",
      },
      {
        label: "Suivi Scientifique",
        path: "/scientific-research",
      },
      {
        label: "Formation et Campement Scientifique",
        path: "/achievements",
      },
      {
        label: "Équipe",
        path: "/team",
      },
    ],
  },
  {
    label: "Notre Festival",
    items: [
      {
        label: "Prochains Festivals",
        path: "/next-festivals",
      },
      {
        label: "Éditions Précédentes",
        path: "/previous-editions",
      },
    ],
  },
  {
    label: "Actualités",
    path: "/news",
  },
  {
    label: "Événements",
    items: [
      {
        label: "Ateliers et Formations",
        path: "/training-sessions",
      },
      {
        label: "Événements Culturels",
        path: "/culturel-events",
      },
      {
        label: "Activités de Loisirs et Sportives",
        path: "/sport-events",
      },
    ],
  },
  {
    label: "Opportunités",
    items: [
      {
        label: "Offres d'Emplois",
        path: "/job-offers",
      },
      {
        label: "Appels d'Offres",
        path: "/tenders",
      },
      {
        label: "Stages",
        path: "/internships",
      },
    ],
  },
  {
    label: "Contact",
    path: "/contact",
  },
];
