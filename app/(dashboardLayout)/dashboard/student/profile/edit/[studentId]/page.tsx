import { StudentProfileUpdateForm } from '@/components/modules/authentication/Update-stduent-form';
import { getStudentProfile } from '@/services/student.service';
import React from 'react'

interface EditStudentProfileProps {
    params: Promise<{studentId: string}>
}


export default async function EditStudentProfile({params}: EditStudentProfileProps) {
        const {studentId} = await params;

        const { data: studentProfile, error } = await getStudentProfile(studentId);
            if (error) {
                return <div>Error loading student profile: {error.message}</div>;
            }

        
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Edit Student Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
            {studentProfile ? (
                <StudentProfileUpdateForm profile={studentProfile} />
            ) : (
                <p>Loading student profile...</p>
            )}
        </div>
    </div>
  )
}
