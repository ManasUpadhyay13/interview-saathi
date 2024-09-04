"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModal'


const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState("")
    const [jobDesc, setJobDesc] = useState("")
    const [jobExperience, setJobExperience] = useState(0)

    const onSubmit = async (e) => {
        e.preventDefault()

        const InputPrompt = "Job Position : " + jobPosition + " , Job description : " + jobDesc + " , Years of expeience : " + jobExperience + ", Depending on this information please give me 5 interivew questions with answers in json format. Give questions and answers as feilds in json"

        const result = await chatSession.sendMessage(InputPrompt)

        console.log(result.response.text())
        // 1:26:24
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
                <h2 className='text-lg text-center'
                    onClick={() => setOpenDialog(true)}
                >+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interivew</DialogTitle>
                        <DialogDescription>

                            <form onSubmit={(e) => onSubmit(e)}>
                                <div>
                                    <h2 className=''>Add details about your job position/role , job description and years of experience</h2>

                                    <div className='mt-7 my-3'>
                                        <label >Job Role/Job Position</label>
                                        <Input placeholder="Ex. Software Engineer" required
                                            onChange={(e) => setJobPosition(e.target.value)}
                                        />
                                    </div>

                                    <div className='mt-7 my-3'>
                                        <label >Job Description/ Tech Stack</label>
                                        <Textarea placeholder="Ex. React , Node js , Python ...." required
                                            onChange={(e) => setJobDesc(e.target.value)}
                                        />
                                    </div>

                                    <div className='mt-7 my-3'>
                                        <label >Years Of experience</label>
                                        <Input placeholder="Ex. 5" type="number" max="50" required
                                            onChange={(e) => setJobExperience(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button variant="ghost" type="button"
                                        onClick={() => setOpenDialog(false)}
                                    >Cancel</Button>

                                    <Button type="submit">Start Interview</Button>

                                </div>
                            </form>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview