import React from 'react'

type Props = {
    content: string,
    signalTime: string
}
function QuestionCard2({ content, signalTime }: Props) {
    const [showReply, setShowReply] = React.useState(false)
    const handleClick = () => {
        setShowReply(!showReply)
    }
    return (
        <div className='m-1'>
            <div className='min-w-full bg-gray-900 text-white p-10  rounded-lg flex items-center justify-between' onClick={handleClick} >

                <div className='flex items-center space-x-5'>
                    <div className='text-xl font-bold'>Question: </div>
                    <div className='text-blue-400 text-xl'><span>{content}</span>?</div>
                </div>

                <div className='font-bold text-red-500'>{signalTime}</div>
            </div>

            <div className={!showReply ? 'hidden min-w-full' : 'inline-block min-w-full'}>
                <div className='text-white m-1 mx-20 p-3 rounded-lg shadow-sm flex items-center justify-between'>
                    <input type="text" className='flex-1 bg-transparent border-gray-700 border-2 text-white rounded-full p-1 px-3' />
                    <button className='secondaryBtn2 font-normal text-sm ml-3'>Reply</button>
                </div>
                <div className='mb-5'>
                    <div className='text-white bg-gray-900 m-1 mx-20 p-3 rounded-lg shadow-sm'>Respones</div>
                </div>

            </div>

            <div>
            </div>

        </div>
    )
}

export default QuestionCard2