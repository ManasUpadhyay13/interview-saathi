"use client"

import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import { db } from 'utils/db'
import { UserAnswer } from 'utils/schema'

const Feedback = ({ params }) => {

    const getFeedback = async () => {
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.intervewId)).orderBy(UserAnswer.id)

        console.log(result);

    }


    useEffect(() => {
        getFeedback()
    }, [])

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold text-green-500'>Congratulation!</h2>
            <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

            <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong> </h2>

            <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for imporvement.</h2>
        </div>
    )
}

export default Feedback