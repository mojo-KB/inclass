import { mock } from 'node:test'
import React, { useState } from 'react'
import CountDownTimer from '~/components/CountDownTimer'
import Nav from '~/components/Nav'

type Props = {}

function index({ }: Props) {
    const mockData = {
        title: "machine leaning class",
        studentInSesssion: 5,
        duration: 2
    }

    const [whatToggle, setWhatToggle] = useState(true);
    const [whereToggle, setWhereToggle] = useState(true);
    const [whenToggle, setWhenToggle] = useState(true);
    const [whoToggle, setWhoToggle] = useState(true);
    const [howToggle, setHowToggle] = useState(true);

    return (
        <div>
            <Nav />
            <div className='flex flex-col max-w-5xl items-center justify-center mx-auto  gap-4 pt-10'>
                <div className='text-white min-w-full font-bold text-3xl px-10 flex justify-between'>
                    <div className='italic text-lg'>
                        <div className=''>Title: <span className='font-bold'>{mockData.title}</span></div>
                        <div>Student: <span>{mockData.studentInSesssion}</span></div>
                    </div>


                    <div className='text-lime-400'>
                        <CountDownTimer hours={mockData.duration} />
                    </div>
                </div>

                <div className='min-w-full bg-gray-900 text-white p-10 m-20 mb-5 rounded-lg'>
                    <div>Question: </div>
                </div>


                <form action="" className=''>
                    <div className='space-x-2 flex'>
                        <div className={whatToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhatToggle(!whatToggle)}>What</div>


                        <div className={whereToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhereToggle(!whereToggle)} >Where</div>

                        <div className={whenToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhenToggle(!whenToggle)}>When</div>

                        <div className={whoToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhoToggle(!whoToggle)}>Who</div>

                        <div className={howToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setHowToggle(!howToggle)}>How</div>
                    </div>
                    <input type="textarea" className='w-full p-2 pb-10 my-5 bg-gray-800 text-white rounded-lg' placeholder='Ask questions' />

                    <button className='primaryBtn rounded-lg text-lg p-2' >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default index