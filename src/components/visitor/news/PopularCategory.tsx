import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HeaderSection from './HeaderSection'
import recentArticle1 from '../../../assets/images/recentArticle2.jpg'
import { Link } from "gatsby";

export default function PopularCategory() {

    const [loading, setLoading] = useState(true);
    const [itemsList, setItemsList] = useState([]);

    function getTheme() {
        axios
            .get("/api/popular-themes")
            .then((res) => {
                setItemsList(res.data);
                setLoading(false);
            })
            .catch((err) => {
                Swal.fire("Error", err.response.data.message, "error");
            });
    }
    useEffect(() => {
        getTheme();
        return;
    }, []);

    return (
        <div className=''>
            <HeaderSection headerName="Catégories Populaires" />
            <div className="flex w-full flex-col mt-8 gap-2">
                {itemsList?.map((item: any) => {
                    return (
                        <Link to={`/news/all-news/${item.id}`}>
                            <div className="relative flex w-full h-[70px]">

                                <div className="z-20 flex items-center justify-between w-full gap-2 px-5 py-0.5 rounded-md">

                                    <div className="text-white font-medium bg-white/20 px-1.5 py-0.5 rounded-lg text-xs">
                                        {item.name_en || item.name_fr}
                                    </div>


                                    <div className="relative w-4 h-4">
                                        <img src="/carousel_images/vector.svg" alt="Previous" className="w-full h-full" />
                                        <img src="/carousel_images/vector.svg" alt="Previous" className="absolute top-full right-full w-3 h-3 opacity-35" />
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-black  rounded-md opacity-40 z-10"></div>


                                <img
                                    src={`${process.env.GATSBY_API_URL}${item?.image}`}
                                    alt={item.name_en || item.name_fr}
                                    className="absolute inset-0 object-cover rounded-md w-full h-full z-1"
                                />

                            </div>

                        </Link>

                    )
                })}

            </div>
        </div >
    )
}
