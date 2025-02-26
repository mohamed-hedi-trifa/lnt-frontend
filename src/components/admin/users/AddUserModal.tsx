import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Modal from '../../Modal'

export default function AddUserModal({ show, hide }: { show: boolean, hide: () => void }) {
    function resetUserInput() {
        setUser({
            name: '',
            email: '',
            password: '',
        })
        setErrors([])
    }
    const [userInput, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState<any>({});

    const handleInput = (e: any) => {
        e.persist()
        setUser({ ...userInput, [e.target.name]: e.target.value })
    }

    const userSubmit = (e: any) => {
        e.preventDefault();

        const data = {
            name: userInput.name,
            email: userInput.email,
            password: userInput.password,
        }

        axios.post('/api/users', data).then(res => {

            Swal.fire("Success", res.data.message, "success")
            resetUserInput()
            hide();

        }).catch(err => {
            setErrors(err.response.data.errors)
        })
    }

    return (
        <Modal title="Add User" show={show} hide={hide}>
            <div className='max-w-xl mx-auto h-100 flex justify-center items-center'>

                <form className='flex flex-col gap-4 w-full' onSubmit={userSubmit}>
                    <div>
                        <input placeholder='Name' type="text" name="name" onChange={handleInput} value={userInput.name} className='block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' />
                        <span className='text-red-600'>{errors?.name}</span>
                    </div>
                    <div>
                        <input placeholder='Adresse email' type="text" name="email" onChange={handleInput} value={userInput.email} className='block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' />
                        <span className='text-red-600'>{errors?.email}</span>
                    </div>
                    <div>
                        <input placeholder='Mot de passe' type="" name="password" onChange={handleInput} value={userInput.password} className='block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' />
                        <span className='text-red-600'>{errors?.password}</span>
                    </div>
                    <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">Add User</button>

                </form>
            </div>
        </Modal>

    )
}
