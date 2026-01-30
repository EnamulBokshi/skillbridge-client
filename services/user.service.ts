import { env } from "@/env";
import { cookies } from "next/headers"
const authUrl = env.AUTH_URL;
const cookieStore = await cookies();
export const userServices = {
    getSession: async()=>{
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${authUrl}/get-session`,{
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-store"
            });
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
    logout: async()=>{
        try {
            // const cookieStore = await cookies();
            const res = await fetch(`${authUrl}/signout`, {
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
            return {data: null, error: error.message}
        }
    }
}