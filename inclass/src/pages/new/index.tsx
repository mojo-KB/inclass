import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Nav from '~/components/Nav'

import { api, type RouterOutputs } from "~/utils/api";

type Props = {}



function index({ }: Props) {

    const router = useRouter();
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(0);
    const [capasity, setCapasity] = useState(0);


    const createClass = api.class.create.useMutation({});
    const handleClick = () => {
        createClass.mutate({
            title: title,
            duration: duration,
            capsity: capasity
        })
        router.push('/session');

    }
    return (
        <div>
            <Nav />
            <div className='flex flex-col max-w-sm items-center justify-center mx-auto  gap-4 pt-10'>
                <div className='text-2xl font-bold text-lime-50'>Create a new session</div>
                <div className='flex flex-col min-w-full items-start gap-2'>
                    <div className='flex text-white justify-center items-center w-full '>
                        <div className='font-bold text-2xl pr-5'>Title</div>
                        <input type="text" className='bg-gray-700 rounded-full p-3 text-white w-full' placeholder='Enter the title' onChange={(e) => setTitle(e.currentTarget.value)} />
                    </div>
                    <div className='flex text-white justify-between items-center w-full '>
                        <div className='font-bold text-2xl pr-5'>Duration</div>
                        <input type="number" className='bg-gray-700 rounded-full p-3 text-white w-full basis-3/4' placeholder='Enter time in hours' onChange={(e) => setDuration(parseInt(e.currentTarget.value))} />
                    </div>

                    <div className='flex text-white justify-between items-center w-full '>
                        <div className='font-bold text-2xl pr-5'>Capacity</div>
                        <input type="number" className='bg-gray-700 rounded-full p-3 text-white w-full basis-3/4' placeholder='Enter the limit of student' onChange={(e) => setCapasity(parseInt(e.currentTarget.value))} />
                    </div>

                </div>
                <button className='primaryBtn text-sm px-10 py-3 rounded-lg' onClick={handleClick}>Create</button>
            </div>
        </div>
    )
}

export default index




