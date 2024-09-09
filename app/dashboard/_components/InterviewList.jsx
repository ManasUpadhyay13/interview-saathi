"use client"

import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { db } from 'utils/db'
import { MockInterview } from 'utils/schema'
import InterviewItemCard from './InterviewItemCard'

const InterviewList = () => {
    const [interviewList, setInterviewList] = useState([])
    const { user } = useUser()

    const getInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id))

        setInterviewList(result)

    }

    useEffect(() => {
        user && getInterviewList()
    }, [user])

    return (
        <div>
            {
                interviewList.length > 0 && (
                    <>
                        <h2 className='font-medium text-xl '>Previous Mock Interview</h2>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                            {interviewList && interviewList.map((item, idx) => (
                                <InterviewItemCard
                                    interview={item}
                                    key={idx} />
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default InterviewList