import ReviewList from '@/components/review/ReviewList'
import { USER_ROLES } from '@/constants';
import { userServices } from '@/services/user.service'
import React from 'react'

export default async function ReviewPage() {
    const {data: session} = await userServices.getSession();
    
    if(!session) {
        return <div className='p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold'>Access Denied</h1>
            <p className='text-gray-600 mt-2'>You must be logged in as a tutor to view this page.</p>
        </div>
    }

    const user = session.user;
    const userId = user.id;
    const {data: userProfile, error: userProfileError} = await userServices.getUser(userId);
    if(userProfileError || !userProfile) {
        return <div className='p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold'>Error</h1>
            <p className='text-gray-600 mt-2'>Failed to load user profile. Please try again later.</p>
        </div>
    }

    if(userProfile.role !==  USER_ROLES.TUTOR) {
        return <div className='p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold'>Access Denied</h1>
            <p className='text-gray-600 mt-2'>You must be logged in as a tutor to view this page.</p>
        </div>
    }
    
    const tutorId = userProfile.tutorProfile?.id;
    if(!tutorId) {
        return <div className='p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold'>No Tutor Profile</h1>
            <p className='text-gray-600 mt-2'>You do not have a tutor profile. Please create one to view reviews.</p>
        </div>
    }
  return (
    <div className='p-6 bg-white dark:bg-accent-foreground rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold'>Tutor Reviews</h1>
        <p className='text-gray-600 mt-2'>Here you can view and manage your reviews from students.</p>
        {/* Reviews content will go here */}
        <div className='mt-6'>
            {/* Example review item */}
            <ReviewList tutorId={tutorId} />
        </div>
    </div>
  )
}
