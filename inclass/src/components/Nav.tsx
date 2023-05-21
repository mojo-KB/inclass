import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from "next/image";
import { useRouter } from 'next/router';

type Props = {}

function Nav({ }: Props) {
    const { data: sessionData } = useSession();
    const router = useRouter();

    return (
        <div className='max-w-7xl mx-auto text whitespace-nowrap'>
            <div className='p-10 flex items-center justify-between'>
                <button className="text-4xl font-bold text-lime-400"
                    onClick={() => router.push('/')}
                >inClass?</button>

                <div className='px-5 text-white flex space-x-10 items-center'>
                    <button className='text-lime-400' onClick={() => router.push('/session')}>Explore all sessions</button>


                    <div className='flex items-center space-x-2'>
                        <div className='text-white font-bold'>
                            {sessionData?.user?.name ? `Logged in as ${sessionData.user.name}` : "Getting started"}
                        </div>

                        <div className=" gap-2">
                            <div className="dropdown-end dropdown">
                                {
                                    sessionData?.user ? (
                                        <label
                                            tabIndex={0}
                                            className="btn-ghost btn-circle avatar btn"
                                            onClick={() => void signOut()}
                                        > <div className="w-10 rounded-full">
                                                <Image
                                                    className='rounded-full'
                                                    width="50"
                                                    height="50"
                                                    src={sessionData.user.image ?? ""}
                                                    alt={sessionData.user.name ?? ""}
                                                />
                                            </div>
                                        </label>
                                    ) : (<button
                                        className="bg-gray-800 p-3 rounded-lg text-lime-400 font-semibold"
                                        onClick={() => void signIn()}>
                                        sign in
                                    </button>)
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Nav