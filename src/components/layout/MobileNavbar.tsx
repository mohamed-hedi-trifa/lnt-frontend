import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import AccordionNav from "../AccordionNav";

export default function MobileNavbar() {
  return (
    <Popover>
      <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
        <Bars3Icon className="h-8 w-8 text-blue-800" />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="z-50 w-max py-4 px-3 divide-y divide-white/5 rounded-xl bg-zinc-100 text-sm/6 shadow-[0px_3px_4px_rgb(0,0,0,.3)] transition duration-200 ease-in-out [--anchor-padding:4px] [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <div>
          <AccordionNav
            items={items}
            renderItem={(item, level, isOpen) => {
              if (level === 1) {
                return <Item1 item={item} isOpen={isOpen} />;
              } else if (level === 2) {
                return <Item2 item={item} isOpen={isOpen} />;
              } else {
                return <Item3 item={item} isOpen={isOpen} />;
              }
            }}
          />
        </div>
      </PopoverPanel>
    </Popover>
  );
}

function Item1({ item, isOpen }: { item: any; isOpen: boolean }) {
  const hasSubmenu = !!item.items;

  return (
    <div
      className="relative flex gap-2 items-center py-1 px-2 font-bold text-[#006E9F] transition duration-300"
      style={{ textShadow: "0px 3px 3px rgb(0,0,0,.3)" }}
    >
      <span>{item.label}</span>
      {hasSubmenu && (
        <>
          <div className="mt-[0.5] h-0 bg-black flex items-center">
            <ArrowDown className={`size-3.5 duration-[0.4s] ${isOpen ? "-rotate-180" : ""}`} />
          </div>
          <div
            className={`${item.underlineClassName || "w-[100px]"} ${
              isOpen ? "" : "opacity-0"
            } absolute bottom-0 h-[3px] bg-gradient-to-r from-[#006E9F] to-[#51ADC6] transition-all duration-500`}
          ></div>
        </>
      )}
    </div>
  );
}

function Item2({ item, isOpen }: { item: any; isOpen: boolean }) {
  const hasSubmenu = !!item.items;

  return (
    <div
      className="relative flex gap-2 items-center py-1 px-2 ml-[15px] font-semibold transition duration-300"
      style={{ textShadow: "0px 3px 3px rgb(0,0,0,.3)" }}
    >
      <span>
        {"> "}
        {item.label}
      </span>
      {hasSubmenu && (
        <>
          <div className="mt-[0.5] h-0 bg-black flex items-center">
            <ArrowDown className={`size-3.5 duration-[0.4s] ${isOpen ? "-rotate-180" : ""}`} />
          </div>
          <div
            className={`${item.underlineClassName || "w-[100px]"} ${
              isOpen ? "" : "opacity-0"
            } absolute bottom-0 h-[3px] bg-gradient-to-r from-[#006E9F] to-[#51ADC6] transition-all duration-500`}
          ></div>
        </>
      )}
    </div>
  );
}

function Item3({ item, isOpen }: { item: any; isOpen: boolean }) {
  const hasSubmenu = !!item.items;

  return (
    <div
      className="relative flex gap-2 items-center py-1 px-2 ml-[30px] font-medium text-[#5E5D5DEE] transition duration-300"
      style={{ textShadow: "0px 3px 3px rgb(0,0,0,.3)" }}
    >
      <span>
        {">> "}
        {item.label}
      </span>
      {hasSubmenu && (
        <>
          <div className="mt-[0.5] h-0 bg-black flex items-center">
            <ArrowDown className={`size-3.5 duration-[0.4s] ${isOpen ? "-rotate-180" : ""}`} />
          </div>
          <div
            className={`${item.underlineClassName || "w-[100px]"} ${
              isOpen ? "" : "opacity-0"
            } absolute bottom-0 h-[3px] bg-gradient-to-r from-[#006E9F] to-[#51ADC6] transition-all duration-500`}
          ></div>
        </>
      )}
    </div>
  );
}

const items = [
  {
    label: "Qui Sommes-Nous",
    underlineClassName: "w-[100px]",
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
    underlineClassName: "w-[150px]",
    items: [
      {
        label: "Présentation",
        path: "/aire-marine/presentation",
      },
      {
        label: "Suivi Scientifique",
        path: "/aire-marine/suivie",
        items: [
          {
            label: "Suivi Marin",
            path: "/aire-marine/suivie/marin",
          },
          {
            label: "Suivi Terrestre",
            path: "/aire-marine/suivie/terrestre",
          },
        ],
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
    underlineClassName: "w-[100px]",
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
    underlineClassName: "w-[70px]",
  },
  {
    label: "Événements",
    underlineClassName: "w-[100px]",
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
    underlineClassName: "w-[100px]",
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
    underlineClassName: "w-[55px]",
  },
];

function ArrowDown(props: { className?: string }) {
  return (
    <svg viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 6.75L0.75 0.5H13.25L7 6.75Z" fill="currentColor" />
    </svg>
  );
}
