"use client"

import { Button } from '@/components/ui/button'
import { WebcamIcon } from 'lucide-react'
import React from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'

const RecordAnsSection = () => {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechText,
        stopSpeechText
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    })
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

            <Button variant="outline" className="mt-[-3rem]">Record Answer</Button>
        </div>
    )
}

export default RecordAnsSection