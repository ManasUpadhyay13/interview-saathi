"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { chatSession } from '../../../utils/GeminiAiModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '../../../utils/db'
import { MockInterview } from '../../../utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState("")
    const [jobDesc, setJobDesc] = useState("")
    const [jobExperience, setJobExperience] = useState(0)
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])
    const { user } = useUser()
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const InputPrompt = "Job Position : " + jobPosition + " , Job description : " + jobDesc + " , Years of expeience : " + jobExperience + ", Depending on this information please give me 5 interivew questions with answers in json format. Give questions and answers as feilds in json. Dont give me any explanations just the questions and answers in json format."

        const result = await chatSession.sendMessage(InputPrompt)
        const MockJSonReponse = (result.response.text()).replace("```json", '').replace('```', '')
        setJsonResponse(MockJSonReponse)

        if (MockJSonReponse) {
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: MockJSonReponse,
                jobPosition: jobPosition,
                jobDesc: jobDesc,
                jobExperience: jobExperience,
                createdBy: user.primaryEmailAddress.emailAddress,
                createdAt: moment().format("DD-MM-YYYY")
            }).returning({ mockId: MockInterview.mockId })

            if (resp) {
                setOpenDialog(false)
                router.push(`/dashboard/interview/${resp[0]?.mockId}`)
            }
        }



        setLoading(false)

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

                                    <Button type="submit"
                                        disabled={loading}
                                    >
                                        {
                                            (loading) ?
                                                <>
                                                    <LoaderCircle className='animate-spin mr-2' />
                                                    Generating questions
                                                </>
                                                :
                                                "Start Interview"
                                        }
                                    </Button>

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