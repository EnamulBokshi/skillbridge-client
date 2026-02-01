import { env } from "@/env";
import { StudentRegistration } from "@/types/user.type";
import { cookies } from "next/headers";
const apiBaseUrl = env.NEXT_PUBLIC_API_URL;
const studentService = {
    createStudent: async (studentData: StudentRegistration) => {
        try {
            const cookieStore = await cookies();
            // console.log("Student Data:", studentData); // Debug log
            const response = await fetch(`${apiBaseUrl}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(studentData)
            })
            const resonseData = await response.json(); 
            console.log("Response Data from createStudent:", resonseData); // Debug log
            
            if (!response.ok) {
                
                return {data: null, error: {message: resonseData.message || 'Failed to create student profile'}};
            }
            return {data: resonseData.data, error: null};
        } catch (error:any) {
            console.error('Error creating student profile:', error);
            return {data: null, error: {message: 'Student profile creation failed'}};
        }
    }
}


export { studentService };