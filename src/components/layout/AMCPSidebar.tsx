import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import React, { useEffect, useMemo, useState } from "react";
import { useSidebar } from "../../contexts/AMCPSidebarContext";
import { Link } from "gatsby";
import axios from "axios";

type SidebarItemProps = { item: any; basePath?: string; depth?: number };

function SidebarItem({ item, basePath = "/en", depth = 0 }: SidebarItemProps) {
  const initialOpen = typeof window !== "undefined" ? window.location.pathname.includes(item.path) : false;
  const [open, setOpen] = useState(initialOpen);
  const hasSubmenu = Array.isArray(item.items) && item.items.length > 0;
  const circleSize = depth === 0 ? "h-6 w-6" : "h-4 w-4";
  const circleColor = depth === 0 ? "bg-primary" : "bg-white";
  const iconColor = depth === 0 ? "text-white" : "text-primary";
  const iconSize = depth === 0 ? "h-4 w-4" : "h-3 w-3";
  const labelClasses = depth === 0 ? "sm:text-xl font-semibold" : "sm:text-lg font-medium";
  const itemMargin = depth === 0 ? "" : "ml-[14px]";

  return (
    <li className="flex flex-col relative">
      <div className={`flex relative items-center gap-2 cursor-pointer ${itemMargin}`} onClick={() => hasSubmenu && setOpen(!open)}>
        {depth > 0 && <span className="absolute left-[-0.7rem] top-1/2 -translate-y-1/2 w-4 h-[2px] bg-white"></span>}
        <div className={`${circleSize} rounded-full ${circleColor} flex justify-center items-center shrink-0 transition-transform duration-300`}>
          <ChevronRightIcon className={`${iconSize} ${iconColor} transform transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
        </div>
        <Link className={labelClasses} to={item.path && depth === 2 ? item.path : item.path ? basePath + item.path : "#"}>
          {item.label}
        </Link>
      </div>
      {hasSubmenu && (
        <div
          className="relative pl-8 mt-2 flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
          }}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-4">
              {item.items.map((subItem: any, subIndex: number) => (
                <SidebarItem
                  key={subIndex}
                  item={subItem}
                  basePath={basePath}
                  depth={depth + 1}
                />
              ))}
            </ul>
          </div>
          {hasSubmenu && (
            <div className="absolute top-0 left-[36px] ml-[-32px] w-[32px] flex justify-end h-full z-50">
              <div className="bg-white h-[calc(100%-11px)] sm:h-[calc(100%-13px)] w-[2px]"></div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

const AMCPSidebar = () => {
  const { opened, setOpened } = useSidebar();
  const [researches, setResearches] = useState<{ marin: any; terrestre: any }>({ marin: [], terrestre: [] });

  async function fetchResearches() {
    try {
      const res = await axios.get("/api/species");
      const obj = res.data.reduce(
        (acc: any, el: any) => {
          acc[el.type].push(el);
          return acc;
        },
        {
          marin: [],
          terrestre: [],
        }
      );
      setResearches(obj);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchResearches();
  }, []);

  const items = useMemo<any>(() => {
    const arr = defaultItems;
    const marin = researches.marin?.map((el: any) => ({
      label: el.title_en || el.title_fr,
      path: "/protected-air-marine-coastal-areas/monitoring/marin/" + el.slug,
    }));
    const terrestre = researches.terrestre?.map((el: any) => ({
      label: el.title_en || el.title_fr,
      path: "/protected-air-marine-coastal-areas/monitoring/terrestre/" + el.slug,
    }));
    arr[1].items![0] = { ...arr[1].items![0], items: marin };
    arr[1].items![1] = { ...arr[1].items![1], items: terrestre };
    return arr;
  }, [researches]);

  return (
    <div className="mx-auto sticky top-[65px] sm:top-[120px] h-[100px] sm:h-fit w-[296px] sm:w-[366px] shrink-0 z-20">
      <div className="h-fit">
        <div
          className={`flex flex-col ${opened ? "gap-6" : "gap-0"} sm:gap-8 transition-all duration-300 p-4 sm:p-8 py-2 sm:py-12 rounded-3xl sm:rounded-[20px] text-white shadow-helmi`}
          style={{ background: "linear-gradient(90deg, #51ADC6 0%, #006E9F 100%)" }}
        >
          <section className="flex justify-between w-full items-center">
            <div className="flex flex-col sm:gap-8">
              <h2 className="text-[20px] sm:text-2xl font-bold text-center">Air Marine et Côtière Protégée</h2>
              <div className="font-medium sm:hidden">Menu de section</div>
            </div>
            <div className="sm:hidden">
              <button onClick={() => setOpened(!opened)}>
                <Bars3Icon className="h-8 w-8 text-black" />
              </button>
            </div>
          </section>
          <ul className={`flex flex-col gap-8 overflow-hidden transition-all duration-300 ${opened ? "h-[320px] sm:h-fit" : "h-0 sm:h-fit"}`}>
            {items.map((item: any, index: number) => (
              <SidebarItem key={index} item={item} basePath="/en" depth={0} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AMCPSidebar;

const defaultItems = [
  {
    label: "Présentation",
    path: "/protected-air-marine-coastal-areas/presentation",
    items: [
      {
        label: "Aire Marine et Côtière Protégée des Îlots Nord de l'archipel de Kerkennah (AMCP)",
        path: "/protected-air-marine-coastal-areas/presentation/amcp",
      },
      {
        label: "Partenaires AMCP",
        path: "/protected-air-marine-coastal-areas/presentation/partners",
      },
    ],
  },
  {
    label: "Suivi Scientifique",
    path: "/protected-air-marine-coastal-areas/monitoring",
    items: [
      {
        label: "Suivi Marin",
        path: "/protected-air-marine-coastal-areas/monitoring/marin",
        items: [],
      },
      {
        label: "Suivi Terrestre",
        path: "/protected-air-marine-coastal-areas/monitoring/terrestre",
        items: [],
      },
    ],
  },
  {
    label: "Formation et Campement Scientifique",
    path: "/protected-air-marine-coastal-areas/training",
  },
  {
    label: "L’équipe",
    path: "/protected-air-marine-coastal-areas/team",
  },
];
