import { getUserAction, getUserSession } from '@/action/user.action';
import StudentDetails from '@/components/modules/dashboard/StudentDetails';
import TutorDetails from '@/components/modules/dashboard/TutorDetails';
import BackButton from '@/components/ui/BackButton';
import { Button } from '@/components/ui/button';
import React from 'react'

export default async function UserProfile({params}:{params: Promise<{userId: string}>}) {
    const {userId} = await params;
    const {data:currentUser, error:currentUserError} = await getUserSession();
    const user = currentUser?.user;
   
    

    const userRole = user.role;
    if(userRole !== "ADMIN") {
        return <div className='text-center text-gray-500'>You do not have permission to view this profile.</div>
    }

    const {data:userDetails,error:userDetailsError, message:userDetailsMessage} = await getUserAction(userId)
    if(userDetailsError) {
        return <div className='text-center text-gray-500'>{userDetailsMessage || "Failed to load user details."}</div>
    }
    
  return (
    <div>
      <BackButton />
      {/* <h1 className="text-2xl font-bold mb-4">User Profile</h1> */}
      <div>
        {
          userDetails?.student ? (<StudentDetails studentId={userDetails?.student?.id || ""}/>) :
          userDetails?.tutorProfile ? (<TutorDetails tutorId={userDetails?.tutorProfile?.id || ""}/>) :
          (<div>Admin details</div>)
        }
      </div>
    </div>
  )
}
