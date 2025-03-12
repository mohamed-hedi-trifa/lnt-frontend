import { InboxIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { Link } from "gatsby";

export default function PreviousEditions() {
    const [loading, setLoading] = useState(true);
    const [itemsList, setItemsList] = useState([]);

    function getPreviousEditions() {
        axios
            .get("/api/previous-editions")
            .then((res) => {
                setItemsList(res.data);
                setLoading(false);
            })
            .catch((err) => {
                Swal.fire("Error", err.response.data.message, "error");
            });
    }
    useEffect(() => {
        getPreviousEditions();
        return;
    }, []);

    const deleteItem = (e: any, item: any) => {
        e.preventDefault();

        Swal.fire({
            title: "Delete Edition",
            text: `Are you sure to delete ${item.name_en || item.name_fr} ?`,
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`,
            confirmButtonColor: "#df4759",
            denyButtonColor: "#d9e2ef",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/previous-editions/${item.id}`)
                    .then((res) => {
                        Swal.fire("Success", res.data.message, "success");
                        getPreviousEditions();
                    })
                    .catch((err) => {
                        if (err.response.data.status === 404) {
                            Swal.fire("Erreur", err.response.data.message, "error");
                        } else if (err.response.status === 401) {
                            Swal.fire("Error", err.response.data.message, "error");
                        }
                    });
            } else if (result.isDenied) {
            }
        });
    };
    if (loading) {
        return <ReactLoading type="spinningBubbles" color="white" height={25} width={25} />;
    }

    return (
        <>
            <div className="max-w-[80rem] p-2 sm:p-5 mx-auto">
                <div className="rounded-lg shadow-lg">
                    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-t-lg">
                        <h5 className="mb-3">Previous Editions ( {itemsList.length} )</h5>
                        <Link to="/admin/previous-editions/create" className="bg-blue-600 text-white p-2 rounded">
                            Create Previous Editions
                        </Link>
                    </div>
                    <div className="p-5">
                        {itemsList?.length > 0 ? (
                            <>
                                <div className="mx-0 grid grid-cols-12 text-center break-all">
                                    <div className="pb-3 hidden sm:block text-start col-span-1">ID</div>
                                    <div className="pb-3 text-start col-span-2">Image</div>
                                    <div className="pb-3 text-start col-span-2">place</div>
                                    <div className="pb-3 text-start col-span-5 sm:col-span-3">date</div>
                                    <div className="pb-3 hidden sm:block text-end sm:text-center col-span-2">Actions</div>
                                </div>
                                <div className="divide-y">
                                    {itemsList?.map((item: any) => {
                                        return (
                                            <div key={item.id} className="mx-0 grid grid-cols-12 text-center break-all">
                                                <div className="pt-3 hidden sm:block text-start col-span-1">{item.id}</div>
                                               
                                                <div className="col-span-2 flex justify-center">
                                                    <img className="w-[70px] sm:w-[130px] md:w-[160px]"
                                                        src={`${process.env.GATSBY_API_URL}${item.image}`} alt={item.name_fr || item.name_en} />
                                                </div>
                                                <div className="pt-3 col-span-2 text-start">{item.place_en || item.place_fr}</div>
                                                <div className="pt-3 text-start col-span-5 sm:col-span-3">
                                                    <div className="font-bold">

                                                        {item.start_date} 
                                                      
                                                    </div>{" "}
                                                </div>


                                                <div className="pt-3 text-end sm:text-center col-span-1 sm:col-span-2">
                                              
                                                        
                                             
                                                        <div className="col-span-12 sm:col-span-6 flex justify-end sm:justify-center w-full  gap-3">
                                                        <Link className="text-center" to={`/admin/previous-editions/manage-previous-editions/${item.slug}`}>
                                                                <MagnifyingGlassIcon className="block h-8 w-8 text-blue-600" aria-hidden="true" />
                                                            </Link>
                                                            <Link className="text-center" to={`/admin/previous-editions/${item.slug}`}>
                                                                <PencilSquareIcon className="block h-8 w-8 text-blue-600" aria-hidden="true" />
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    deleteItem(e, item);
                                                                }}
                                                            >
                                                                <TrashIcon className="block h-8 w-8 text-red-600" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                             
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col gap-4 items-center justify-center text-center h-[25vh]">
                                <InboxIcon className="block h-20 w-20" aria-hidden="true" />
                                <h3 className="text-2xl font-bold">Theres no edition</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
