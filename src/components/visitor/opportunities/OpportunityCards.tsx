import React, { useEffect, useState } from 'react'

import axios from "axios"


import { Link } from 'gatsby';
import opportunity1 from '../../../assets/images/opportunity.jpg'
import opportunity2 from '../../../assets/images/opportunity2.jpg'
import opportunity3 from '../../../assets/images/opportunity3.jpg'
import opportunity4 from '../../../assets/images/opportunity3.jpg'



import Pagination from '../Pagination';
import OpportunityCard from './OpportunityCard';

export default function OpportunityCards() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10); // Set the limit of posts per page

    const opportunities = [
        {
            type: "Offres d'Emploi",
            status: "active",
            title: "Coordinateur pour MedFund Co-Management Agreement",
            description: "Nous recrutons un coordinateur pour superviser les projets liés à la préservation marine et à la biodiversité dans l'archipel de Kerkennah",
            place: "Kerkennah, Tunisie",
            expired_date: "2025-03-15",
            image: opportunity1
        },
        {
            type: "Offres d'Emploi",
            status: "active",
            title: "Appel d'Offres : Création d'un Site Web",
            description: "Participez à l'appel d'offres pour concevoir le site web interactif et multilingue de l'AKDDCL",
            place: "Sousse, Tunisia",
            expired_date: "2025-04-01",
            image: opportunity2
        },
        {
            type: "Offres de Stages",
            status: "inactive",
            title: "Opportunités de Stage avec l'AKDDC",
            description: "Rejoignez nos équipes pour des stages dédiés à la préservation marine et à la gestion des écosystèmes insulaires",
            place: "Paris, France",
            expired_date: "2024-12-31",
            image: opportunity3
        },
        {
            type: "Offres de Stages",
            status: "active",
            title: "Coordinateur pour MedFund Co-Management Agreement",
            description: "Nous recrutons un coordinateur pour superviser les projets liés à la préservation marine et à la biodiversité dans l'archipel de Kerkennah.",
            place: "Nabeul, Tunisia",
            expired_date: "2025-02-28",
            image: opportunity4
        },
        {
            type: "Offres d'Emploi",
            status: "inactive",
            title: "Appel à Consultation : Formation en Gestion et Durabilité",
            description: "Participez à notre consultation pour développer des sessions sur la gestion durable et les exigences légales des associations",
            place: "Online",
            expired_date: "2024-11-30",
            image: opportunity4
        },
        {
            type: "Offres de Stages",
            status: "active",
            title: "Coordinateur pour MedFund Co-Management Agreement",
            description: "Nous recrutons un coordinateur pour superviser les projets liés à la préservation marine et à la biodiversité dans l'archipel de Kerkennah.",
            place: "Nabeul, Tunisia",
            expired_date: "2025-02-28",
            image: opportunity4
        },
    ];



    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const [loading, setLoading] = useState(true);
    const [itemsList, setItemsList] = useState([]);

    function getPosts(query: any, page = currentPage) {
        setLoading(true);
        axios.get(`/api/get-active-posts/${limit ? limit : ""}`, {
            params: { query, page }
        }).then(res => {
            setItemsList(res.data.data);
            console.log(res.data.data)
            setTotalPages(res.data.last_page); // Get total pages from response
            setLoading(false);
        }).catch(err => {
            // Swal.fire('Error', err?.response?.data?.message, "error");
            setLoading(false);
        });
    }

    useEffect(() => {
        getPosts(searchQuery, currentPage);
    }, [searchQuery, currentPage]);

    if (loading) return "Loading..."
    const lang = typeof window !== 'undefined' && location?.pathname.startsWith("/fr/") ? "fr" : "en";
    return (
        <section className='flex flex-col  w-full relative z-10 my-5 sm:my-10 col-span-1'>

            <div className='grid sm:grid-cols-2 gap-4 px-4 sm:px-0'>
           
                {opportunities.map((opportunity) => (
             
                        <OpportunityCard opportunity={opportunity} />
                 
                ))}
            </div>

            <div className='flex justify-center px-4 sm:px-0 mt-5'><Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /></div>
        </section>
    )
}
