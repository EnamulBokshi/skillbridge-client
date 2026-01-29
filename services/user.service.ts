import { env } from "@/env";
import { cookies } from "next/headers"
const authUrl = env.AUTH_URL
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
                throw new Error('Session not found!')
            }
            return {data: session, error:null};
            
        } catch (error:any) {
            console.error(error);
            return {data: null, error: error.message}
        }
    }
}