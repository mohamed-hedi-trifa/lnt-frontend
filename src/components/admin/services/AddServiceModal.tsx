import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Modal from '../../Modal'

export default function AddServiceModal({ show, hide }: { show: boolean, hide: () => void }) {
    function resetServiceInput() {
        setService({
            name: '',
            description: '',
        })
        setErrors([])
    }

    const [serviceInput, setService] = useState({
        name: '',
        description: '',
    })

    const [errors, setErrors] = useState<any>({});

    const handleInput = (e: any) => {
        e.persist()
        setService({ ...serviceInput, [e.target.name]: e.target.value })
    }

    const serviceSubmit = (e: any) => {
        e.preventDefault();

        const data = {
            name: serviceInput.name,
            description: serviceInput.description,
        }

        axios.post('/api/services', data).then(res => {
            Swal.fire("Success", res.data.message, "success")
            resetServiceInput()
            hide();
        }).catch(err => {
            setErrors(err.response.data.errors)
        })
    }

    return (
        <Modal title="Add Service" show={show} hide={hide}>
            <div className='max-w-xl mx-auto h-100 flex justify-center items-center'>
                <form className='flex flex-col gap-4 w-full' onSubmit={serviceSubmit}>
                    <div>
                        <input placeholder='Name' type="text" name="name" onChange={handleInput} value={serviceInput.name} className='block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded' />
                        <span className='text-red-600'>{errors?.name}</span>
                    </div>
                    <div>
                        <textarea placeholder='Description' name="description" onChange={handleInput} value={serviceInput.description} className='block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded' />
                        <span className='text-red-600'>{errors?.description}</span>
                    </div>
                    <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">Add Service</button>
                </form>
            </div>
        </Modal>
    )
}
