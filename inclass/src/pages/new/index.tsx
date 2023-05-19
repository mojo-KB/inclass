import React from 'react'
import Nav from '~/components/Nav'

type Props = {}

function index({ }: Props) {
    return (
        <div>
            <Nav />
            <div className='flex flex-col max-w-sm items-center justify-center mx-auto  gap-4 pt-10'>
                <div className='text-2xl font-bold text-lime-50'>Create a new session</div>
                <div className='flex flex-col min-w-full items-start gap-2'>
                    <div className='flex text-white justify-center items-center w-full '>
                        <div className='font-bold text-2xl pr-5'>Title</div>
                        <input type="text" className='bg-gray-700 rounded-full p-3 text-white w-full' placeholder='Enter the title' />
                    </div>
                    <div className='flex text-white justify-between items-center w-full '>
                        <div className='font-bold text-2xl pr-5'>Duration</div>
                        <input type="number" className='bg-gray-700 rounded-full p-3 text-white w-full basis-3/4' placeholder='Enter time in hours' />
                    </div>

                    <div className='flex text-white justify-between items-center w-full '>
                        <div className='font-bold text-2xl pr-5'>Capasity</div>
                        <input type="number" className='bg-gray-700 rounded-full p-3 text-white w-full basis-3/4' placeholder='Enter the limit of student' />
                    </div>

                </div>
                <button className='primaryBtn text-sm px-10 py-3 rounded-lg'>Create</button>
            </div>
        </div>
    )
}

export default index