import { QueriesObserver } from '@tanstack/react-query'
import { create } from 'domain'
import { on } from 'events'
import { useSession } from 'next-auth/react'
import router from 'next/router'
import { mock } from 'node:test'
import React, { useState } from 'react'
import { set } from 'zod'
import CountDownTimer from '~/components/CountDownTimer'
import Nav from '~/components/Nav'
import QuestionCard from '~/components/QuestionCard'
import QuestionCard2 from '~/components/QuestionCard2'
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
    const mockQuestion: any = [];

    const mockData = {
        title: "machine leaning class",
        studentInSesssion: 5,
        duration: 2
    }
    const [whatToggle, setWhatToggle] = useState(false);
    const [whereToggle, setWhereToggle] = useState(false);
    const [whenToggle, setWhenToggle] = useState(false);
    const [whoToggle, setWhoToggle] = useState(false);
    const [howToggle, setHowToggle] = useState(false);

    const [question, setQuestion] = useState("");

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

    const createQuestion = api.question.create.useMutation({
        onSuccess: () => {
            void refetchQuestions()
        }
    })


    const handleClick = () => {
        createQuestion.mutate({
            classId: selectedClass?.id || "",
            content: question,
            signalTime: new Date().toISOString(),
        })
        console.log("CLICK")
        setQuestion("");
    }

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const questionSubfix = [];
        if (whenToggle) questionSubfix.push("When");
        if (whereToggle) questionSubfix.push("Where");
        if (whoToggle) questionSubfix.push("Who");
        if (howToggle) questionSubfix.push("How");
        if (whatToggle) questionSubfix.push("What");
        setQuestion(questionSubfix.join(" and ") + " " + e.currentTarget.value);
    }

    // count down timer
    const currentDate = new Date();
    const durationDate = new Date(selectedClass?.createdAt || 0);
    durationDate.setHours(durationDate.getHours() + (selectedClass?.duration || 0));

    let clock = 0;
    if (currentDate > durationDate) {
        clock = 0
    } else {
        const remainingTimeInMillis = (durationDate.getHours() - currentDate.getHours()) + (durationDate.getMinutes() - currentDate.getMinutes()) / 60 + (durationDate.getSeconds() - currentDate.getSeconds()) / 3600;
        clock = remainingTimeInMillis;
    }

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
                        {/* <CountDownTimer hours={selectedClass?.duration || 0} /> */}
                        {clock === 0 ? <div className='text-red-500'>Class Ended</div> : <CountDownTimer hours={clock} />}

                    </div>
                </div>

                <div className='min-w-full mt-20'>
                    {/* <QuestionCard />
                    <QuestionCard /> */}

                    <div>
                        {
                            questions?.map((question) => (
                                <QuestionCard2 key={question.id} content={question.content} signalTime={question.signalTime}
                                    selectedClass={question}
                                />
                            ))
                        }
                    </div>

                </div>


                <div>
                    <div className='space-x-2 flex'>
                        <div className={!whatToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhatToggle(!whatToggle)}>What</div>


                        <div className={!whereToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhereToggle(!whereToggle)} >Where</div>

                        <div className={!whenToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhenToggle(!whenToggle)}>When</div>

                        <div className={!whoToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setWhoToggle(!whoToggle)}>Who</div>

                        <div className={!howToggle ? 'secondaryBtn2' : 'primaryBtn2'} onClick={() => setHowToggle(!howToggle)}>How</div>
                    </div>
                    <input type="textarea" className='w-full p-2 pb-10 my-5 bg-gray-800 text-white rounded-lg' placeholder='Ask questions' onChange={handleQuestionChange} />

                    <button className='primaryBtn rounded-lg text-lg p-2' onClick={handleClick} >Submit</button>
                </div>
            </div>

            <div className='flex flex-col max-w-5xl items-start justify-center mx-auto  gap-4 pt-10 text-white'>
                <div className='text-2xl font-bold text-lime-500'>Other classes</div>
                {
                    classes?.map((c) => (
                        <li key={c.id} className='text-white list-none italic font-light'>

                            <a
                                className='hover:text-lime-500'
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