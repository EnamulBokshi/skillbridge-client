import { env } from "@/env";
import { ISubject, OSubject } from "@/types/subject.type";
import { ServerResponse } from "@/types";
import { cookies } from "next/headers";
const subjectService = {
    createSubject: async(data: ISubject)=> {
        try {
            const cookieStore = await cookies();
            const respone = await fetch(`${env.NEXT_PUBLIC_API_URL}/subjects`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });
            
            const result: ServerResponse = await respone.json();
            return {data: result.data, error: result.error, success: result.success, message: result.message};
        } catch (error) {
            console.error("Error creating subject:", error);
            return {data: null, error, success: false, message: 'Failed to create subject'};
        }
    },
    getSubjects: async()=>{
        try{
            const cookieStore = await cookies();
            const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/subjects`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString(),
                },
                next: {tags: ['subjects']}

            });

            const result: ServerResponse = await response.json();
            return {data: result.data, error: result.error, success: result.success, message: result.message};
        }catch(error:  any){
            console.error("Error fetching subjects:", error);
            return {data: null, error, success: false, message: 'Failed to fetch subjects'};
        }
    },
    deleteSubject: async(subjectId: string)=>{
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/subjects/${subjectId}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString(),
                },
            });

            const result: ServerResponse = await response.json();
            return {data: result.data, error: result.error, success: result.success, message: result.message};
        } catch (error) {
            console.error("Error deleting subject:", error);
            return {data: null, error, success: false, message: 'Failed to delete subject'};
        }
    },
    updateSubject: async(subjectId: string, data: OSubject)=>{
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/subjects/${subjectId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const result: ServerResponse = await response.json();
            return {data: result.data, error: result.error, success: result.success, message: result.message};
        } catch (error) {
            console.error("Error updating subject:", error);
            return {data: null, error, success: false, message: 'Failed to update subject'};
        }
    }
}

export default subjectService;