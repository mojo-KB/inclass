import React from 'react'

type Props = {}

function QuestionCard({ }: Props) {
    return (
        <div className='min-w-full bg-gray-900 text-white p-10 mb-5 rounded-lg flex items-center justify-between'>

            <div className='flex items-center space-x-5'>
                <div className='text-xl font-bold'>Question: </div>
                <div>What is inClass?</div>
            </div>

            <div className='font-bold text-red-500'>1:58:04</div>
        </div>
    )
}

export default QuestionCard