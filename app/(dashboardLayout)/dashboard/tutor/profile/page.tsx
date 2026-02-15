import { getTutorByIdAction } from '@/action/tutor.action';
import { getUserSession } from '@/action/user.action';
import { TutorProfileUpdateForm } from '@/components/modules/authentication/Update-tutor-profile-form';
import TutorDetails from '@/components/modules/dashboard/TutorDetails';
import TutorInfo from '@/components/modules/tutors/TutorInfo';
import { userServices } from '@/services/user.service';
import { TutorProfile } from '@/types/tutor.type';
import React from 'react'

interface ProfileTutorProps {
  params: Promise<{ tutorId: string }>;
  searchParams: Promise<{
    edit?: boolean;
    tutorId?: string;
  }>

}
export default async function ProfileTutor({ params, searchParams }: ProfileTutorProps) {
  // const { tutorId } = await params;
  const { edit } = await searchParams;
  const {data:currentUser, error:currentUserError} = await getUserSession();

  const user = currentUser?.user;
  const userRole = user.role;
  console.log("Current user role:", userRole);
  console.log("Current user details:", user);
  if(userRole !== "TUTOR") {
      return <div className='text-center text-gray-500'>You do not have permission to view this profile.</div>
  }
  const {data:userDetails, error:userDetailsError, message:userDetailsMessage} = await userServices.getUser(user.id);
  const tutorId = userDetails?.tutorProfile?.id;
  if(!tutorId) {
    return <div className='text-center text-gray-500'>Tutor profile not found.</div>
  }
  const {data:tutorProfile, error} = await getTutorByIdAction(tutorId);
  if(error || !tutorProfile) {
    return <div className='text-center text-gray-500'>Failed to load tutor profile.</div>
  }
const payload: Partial<TutorProfile> = {
    id: tutorProfile.id,
    // userId: tutorProfile.userId,
    firstName: tutorProfile.firstName,
    lastName: tutorProfile.lastName,
    bio: tutorProfile.bio,
    categoryId: tutorProfile.categoryId,
    email: tutorProfile.email || "",
    phone: tutorProfile.phone || "",
    zip: tutorProfile.zip || "",
    address: tutorProfile.address || "",
    profilePicture: tutorProfile.profilePicture || undefined,
    expertiseAreas: tutorProfile.expertiseAreas || [],
    experienceYears: tutorProfile.experienceYears,
    cv: tutorProfile.cv || undefined,
    isFeatured: tutorProfile.isFeatured || false,
  };

  if (edit) {
    // Render the edit form
    return <TutorProfileUpdateForm tutorProfile={payload} userId={user.id} isAdmin={false}/>
  } 
  return (
    <div>
      <TutorDetails tutorId={tutorId} isAdmin={false}/>
    </div>
  )
}
