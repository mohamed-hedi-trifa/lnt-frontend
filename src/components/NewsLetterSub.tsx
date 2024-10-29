import React, { useState } from 'react'
import Button from './Button'
import axios from "axios"
import Input from './Input'

export default function NewsLetterSub() {

    const [email, setEmail] = useState("");

    function subscribe() {
        const data = new FormData();

        data.append("email", email);

        axios.post("/api/newsletter/subscribe", data).then((res) => {
            console.log("successfully subscribed to news letter");
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='max-w-xl mx-auto flex flex-col gap-2'>
            <Input label='Email' type='email' onChange={(e: any) => setEmail(e.target.value)} />
            <div className='flex justify-center'><Button type='button' onClick={subscribe}>Subscribe to news letter</Button></div>
        </div>
    )
}
