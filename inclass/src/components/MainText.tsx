import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { useRouter } from 'next/router';
type Props = {}

function MainText({ }: Props) {
    const router = useRouter();
    const [text, count] = useTypewriter({
        words: ["who", "what", "when", "why", "how"],
        loop: true,
        delaySpeed: 1500
    })
    return (
        <div>
            <div className='text-white p-20 max-w-5xl font-extralight text-5xl'>
                <span className='text-lime-400 font-bold text-6xl'>inClass?</span> asking <span className='text-lime-400 text-6xl'>{text}</span><Cursor /> questions without interupting
            </div>

            <div className='p-20 pt-5 space-x-5'>
                <button className='primaryBtn' onClick={() => router.push('/new')}>New Session</button>
                <button className='secondaryBtn' onClick={() => router.push('/join')}>Join Session</button>
            </div>
        </div>
    )
}

export default MainText