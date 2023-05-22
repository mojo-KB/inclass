import { on } from 'events';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { set } from 'zod';
import { type RouterOutputs, api } from '~/utils/api'

type Props = {
    content: string,
    signalTime: string,
    selectedClass: RouterOutputs["question"]["getAll"][0] | null,
}
type Question = RouterOutputs["question"]["getAll"][0];
function QuestionCard2({ content, signalTime, selectedClass }: Props) {
    // format the time
    const time = new Date(signalTime).toLocaleTimeString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })


    const convertTime = (time: string | number | Date) => {
        return new Date(time).toLocaleTimeString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }


    const [showReply, setShowReply] = React.useState(false)
    const handleClick = () => {
        setShowReply(!showReply)
        setSelectedQuestion(selectedClass)
    }

    const [reply, setReply] = useState("");

    const { data: sessionData } = useSession();
    const [selectedQuestion, setSelectedQuestion] = React.useState<Question | null>(null)
    const { data: questions, refetch: refetchQuestions } = api.question.getAll.useQuery(
        {
            // getAll works on the array of questions maching the classId
            classId: selectedClass?.id || "",
        },
        {
            enabled: sessionData?.user !== undefined && selectedClass !== null,
            onSuccess: (data) => {
                setSelectedQuestion(selectedQuestion ?? data[0] ?? null)
            }
        }
    )



    const { data: replies, refetch: refetchReply } = api.reply.getAll.useQuery(
        {
            questionId: selectedQuestion?.id || "",
        }, {
        enabled: sessionData?.user !== undefined && selectedQuestion !== null,

    },

    )

    const createReply = api.reply.create.useMutation({
        onSuccess: () => {
            void refetchReply()
        }
    })

    const handleReply = () => {
        createReply.mutate({
            questionId: selectedQuestion?.id || "",
            content: reply,
        })
        setReply("");
    }

    const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setReply(event.currentTarget.value);
    }

    const clockQuestion = selectedClass?.clock || 0;
    const hours = Math.floor(clockQuestion);
    const minutes = Math.floor((clockQuestion - hours) * 60);
    const seconds = Math.floor((((clockQuestion - hours) * 60) - minutes) * 60);
    return (
        <div className='m-5'>
            <div className='min-w-full bg-gray-900 text-white p-5  rounded-lg flex items-center justify-between' onClick={handleClick} >
                <div className='flex flex-col items-start justify-start'>
                    <div className='flex items-center space-x-5'>
                        <div className='text-xl font-bold'>Question: </div>
                        <div className='text-white text-lg'><span>{content}</span>?</div>
                    </div>

                    <div className='font-extralight text-gray-500 italic text-sm'>{time}</div>
                </div>



                {clockQuestion > 0 ? <div className='font-bold text-red-500'>{hours + ":" + minutes + ":" + seconds}</div> : <div className='font-bold text-red-500'>After Class question</div>}

            </div>

            <div className={!showReply ? 'hidden min-w-full' : 'inline-block min-w-full'}>
                <div className='text-white m-1 mx-20 p-3 rounded-lg shadow-sm flex items-center justify-between'>
                    <input type="text" className='flex-1 bg-transparent border-gray-700 border-2 text-white rounded-full p-1 px-3' placeholder='Answer' onChange={handleReplyChange} />
                    <button className='secondaryBtn2 font-normal text-sm ml-3'
                        onClick={handleReply}
                    >Reply</button>
                </div>


                {replies?.map((reply) => (
                    <div className='mb-5'>
                        <div className='text-white bg-gray-900 m-1 mx-20 p-3 rounded-lg shadow-sm'>
                            {reply.content}
                            <div className='font-extralight text-gray-500 italic text-sm'>{convertTime(reply.createdAt)}</div>
                        </div>
                    </div>
                ))}

                {/* <div className='mb-5'>
                    <div className='text-white bg-gray-900 m-1 mx-20 p-3 rounded-lg shadow-sm'>Respones</div>
                </div> */}

            </div>

            <div>
            </div>

        </div>
    )
}

export default QuestionCard2