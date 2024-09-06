"use client"

import { Button } from '@/components/ui/button'
import { Mic, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'

const RecordAnsSection = () => {

    const [useAnswer, setUserAnswer] = useState("")

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((item) => {
            setUserAnswer(prevAns => prevAns + item?.trasncript)
        })
    }, [results])

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
                variant="outline"
                className="mt-[-3rem]"
                onClick={isRecording ? stopSpeechToText : startSpeechToText}
            // onClick={handleRecordButtonClick}
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