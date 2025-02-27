import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import ButtonDropdown from '@/components/ButtonDropdown'
import sortIcon from "@/assets/icons/sort-icon.png"
import FilterIcon from '@/assets/icons/FilterIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'

import PreviousEditionSidebar from './PreviousEditionSidebar'
import PastEditionsCarousel from '../PastEditionsCarousel';
import FestivalCardCarousel from '../FestivalCardCarousel';
import PreviousEditionCard from './PreviousEditionCard';




export default function DisplayEditionList() {


    const [edition, setEdition] = useState([]);
    const [prevEditions, setprevEditions] = useState([]);

    const getEdition = async () => {
        try {
            const res = await axios.get("/api/get-current-edition");
            setEdition(res.data);

        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed to fetch Edition", "error");
        }
    };

    const getprevEditions = async () => {
        try {
            const res = await axios.get("/api/previous-editions");
            setprevEditions(res.data);

        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed to fetch Edition", "error");
        }
    };
    const formatDateRange = (startDate, endDate) => {
        const options = { day: "numeric", month: "long", year: "numeric" };

        const start = new Date(startDate);
        const end = new Date(endDate);

        const isSameYear = start.getFullYear() === end.getFullYear();
        const isSameMonth = start.getMonth() === end.getMonth() && isSameYear;

        if (isSameMonth) {
            return `Du ${start.getDate()} au ${end.toLocaleDateString("fr-FR", options)}`;
        } else if (isSameYear) {
            return `Du ${start.getDate()} ${start.toLocaleDateString("fr-FR", { month: "long" })} au ${end.toLocaleDateString("fr-FR", options)}`;
        } else {
            return `Du ${start.toLocaleDateString("fr-FR", options)} au ${end.toLocaleDateString("fr-FR", options)}`;
        }
    };




    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        getEdition();
        getprevEditions();
        if (isOpened) {
            document.querySelector("body")!.style.overflow = "hidden";
        } else {
            document.querySelector("body")!.style.overflow = "visible";
        }
    }, [])

    // useEffect(() => {
    //     getEdition();
    //     getprevEditions();
    //   }, []);

    const CATEGORIES = [
        {
            id: 1,
            name: "All themes"
        },
        {
            id: 2,
            name: "Conservation Marine"
        },
        {
            id: 3,
            name: "Tourisme Responsable"
        },
        {
            id: 4,
            name: "Peche Durable"
        },
        {
            id: 5,
            name: "Ecologie et Environmenet"
        },
        {
            id: 6,
            name: "Education et Formation"
        }
    ]
    return (
        <div className='w-full '>



            <div className='flex justify-between  '>
                <PreviousEditionSidebar isOpened={isOpened} setIsOpened={setIsOpened} />

                <section className="">
                    <div className='hidden sm:flex justify-between relative z-20'>
                        <ButtonDropdown
                            items={CATEGORIES}
                            position="left"
                            renderItem={(item) => (
                                <div className='py-1 px-4'> {item.name}</div>
                            )}
                        >
                            {(isOpen) => (
                                <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                                    <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                                        <div className='text-primary'> <img src={sortIcon} className='size-6' /> </div>
                                        <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">Trier</div>
                                        <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? "-rotate-180" : ""}`}><ArrowDownIcon /></div>
                                    </div>
                                </button>
                            )}
                        </ButtonDropdown>

                        <div className="text-center text-black text-xl font-semibold font-['Montserrat'] leading-tight tracking-tight mt-[2px]">1 - 12 de 150 Publication</div>
                    </div>
                    <div className='sm:hidden flex justify-between pr-5 relative z-20'>
                        <button type='button' onClick={() => setIsOpened(true)} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
                            <FilterIcon />
                            <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
                        </button>
                        <ButtonDropdown
                            items={CATEGORIES}
                            position="right"
                            renderItem={(item) => (
                                <div className='py-1 px-4'> {item.name}</div>
                            )}
                        >
                            {(isOpen) => (
                                <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                                    <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                                        <div className='text-primary'> <img src={sortIcon} className='size-6' /> </div>
                                        <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">Trier</div>
                                        <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? "-rotate-180" : ""}`}><ArrowDownIcon /></div>
                                    </div>
                                </button>
                            )}
                        </ButtonDropdown>
                    </div>
                    <div className='sm:hidden px-5 font-semibold leading-[20px] pt-5 sm:text-center text-start '>1 - 12 de 150 Publication</div>

                    <div className='sm:mx-0 mx-6'>
                        {prevEditions?.map((edition, index) => (
                            <PreviousEditionCard

                                date={formatDateRange(edition.start_date, edition.end_date)}
                                description={edition.card_description_en || edition.card_description_fr}
                                titre={edition.name_en || edition.name_fr}
                                lieu={edition.place_en || edition.place_fr}
                                slug={edition.slug} 
                            />
                        ))}
                    </div>

                </section>
            </div>

        </div>
    )
}
