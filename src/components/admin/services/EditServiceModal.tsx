import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Modal from '../../Modal';

export default function EditServiceModal({ toedit, show, hide }: { toedit: any, show: boolean, hide: () => void }) {
    const [serviceInput, setService] = useState({
        name: '',
        description: '',
        order: 0,
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (toedit) {
            setService({
                name: toedit.name,
                description: toedit.description,
                order: toedit.order,
            });
            setLoading(false);
        }
    }, [toedit]);

    const handleInput = (e: any) => {
        e.persist();
        setService({ ...serviceInput, [e.target.name]: e.target.value });
    }

    const updateService = (e: any) => {
        e.preventDefault();
        const data = {
            name: serviceInput.name,
            description: serviceInput.description,
            order: serviceInput.order,
        };
        axios.put(`/api/services/${toedit.id}`, data).then(res => {
            Swal.fire("Success", res.data.message, "success");
            hide();
        }).catch(err => {
            if (err.response.status === 422) {
                Swal.fire("All Fields are mandatory", "", "error");
                setErrors(err.response.data.errors);
            }
            else if (err.response.status === 404) {
                Swal.fire("Error", err.response.data.message, "error");
            }
        });
    }

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <Modal title="Edit Service" show={show} hide={hide}>
            <div className='max-w-xl mx-auto h-100 flex justify-center items-center'>
                <form className='flex flex-col gap-4 w-full' onSubmit={updateService}>
                    <div>
                        <input placeholder='Name' type="text" name="name" onChange={handleInput} value={serviceInput.name} className='block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded' />
                        <span className='text-red-600'>{errors?.name}</span>
                    </div>
                    <div>
                        <textarea placeholder='Description' name="description" onChange={handleInput} value={serviceInput.description} className='block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded' />
                        <span className='text-red-600'>{errors?.description}</span>
                    </div>
                    <div>
                        <input placeholder='Order' type="number" name="order" onChange={handleInput} value={serviceInput.order} className='block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded' />
                        <span className='text-red-600'>{errors?.order}</span>
                    </div>
                    <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">Edit Service</button>
                </form>
            </div>
        </Modal>
    );
}
