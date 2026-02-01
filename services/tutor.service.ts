import { env } from "@/env";
import {  TutorRegistration } from "@/types/user.type";
import { cookies } from "next/dist/server/request/cookies";
const apiBaseUrl = env.NEXT_PUBLIC_API_URL;
const tutorService = {
    createTutor: async (tutorData: TutorRegistration) => {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${apiBaseUrl}/tutors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(tutorData),
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create tutor profile');
            }
            const data = await response.json();
            console.log("Response Data from createTutor:", data); // Debug log
            return {data: data.data, error: null};
        } catch (error:any) {
            console.error('Error creating tutor profile:', error);
           return {data: null, error: {message: error.message || 'Tutor profile creation failed'}};

        }
    }
}


export { tutorService };