import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import LangLink from "../LangLink";
import NavDropdown from "../NavDropdown";
import MobileNavbar from "./MobileNavbar";
import NavbarSearch from "@/components/layout/NavbarSearch";
import { useTranslation } from "@/contexts/TranslationContext";

function SubDropdown({ items }: { items: any[] }) {
  return (
    <div className="absolute top-0 left-full mt-0 ml-0 pl-1 hidden group-hover:block min-w-[150px]">
      <ul className="rounded shadow-[1px_1px_5px_rgb(0,0,0,.3)] bg-zinc-100">
        {items.map((subItem, subIndex) => (
          <li
            key={subIndex}
            className="relative group [&:first-child_.nav-dropdown-item]:rounded-t [&:last-child_.nav-dropdown-item]:rounded-b"
          >
            {subItem.path ? (
              subItem.dynamic ? (
                <Link
                  to={subItem.path}
                  className="block py-2.5 px-2 font-semibold text-black hover:bg-gradient-to-r from-[#0887BECC] to-[#4FACC5CC] transition duration-300 nav-dropdown-item"
                  style={{ textShadow: "0px 4px 4px rgb(0,0,0,.4)" }}
                >
                  {subItem.label}
                </Link>
              ) : (
                <LangLink
                  to={subItem.path}
                  className="block py-2.5 px-2 font-semibold text-black hover:bg-gradient-to-r from-[#0887BECC] to-[#4FACC5CC] transition duration-300 nav-dropdown-item"
                  style={{ textShadow: "0px 4px 4px rgb(0,0,0,.4)" }}
                >
                  {subItem.label}
                </LangLink>
              )
            ) : (
              <div
                className="block py-2.5 px-2 font-semibold text-black hover:bg-gradient-to-r from-[#0887BECC] to-[#4FACC5CC] transition duration-300 nav-dropdown-item"
                style={{ textShadow: "0px 4px 4px rgb(0,0,0,.4)" }}
              >
                {subItem.label}
              </div>
            )}
            {subItem.items && <SubDropdown items={subItem.items} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Navbar({ location }: { location: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [eventTypes, setEventTypes] = useState([]);
  const [items, setItems] = useState<any[]>([]);
  const { t, lang } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > window.innerHeight - 100);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await axios.get("/api/event-type/visible");
        setEventTypes(response.data);
        const transformedEventTypes = response.data.map((event: any) => ({
          label: event.name_en || event.name_fr,
          path: `/event/${event.slug}?lang=${lang}`,
          dynamic: true,
        }));
        const updatedItems = [
          {
            label: "Qui Sommes-Nous",
            underlineClassName: "w-[130px]",
            path: `/${lang}/who-are-we/our-history`,
            items: [
              { label: "Notre Histoire", path: "/who-are-we/our-history" },
              { label: "Principes et Valeurs", path: "/who-are-we/our-values" },
              { label: "Our Mission & Vision", path: "/who-are-we/our-mission-and-vision" },
              { label: "Nos Réalisations", path: "/who-are-we/our-achievements" },
              { label: "Notre Équipe", path: "/who-are-we/our-team" },
              { label: "Partenaires", path: "/who-are-we/partners" },
              { label: "Rapport Financier", path: "/who-are-we/financial-report" },
            ],
          },
          {
            label: "Aire Marine et Côtière Protégée",
            underlineClassName: "w-[200px]",
            path: `/${lang}/protected-air-marine-coastal-areas/presentation`,
            items: [
              { label: "Présentation", path: "/protected-air-marine-coastal-areas/presentation" },
              {
                label: "Suivi Scientifique",
                path: "/protected-air-marine-coastal-areas/monitoring",
                items: [
                  { label: "Suivi Marin", path: "/protected-air-marine-coastal-areas/monitoring/marin" },
                  { label: "Suivi Terrestre", path: "/protected-air-marine-coastal-areas/monitoring/terrestre" },
                ],
              },
              { label: "Formation et Campement Scientifique", path: "/protected-air-marine-coastal-areas/training" },
              { label: "Équipe", path: "/protected-air-marine-coastal-areas/team" },
            ],
          },
          {
            label: "Notre Festival",
            underlineClassName: "w-[100px]",
            path: "/our-festival",
            items: [
              { label: "Prochains Festivals", path: "/our-festival/upcoming" },
              { label: "Éditions Précédentes", path: "/our-festival/previous" },
            ],
          },
          { label: "Actualités", path: "/news", underlineClassName: "w-[65px]" },
          {
            label: "Événements",
            path: "/en/event",
            underlineClassName: "w-[85px]",
            items: transformedEventTypes,
          },
          { label: "Opportunités", underlineClassName: "w-[90px]", path: "/opportunities" },
          { label: "Contact", path: "/contact", underlineClassName: "w-[50px]" },
        ];
        setItems(updatedItems);
      } catch (error) {
        console.error("Error fetching event types:", error);
      }
    };
    fetchEventTypes();
  }, []);

  const normalizePath = (path: string) => path.replace(/\/$/, "");
  const isItemActive = (item: any): boolean => {
    const currentPath = normalizePath(location.pathname);
    if (
      item.path &&
      (currentPath === normalizePath(item.path) ||
        currentPath.startsWith(normalizePath(item.path) + "/"))
    ) {
      return true;
    }
    if (item.items && item.items.some((sub: any) => isItemActive(sub))) {
      return true;
    }
    return false;
  };

  return (
    <div className="fixed z-30 w-full">
      <header
        className={`w-full px-3 ${
          isScrolled
            ? "bg-[linear-gradient(90deg,#51ADC6_0%,_#006E9F_100%)]"
            : "bg-[linear-gradient(90deg,rgba(81,173,198,0.6)_0%,rgba(0,110,159,0.6)_100%)]"
        } duration-200`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <LangLink to="/" className="flex gap-1 items-center">
            <img
              src="/logo.png"
              alt="AKDDCL"
              className="size-14 shrink-0 object-contain drop-shadow-[0px_4px_2px_rgb(0,0,0,.3)]"
            />
            <p className="max-w-[200px] text-white text-xs font-bold">
              <span className="italic font-extrabold text-base">AKDDCL</span>
            </p>
          </LangLink>
          <div className="grow flex gap-3 items-center justify-end">
            <NavbarSearch />
            <div className="hidden md:inline h-8 w-px bg-white"></div>
            <LangLink
              to="/benevole"
              className="hidden md:inline relative px-4 py-2 text-white text-sm font-semibold rounded-full shadow-[-1px_2px_5px_rgb(0,0,0,.3)] bg-[linear-gradient(to_right,_#50ACC6,_#00E676,_#50ACC6)] transition-all duration-300 bg-[length:200%_100%] bg-left hover:bg-right"
            >
              DEVENIR BÉNÉVOLE
            </LangLink>
            <button className="flex items-center">
              <GlobeAltIcon className="h-8 w-8 text-white" />
              <p className="text-white font-bold">EN</p>
            </button>
            <div className="block md:hidden">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </header>
      <nav
        className={`hidden md:flex items-center w-full h-[50px] px-3 ${
          isScrolled ? "bg-[rgba(0,0,0,0.7)]" : "bg-[rgba(0,0,0,0.5)]"
        } duration-200`}
      >
        <ul className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {items.map((item: any, index) => {
            const active = isItemActive(item);
            return (
              <li key={index}>
                {item.items ? (
                  <NavDropdown
                    containerClassName="group/dropdown [&_li:first-child_.nav-dropdown-item]:rounded-t [&_li:last-child_.nav-dropdown-item]:rounded-b"
                    items={item.items}
                    position="left"
                    renderItem={(subItem) => (
                      <div className="relative group">
                        {subItem.path ? (
                          subItem.dynamic ? (
                            <Link
                              to={subItem.path}
                              className="block py-2.5 px-2 font-semibold text-black hover:bg-gradient-to-r from-[#0887BECC] to-[#4FACC5CC] transition duration-300 nav-dropdown-item"
                              style={{ textShadow: "0px 4px 4px rgb(0,0,0,.4)" }}
                            >
                              {subItem.label}
                            </Link>
                          ) : (
                            <LangLink
                              to={subItem.path}
                              className="block py-2.5 px-2 font-semibold text-black hover:bg-gradient-to-r from-[#0887BECC] to-[#4FACC5CC] transition duration-300 nav-dropdown-item"
                              style={{ textShadow: "0px 4px 4px rgb(0,0,0,.4)" }}
                            >
                              {subItem.label}
                            </LangLink>
                          )
                        ) : (
                          <div
                            className="block py-2.5 px-2 font-semibold text-black hover:bg-gradient-to-r from-[#0887BECC] to-[#4FACC5CC] transition duration-300 nav-dropdown-item"
                            style={{ textShadow: "0px 4px 4px rgb(0,0,0,.4)" }}
                          >
                            {subItem.label}
                          </div>
                        )}
                        {subItem.items && <SubDropdown items={subItem.items} />}
                      </div>
                    )}
                  >
                    {(isOpen) => (
                      <Link
                        to={item.path || "#"}
                        className="relative flex items-center gap-2 font-bold text-white text-[10px] lg:text-sm xl:text-base group"
                      >
                        <span style={{ textShadow: "0px 4px 4px rgb(0,0,0,.4)" }}>
                          {item.label}
                        </span>
                        <div className="mt-[0.5] h-0 bg-black flex items-center">
                          <ArrowDown className={`size-3.5 duration-300 ${isOpen ? "-rotate-180" : ""}`} />
                        </div>
                        <div
                          className={`${
                            item.underlineClassName || "w-[100px]"
                          } rounded-lg absolute bottom-[-6px] h-[4px] bg-gradient-to-r from-[#3344DC] to-[#50ACC6] transform ${
                            active || isOpen ? "scale-x-[1]" : "scale-x-0 group-hover:scale-x-[1]"
                          } transition-transform duration-300 origin-left`}
                        ></div>
                      </Link>
                    )}
                  </NavDropdown>
                ) : (
                  <LangLink
                    to={item.path}
                    className="relative flex font-open font-bold group text-white text-[10px] lg:text-sm xl:text-base"
                  >
                    <span style={{ textShadow: "0px 4px 4px rgb(0,0,0,.4)" }}>
                      {item.label}
                    </span>
                    <div
                      className={`${
                        item.underlineClassName || "w-[100px]"
                      } rounded-lg absolute bottom-[-6px] h-[4px] bg-gradient-to-r from-[#3344DC] to-[#50ACC6] transform ${
                        active ? "scale-x-[1]" : "scale-x-0 group-hover:scale-x-[1]"
                      } transition-transform duration-300 origin-left`}
                    ></div>
                  </LangLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

export const items = [
  {
    label: "Qui Sommes-Nous",
    underlineClassName: "w-[100px]",
    items: [
      { label: "Notre Histoire", path: "/who-are-we/our-history" },
      { label: "Principes et Valeurs", path: "/who-are-we/our-values" },
      { label: "Nos Réalisations", path: "/who-are-we/our-achievements" },
      { label: "Notre Équipe", path: "/who-are-we/our-team" },
      { label: "Partenaires", path: "/who-are-we/partners" },
      { label: "Rapport Financier", path: "/who-are-we/financial-report" },
    ],
  },
  {
    label: "Air Marine et Côtière Protégée",
    underlineClassName: "w-[150px]",
    items: [
      {
        label: "Présentation",
        path: "/protected-air-marine-coastal-areas/presentation",
        items: [
          { label: "AMCP de L'archipel Kerkennah", path: "/protected-air-marine-coastal-areas/presentation/amcp" },
          { label: "Partenaires AMCP", path: "/protected-air-marine-coastal-areas/presentation/partners" },
        ],
      },
      {
        label: "Suivi Scientifique",
        path: "/protected-air-marine-coastal-areas/monitoring",
        items: [
          { label: "Suivi Marin", path: "/protected-air-marine-coastal-areas/monitoring/marin" },
          { label: "Suivi Terrestre", path: "/protected-air-marine-coastal-areas/monitoring/terrestre" },
        ],
      },
      { label: "Formation et Campement Scientifique", path: "/protected-air-marine-coastal-areas/training" },
      { label: "Équipe", path: "/protected-air-marine-coastal-areas/team" },
    ],
  },
  {
    label: "Notre Festival",
    path: "/our-festival",
    underlineClassName: "w-[100px]",
    items: [
      { label: "Prochains Festivals", path: "/our-festival/upcoming" },
      { label: "Éditions Précédentes", path: "/our-festival/previous" },
    ],
  },
  { label: "Actualités", path: "/news", underlineClassName: "w-[70px]" },
  {
    label: "Événements",
    path: "/en/event",
    underlineClassName: "w-[100px]",
    items: [
      { label: "Ateliers et Formations", path: "/training-sessions" },
      { label: "Événements Culturels", path: "/culturel-events" },
      { label: "Activités de Loisirs et Sportives", path: "/sport-events" },
      { label: "No event", path: "/event/no-event" },
    ],
  },
  { label: "Opportunités", underlineClassName: "w-[100px]", path: "/opportunities" },
  { label: "Contact", path: "/contact", underlineClassName: "w-[55px]" },
];

function ArrowDown(props: { className?: string }) {
  return (
    <svg viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 6.75L0.75 0.5H13.25L7 6.75Z" fill="white" />
    </svg>
  );
}
