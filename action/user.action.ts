"use server"

import { userServices } from "@/services/user.service"
import { IUser } from "@/types/user.type";
import { cookies } from "next/headers";
export const getUserSession = async()=> {
        return await userServices.getSession();
    }

export const healthCheck = async() => {
    const res = (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/health`)).json();
    return res
}

export const logOutUserAction = async() => {

    const res =  await userServices.logout();
    const cookieStore = await await cookies();
    const allCookies = cookieStore.getAll();
    allCookies.forEach(cookie => {
        cookieStore.delete(cookie.name);
    });
    return res;
}

export const getUserAction = async(userId: string): Promise<{data: IUser | null, error: any, message?: string}> => {
    return await userServices.getUser(userId);
}