import { StudentProfileUpdateForm } from '@/components/modules/authentication/Update-stduent-form';
import { StudentProfile, StudentStatus } from '@/types/student.type'
import React from 'react'

interface EditStudentProps {
    params: Promise<{studentId: string}>
    searchParams: Promise<StudentProfile>
}

export default async function EditStudent({params, searchParams}: EditStudentProps) {
    const {studentId} = await params;
    const {firstName, lastName, email, phone, zip, address, status,id, profilePicture} = await searchParams;
    const payload:StudentProfile = {
        id: studentId,
        userId: id,
        firstName,
        lastName,
        email,
        phone,
        zip,
        address,
        profilePicture,
        status: status as StudentStatus,
    }
 

  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Edit Student Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
            <StudentProfileUpdateForm profile={payload} />
        </div>
    </div>
  )
}
