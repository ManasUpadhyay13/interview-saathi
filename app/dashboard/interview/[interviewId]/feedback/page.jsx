"use client"

import { Button } from '@/components/ui/button'
import { eq } from 'drizzle-orm'
import { ChevronsDownUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { db } from 'utils/db'
import { UserAnswer } from 'utils/schema'

const Feedback = ({ params }) => {

    const [feedbackList, setFeedBackList] = useState([])
    const [activeFeedback, setActiveFeedback] = useState(0)
    const router = useRouter()

    const getFeedback = async () => {
        console.log(params)
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id)
        setFeedBackList(result)
        console.log(result)
    }


    useEffect(() => {
        getFeedback()
    }, [])

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold text-green-500'>Congratulation!</h2>
            <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>


            <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for imporvement.</h2>

            <div className='mt-10 flex flex-col gap-5'>
                {feedbackList.map((item, idx) => (
                    <div key={idx} className='min-h-[5vh]'
                        onClick={() => setActiveFeedback(idx)}
                    >
                        <div className='flex items-center justify-between cursor-pointer px-4 py-2 rounded-md bg-gray-100'>
                            <p>{item.question}</p>
                            <ChevronsDownUp width={16} />
                        </div>

                        {
                            idx === activeFeedback && (
                                <div>
                                    <div className='w-full px-4 py-2 bg-red-50 border border-red-500 my-3 rounded-md'>
                                        <p>Rating :
                                            <span className='text-red-600'>{item.rating}</span>
                                        </p>
                                    </div>

                                    <div className='w-full px-4 py-2 bg-blue-50 border border-blue-500 my-3 rounded-md'>
                                        <p>Your Answer:</p>
                                        <p className='line-through text-blue-700'>{item.userAns}</p>
                                    </div>

                                    <div className='w-full px-4 py-2 bg-green-50 border border-green-500 my-3 rounded-md'>
                                        <p>Correct Answer:</p>
                                        <p className='text-green-700'>{item.correctAns}</p>
                                    </div>
                                </div>
                            )
                        }


                    </div>
                ))}
            </div>

            <div
                className="mt-5 flex justify-end items-center "
            >
                <Button
                    onClick={() => router.push("/dashboard")}
                >Go Home</Button>
            </div>
        </div>
    )
}

export default Feedback