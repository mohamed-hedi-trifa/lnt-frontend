import { Link } from "gatsby";
import React from "react";
import Dropdown from "../Dropdown";
import { Bars3Icon, GlobeAltIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LangLink from "../LangLink";

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

  return (
    <div className="fixed z-30 w-full">
      <header className="w-full px-3 py-1.5 bg-primary/25">
        <div className="flex items-center justify-between max-w-7xl mx-auto ">
          <div className="flex gap-1 items-center">
            <img src="/logo.png" alt="AKDDCL" className="w-11 h-11 shrink-0" />
            <p className="max-w-[200px] text-white text-xs font-bold">
              <span className="hidden md:inline">Association Kratten du Développement Durable de la Culture et du Loisir</span>
              <span className="inline md:hidden">AKDDCL</span>
            </p>
          </div>
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
      <nav className="hidden md:block w-full px-3 py-1.5 bg-slate-700/50">
        <ul className="flex items-center justify-between w-full max-w-7xl mx-auto text-white text-[10px] lg:text-sm">
          <li>Qui Somme-Nous</li>
          <li>Air Marine et Côtière Protégée</li>
          <li>Notre Festival</li>
          <li>Actualités</li>
          <li>Evénements</li>
          <li>Opportuniés</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
