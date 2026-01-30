"use server"

import { userServices } from "@/services/user.service"
import { cookies } from "next/headers";
export const getUserSession = async()=> {
        return await userServices.getSession();
    }

export const healthCheck = async() => {
    const res = (await fetch('http://localhost:5000')).json();
    return res
}

export const logOutUserAction = async() => {

    const res =  await userServices.logout();
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    allCookies.forEach(cookie => {
        cookieStore.delete(cookie.name);
    });
    return res;
}