import React from 'react'
import Nav from '~/components/Nav'

type Props = {}

function index({ }: Props) {
    return (
        <div>
            <Nav />
            <div className='flex flex-col max-w-sm items-center justify-center mx-auto  gap-4 pt-10'>
                <div className='text-2xl font-bold text-lime-50'>Join Session Here</div>
                <input type="text" className='bg-gray-700 rounded-full p-3 text-white' placeholder='Enter the session code' />
                <button className='secondaryBtn text-sm px-10 py-3 rounded-lg'>Join</button>
            </div>
        </div>
    )
}

export default index