import { getTutorByIdAction } from "@/action/tutor.action";
import { TutorProfileUpdateForm } from "@/components/modules/authentication/Update-tutor-profile-form";
import BackButton from "@/components/ui/BackButton";
import { TutorProfile } from "@/types/tutor.type";
import React from "react";
interface TutorProfileEditProps {
  params: Promise<{ tutorId: string }>;
  // searchParams: Promise<TutorProfile>
}
export default async function TutorProfileEdit({
  params,
}: TutorProfileEditProps) {
  const { tutorId } = await params;
  const { data, error } = await getTutorByIdAction(tutorId);
  // const {bio,categoryId,firstName, lastName, email, phone, zip, address, profilePicture, expertiseAreas, experienceYears, cv} = await searchParams;
  // const payload:TutorProfile = {
  //     id: tutorId,
  //     userId: tutorId,
  //     firstName,
  //     lastName,
  //     bio,
  //     categoryId,
  //     email,
  //     phone,
  //     zip,
  //     address,
  //     profilePicture,
  //     expertiseAreas,
  //     experienceYears,
  //     cv
  // }

  if (error) {
    return <div>Error loading tutor profile: {error.message}</div>;
  }
  if (!data) {
    return (
      <div className="text-center text-gray-500">Tutor profile not found.</div>
    );
  }
  const payload: Partial<TutorProfile> = {
    id: data.id,
    // userId: data.userId,
    firstName: data.firstName,
    lastName: data.lastName,
    bio: data.bio,
    categoryId: data.categoryId,
    email: data.email || "",
    phone: data.phone || "",
    zip: data.zip || "",
    address: data.address || "",
    profilePicture: data.profilePicture || undefined,
    expertiseAreas: data.expertiseAreas || [],
    experienceYears: data.experienceYears,
    cv: data.cv || undefined,
    isFeatured: data.isFeatured || false,
  };

  return (
    <div>
            <BackButton/>
      
      <h1 className="text-2xl font-bold mb-4">Edit Tutor Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <TutorProfileUpdateForm tutorProfile={payload} userId={data.userId} />
      </div>
    </div>
  );
}
