import { QueriesObserver } from '@tanstack/react-query'
import { on } from 'events'
import { useSession } from 'next-auth/react'
import { mock } from 'node:test'
import React, { useState } from 'react'
import CountDownTimer from '~/components/CountDownTimer'
import Nav from '~/components/Nav'
import QuestionCard from '~/components/QuestionCard'
import { type RouterOutputs, api } from '~/utils/api'

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



    const { data: classes, refetch: refetchClass } = api.class.getAll.useQuery(





    );

    return (
        // <div>
        //     <Nav />
        //     <div className='flex flex-col max-w-5xl items-center justify-center mx-auto  gap-4 pt-10'>

        //         <div className='text-white min-w-full font-bold text-3xl px-10 flex justify-between'>
        //             <div className='italic text-lg'>
        //                 <div className=''>Title: <span className='font-bold'>{mockData.title}</span></div>
        //                 <div>Student: <span>{mockData.studentInSesssion}</span></div>
        //             </div>


        //             <div className='text-lime-400'>
        //                 <CountDownTimer hours={mockData.duration} />
        //             </div>
        //         </div>

        //         <div className='min-w-full mt-20'>
        //             <QuestionCard />
        //             <QuestionCard />
        //         </div>


        //         <form action="" className=''>
        //             <div className='space-x-2 flex'>
        //                 <div className={whatToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhatToggle(!whatToggle)}>What</div>


        //                 <div className={whereToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhereToggle(!whereToggle)} >Where</div>

        //                 <div className={whenToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhenToggle(!whenToggle)}>When</div>

        //                 <div className={whoToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhoToggle(!whoToggle)}>Who</div>

        //                 <div className={howToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setHowToggle(!howToggle)}>How</div>
        //             </div>
        //             <input type="textarea" className='w-full p-2 pb-10 my-5 bg-gray-800 text-white rounded-lg' placeholder='Ask questions' />

        //             <button className='primaryBtn rounded-lg text-lg p-2' >Submit</button>
        //         </form>
        //     </div>

        //     <div className='flex flex-col max-w-5xl items-center justify-center mx-auto  gap-4 pt-10 text-white'>{JSON.stringify(classes)}</div>

        // </div>
        <Content />

    )
}

export default index;
type Class = RouterOutputs["class"]["getAll"][0];

const Content: React.FC = () => {
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


    const { data: sessionData } = useSession();

    const [selectedClass, setSelectedClass] = useState<Class | null>(null);

    const { data: classes, refetch: refetchClass } = api.class.getAll.useQuery(
        undefined,
        {
            enabled: sessionData?.user !== undefined,
            onSuccess: (data) => {
                setSelectedClass(selectedClass ?? data[0] ?? null)
            }
        }
    )
    const { data: questions, refetch: refetchQuestions } = api.question.getAll.useQuery(
        {
            // getAll works on the array of questions maching the classId
            classId: selectedClass?.id || "",
        },
        {
            enabled: sessionData?.user !== undefined && selectedClass !== null
        })

    const createQustion = api.question.create.useMutation({
        onSuccess: () => {
            void refetchQuestions()
        }
    })


    return (
        <div>
            <Nav />
            <div className='flex flex-col max-w-5xl items-center justify-center mx-auto  gap-4 pt-10'>

                <div className='text-white min-w-full font-bold text-3xl px-10 flex justify-between'>
                    <div className='italic text-lg'>
                        <div className=''>Title: <span className='font-bold'>{selectedClass?.title}</span></div>
                        <div>Student: <span>{selectedClass?.capasity}</span></div>
                    </div>


                    <div className='text-lime-400'>
                        <CountDownTimer hours={selectedClass?.duration || 0} />
                    </div>
                </div>

                <div className='min-w-full mt-20'>
                    <QuestionCard />
                    <QuestionCard />
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

            <div className='flex flex-col max-w-5xl items-start justify-center mx-auto  gap-4 pt-10 text-white'>
                <div className='text-3xl font-bold text-lime-500'>Other classes</div>
                {
                    classes?.map((c) => (
                        <li key={c.id}>
                            <a
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setSelectedClass(c);
                                }}
                            >
                                {c.title}
                            </a>

                        </li>
                    ))
                }
            </div>

        </div>


    )
}