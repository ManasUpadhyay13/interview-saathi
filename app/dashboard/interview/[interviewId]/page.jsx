"use client"

import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const Interview = ({ params }) => {

    const [interviewData, setInterviewData] = useState()
    const [webcamEnabled, setWebCamEnabled] = useState(false)

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        console.log(result);
        setInterviewData(result[0])

    }

    useEffect(() => {
        getInterviewDetails()
    }, [])

    return (
        <div className='my-10 '>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>


                <div className='flex flex-col my-5 gap-5 '>
                    <div className='flex flex-col p-5 rounded-lg border gap-5'>

                        <h2 className='text-lg'> <strong>Job Role/ Job position</strong> - {interviewData?.jobPosition}</h2>
                        <h2 className='text-lg'> <strong>Job Description/ Tech Stack</strong> - {interviewData?.jobDesc}</h2>
                        <h2 className='text-lg'> <strong>Experience</strong> - {interviewData?.jobExperience}</h2>
                    </div>

                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /> <span> <strong>Information</strong></span></h2>
                        <h2 className='mt-3 text-yellow-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit optio nulla sint corrupti qui voluptates non recusandae minima? Sapiente deleniti magni libero facilis optio porro doloribus voluptate fugiat eveniet repellendus.</h2>
                    </div>
                </div>

                <div className=''>
                    {
                        webcamEnabled ? (
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                style={{
                                    height: 300,
                                    width: 300,
                                }}
                                mirrored={true}
                            />
                        ) : (
                            <>
                                <WebcamIcon className='h-72 my-7 w-full p-20 bg-secondary rounded-lg border' />

                                <Button
                                    className="w-full"
                                    variant="ghost"
                                    onClick={() => setWebCamEnabled(true)}
                                >Enalbe Web cam and Microphone</Button>
                            </>
                        )
                    }
                </div>
            </div>

            <div className='flex justify-end items-end'>
                <Button>Start Interview</Button>
            </div>
        </div>
    )
}

export default Interview