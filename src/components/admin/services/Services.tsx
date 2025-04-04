import { InboxIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import ReactLoading from "react-loading"
import AddServiceModal from './AddServiceModal';
import EditServiceModal from './EditServiceModal';

export default function Services() {

    const [loading, setLoading] = useState(true);
    const [itemsList, setItemsList] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [toEdit, setToEdit] = useState({
        name: "",
        order: 0,
        description: "",
    });

    function getServices() {
        axios.get('/api/services').then(res => {
            setItemsList(res.data.data); // Using res.data.data
            setLoading(false);
        }).catch(err => {
            Swal.fire('Error', err.response.data.message, "error")
        })
    }

    useEffect(() => {
        getServices();
        return;
    }, [])

    const deleteItem = (e: any, item: any) => {
        e.preventDefault();

        Swal.fire({
            title: 'Delete Service',
            text: `Are you sure to delete ${item.name} ?`,
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
            confirmButtonColor: '#df4759',
            denyButtonColor: '#d9e2ef',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/services/${item.id}`).then(res => {
                    Swal.fire("Success", res.data.message, "success");
                    getServices();
                }).catch(err => {
                    if (err.response.data.status === 404) {
                        Swal.fire("Erreur", err.response.data.message, "error")
                    }
                    else if (err.response.status === 401) {
                        Swal.fire("Error", err.response.data.message, "error");
                    }
                });
            }
        });
    }

    if (loading) {
        return   "Loading...";
    }

    return (
        <>
            <div className="max-w-[80rem] p-5 mx-auto">
                <div className='rounded-lg shadow-lg'>
                    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-t-lg">
                        <h5 className=''>Services ( {itemsList?.length} )</h5>
                        <button type='button' className='bg-blue-600 text-white p-2 rounded' onClick={() => { setModalShow(true) }}>Add Service</button>
                    </div>
                    <div className="p-5">
                        {itemsList?.length > 0 ? (
                            <>
                                <div className='mx-0 grid grid-cols-12 text-center break-all'>
                                    <div className='pb-3 hidden md:block text-start col-span-1'>ID</div>
                                    <div className='pb-3 text-start col-span-6 md:col-span-4'>Service</div>
                                    <div className='pb-3 col-span-3 md:col-span-4'>Order</div>
                                    <div className='pb-3 text-end sm:text-center col-span-3'>Actions</div>
                                </div>
                                <div className='divide-y'>
                                    {itemsList?.map((item: any) => (
                                        <div key={item?.id} className="mx-0 grid grid-cols-12 text-center break-all">
                                            <div className='pt-3 hidden md:block text-start col-span-1'>{item?.id}</div>
                                            <div className='pt-3 text-start col-span-6 md:col-span-4'>
                                                <div className='flex flex-col items-start'>
                                                    <div className='font-bold'>{item?.name}</div>
                                                    <div>{item.description}</div>
                                                </div>
                                            </div>
                                            <div className='pt-3 col-span-3 md:col-span-4'>{item?.order}</div>
                                            <div className='pt-3 text-end sm:text-center col-span-3'>
                                                <div className='grid grid-cols-12'>
                                                    <div className='col-span-12 sm:col-span-6 text-end sm:text-center'>
                                                        <button type='button' className='btn p-0' onClick={(e) => { setToEdit(item); setEditModalShow(true) }}>
                                                            <PencilSquareIcon className="block h-8 w-8 text-blue-600" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                    <div className='col-span-12 sm:col-span-6 text-end sm:text-center'>
                                                        <button type='button' className='btn p-0' onClick={(e) => { deleteItem(e, item); }}>
                                                            <TrashIcon className="block h-8 w-8 text-red-600" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col gap-4 items-center justify-center text-center h-[25vh]">
                                <InboxIcon className="block h-20 w-20" aria-hidden="true" />
                                <h3 className='text-2xl font-bold'>There are no services</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <AddServiceModal show={modalShow} hide={() => { setModalShow(false); getServices() }} />
            <EditServiceModal show={editModalShow} hide={() => { setEditModalShow(false); getServices() }} toedit={toEdit} />
        </>
    )
}
