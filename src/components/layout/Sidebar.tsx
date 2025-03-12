import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

const Sidebar = () => {
    const items = [
        {
          label: "Notre Histoire",
          path: "/who-are-we/our-history",
        },
        {
          label: "Principes et Valeurs",
          path: "/who-are-we/our-values",
        },
        {
          label: "Our Mission & Vision",
          path: "/who-are-we/our-mission-and-vision",
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
      ];  

    const [opened, setOpened] = useState(false);

    return (
        <div className='mx-auto sticky top-[65px] sm:top-[120px] h-[100px] sm:h-fit w-[310px] shrink-0 z-20'>
        <div className='h-fit'>
            <div className={`flex flex-col ${opened ? "gap-6" : "gap-0"} sm:gap-8 transition-all duration-300  p-4 sm:p-8 py-2 sm:py-12 rounded-3xl sm:rounded-[20px] text-white shadow-helmi`} style={{ background: 'linear-gradient(90deg, #51ADC6 0%, #006E9F 100%)' }}>
                <section className='flex justify-between w-full items-center'>
                <div className='flex flex-col sm:gap-8'>
                <h2 className="text-[20px] sm:text-2xl font-bold">Qui Somme-Nous</h2>
                <div className='font-medium sm:hidden'>Menu de section</div>
                </div>
                <div className='sm:hidden'><button onClick={()=>setOpened(!opened)}><Bars3Icon className='h-8 w-8 text-black' /> </button></div>
                </section>
                <ul className={`flex flex-col gap-8 overflow-hidden transition-all duration-300 ${opened ? "h-[320px] sm:h-fit" : "h-0 sm:h-fit"}`}>
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <div className='h-6 w-6 rounded-full bg-primary flex justify-center items-center'>
                                <ChevronRightIcon className='h-4 w-4' />
                            </div>
                            <a className="sm:text-xl font-semibold" href={"/en"+item.path}>{item.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
                    </div>
        </div>
    );
};

export default Sidebar;