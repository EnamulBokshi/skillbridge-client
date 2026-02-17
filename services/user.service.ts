import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { IUser } from "@/types/user.type";
import { cookies } from "next/headers"

export const userServices = {
    getSession: async()=>{
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/auth/get-session`,{
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-store",

            });
            // const session = await authClient.getSession();
            const session = await res.json();
            if(!session){
                return {data: null, error: {message: 'No active session found'}};
            }
            return {data: session, error:null};
            
        } catch (error:any) {
            console.error(error);
            return {data: null, error: error.message}
        }
    },
    getUser: async(userId:string):Promise<{data: IUser | null, error: any, message?: string}> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/v1/users/${userId}`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: 'no-store'
            });
            const response = await res.json();
            return {
                data: response.data,
                error: null,
                message: response.message
            }
        } catch (error:any) {
            return {data:null, error: error.message, message: error.message}
        }
    },
    logout: async()=>{
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/auth/signout`, {
                method: 'POST',
                headers: {
                    Cookie: cookieStore.toString()
                }
            });
            // Clear cookies
            // const cookies = (cookieStore).getAll();
            // cookies.forEach(cookie => {
            //     (cookieStore).delete(cookie.name);
            // });
            return {data: {success: true}, error: null};
        } catch (error:any) {
            console.error(error);
            return {data: null, error: error.message, message: error.message};
        }
    }
}