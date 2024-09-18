"use client"

import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { db } from 'utils/db'
import { MockInterview } from 'utils/schema'
import QuestionSection from './_components/QuestionSection'
import RecordAnsSection from './_components/RecordAnsSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const StartInterview = ({ params }) => {

    const [interviewData, setInterviewData] = useState()
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState()
    const [activeQuestionIndex, setActiveActiveQuestionIndex] = useState(0)

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        console.log(result[0].jsonMockResp);

        const jsonMockResponse = JSON.parse(result[0].jsonMockResp)
        setMockInterviewQuestion(jsonMockResponse)
        setInterviewData(result[0])
    }

    useEffect(() => {
        getInterviewDetails()
    }, [])

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                {/* questions */}

                <QuestionSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />

                {/* video / audio recording */}

                <RecordAnsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>

            <div className='flex justify-end gap-6'>

                {
                    activeQuestionIndex > 0 && (
                        <Button
                            onClick={() => setActiveActiveQuestionIndex(activeQuestionIndex - 1)}
                        >Previous Question</Button>
                    )
                }

                {
                    activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
                        <Button
                            onClick={() => setActiveActiveQuestionIndex(activeQuestionIndex + 1)}
                        >Next Question</Button>
                    )
                }

                {
                    activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
                        <Link href={'/dashboard/interview/' + interviewData?.mockId + "/feedback"}>
                            <Button>End Interview</Button>
                        </Link>
                    )
                }
            </div>
        </>
    )
}

export default StartInterview