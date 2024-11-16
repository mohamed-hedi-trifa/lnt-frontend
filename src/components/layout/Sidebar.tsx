import { ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Sidebar = () => {
    const items = [
        "Notre Histoire",
        "Principes et Valeurs",
        "Nos Réalisations",
        "Notre Équipe",
        "Partenaires",
        "Rapports Financiers"
    ];

    return (
        <div className='sticky top-[120px]   h-fit'>
            <div className="flex flex-col gap-6 w-[310px] p-8 py-12 rounded-lg text-white" style={{ background: 'linear-gradient(90deg, #51ADC6 0%, #006E9F 100%)' }}>

                <h2 className="text-2xl font-bold mb-4">Qui Somme-Nous</h2>
                <ul className="flex flex-col gap-8">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <div className='h-6 w-6 rounded-full bg-primary flex justify-center items-center'>
                                <ChevronRightIcon className='h-4 w-4' />
                            </div>
                            <a className="text-xl font-semibold" href='#'>{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;