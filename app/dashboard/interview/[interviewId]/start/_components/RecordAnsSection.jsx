"use client"

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { Mic, WebcamIcon } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import toast from 'react-hot-toast'
import Webcam from 'react-webcam'
import { db } from 'utils/db'
import { chatSession } from 'utils/GeminiAiModal'
import { UserAnswer } from 'utils/schema'

const RecordAnsSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {

    const [userAnswer, setUserAnswer] = useState("")
    const user = useUser()
    const [loading, setLoading] = useState(false)

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });


    const startStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText()
        } else {
            startSpeechToText()
        }
    }


    const updateUserAnswerInDB = async () => {
        setLoading(true)

        const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question + ", User answer: " + userAnswer + ", Depending upon the question and the user answer for the given interview question. Please give me a rating for the answer and feedback as area of imporvment, if any, in just 3 to 5 lines to imporvoe it. Give the reponse in json format. "

        const result = await chatSession.sendMessage(feedbackPrompt)

        const mockJsonResponse = result.response.text().replace("```json", '').replace('```', '')
        const jsonFeedbackResponse = JSON.parse(mockJsonResponse)

        const resp = await db.insert(UserAnswer)
            .values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: jsonFeedbackResponse?.feedback,
                rating: jsonFeedbackResponse?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-YYY")
            })

        if (resp) {
            console.log('success')
            toast.success("User answer recorded success")
            // alert()
            setResults([])
        }
        setResults([])
        setUserAnswer("")
        setLoading(false)
    }


    useEffect(() => {
        console.log(results);

        results.map((result) => {
            setUserAnswer(prevAns => prevAns + result.transcript)
            console.log(result.transcript);

        })
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            updateUserAnswerInDB()
        }
    }, [userAnswer])

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg py-5 px-2'>
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: "100%",
                        zIndex: 10,
                    }}
                />
            </div>

            <Button
                disabled={loading}
                variant="outline"
                className="mt-[-3rem]"
                onClick={() => startStopRecording()}
            >
                {isRecording ? (
                    <h2 className='text-red-600 flex gap-2'><Mic /> Stop Recording...</h2>
                ) : (
                    "Record Answer"
                )}
            </Button>

        </div>
    )
}

export default RecordAnsSection