import { getTutorReviewsAction } from '@/action/tutor.action'
import React from 'react'
import { Loading } from '../common/Loading';

export default async function ReviewList({tutorId}: {tutorId: string}) {
    const {data: reviews, error: reviewsError, message: reviewsMessage} = await getTutorReviewsAction(tutorId);
    if(!reviews) {
        return <Loading />
    }
  return (
    <div>
        {reviews.map((review) => (
            <div key={review.id} className='border p-4 rounded-lg mb-4'>
                <div className='flex items-center mb-2'>
                    <img src={review.student.profilePicture || '/default-avatar.png'} alt={review.student.firstName + ' ' + review.student.lastName} className='w-10 h-10 rounded-full mr-3' />
                    <div>
                        <h3 className='text-lg font-semibold'>{review.student.firstName} {review.student.lastName}</h3>
                        <p className='text-sm text-gray-600'>{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <p className='text-gray-800'>{review.comment}</p>
                <div className='mt-2 flex items-center'>
                    <span className='text-yellow-500 mr-1'>⭐</span>
                    <span>{review.rating}</span>
                </div>
            </div>
        ))}

    </div>
  )
}
