import { env } from "@/env";
import { ISubject } from "@/types/subject.type";
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
    }
}

export default subjectService;