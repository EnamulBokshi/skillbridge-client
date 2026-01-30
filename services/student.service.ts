import { env } from "@/env";
import { StudentRegistration } from "@/types/user.type";
import { cookies } from "next/headers";
const apiBaseUrl = env.NEXT_PUBLIC_API_URL;
const apiAuthUrl = env.NEXT_PUBLIC_AUTH_URL;
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
            // console.log("Server Response:", response); // Debug log
            if (!response.ok) {
                let errorMessage = 'Failed to create student profile';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    
                    errorMessage = `Failed to create student profile (${response.status})`;
                }
                return {data: null, error: {message: errorMessage}};
            }
            
            // Check if response has content before parsing
            const text = await response.text();
            if (!text) {
                return {data: null, error: {message: 'Server returned empty response'}};
            }
            
            try {
                const data = JSON.parse(text);
                return {data, error: null};
            } catch {
                return {data: null, error: {message: 'Invalid JSON response from server'}};
            }
        } catch (error:any) {
            console.error('Error creating student profile:', error);
            return {data: null, error: {message: 'Student profile creation failed'}};
        }
    }
}


export { studentService };