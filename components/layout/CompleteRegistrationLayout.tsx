"use client"

import  { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {  FieldLabel } from '../ui/field'
import { StudentProfileForm } from '../modules/authentication/Student-profile-form'
import { TutorProfileForm } from '../modules/authentication/TutorProfile-form'

export default function CompleteRegistrationLayout() {
    const [designation, setDesignation] = useState<"student" | "tutor"> ('student')
  return (

   <Card className='rounded-md p-8 shadow-2xl '>
        <CardHeader>
            <CardTitle>Become an associate </CardTitle>
            <CardDescription>Select your designation and Complete your profile</CardDescription>
            <hr/>
            <CardContent className='mt-4'>
                <div>
                 <strong>I am registering as a:</strong>
                    <div className='mt-2 mb-4 text-sm text-gray-600'>
                        Please select whether you are signing up as a student looking for courses or a tutor offering courses.
                    </div>
                     <div className='flex flex-col gap-4'>
                        <div>
                          <input 
                            type="radio" 
                            id="student" 
                            name="designation" 
                            value="student" 
                            checked={designation === 'student'}
                            onChange={()=> setDesignation('student')}
                            
                          />
                          <FieldLabel htmlFor="student" className='ml-2'>Student</FieldLabel>
                        </div>

                        <div>
                          <input 
                            type="radio" 
                            id="tutor" 
                            name="designation" 
                            value="tutor" 
                            checked={designation === 'tutor'}
                            onChange={()=> setDesignation('tutor')}
                          />
                          <FieldLabel htmlFor="tutor" className='ml-2'>Tutor</FieldLabel>
                        </div>
                      </div>
                </div>

                <div className='mt-6'>
                  {designation === 'student' ? (
                    // Render Student Profile Form
                    <StudentProfileForm />
                  ) : (
                    // Render Tutor Profile Form
                    <TutorProfileForm />
                  )}
                </div>
            </CardContent>
                
        </CardHeader>
   </Card>
  )
}
