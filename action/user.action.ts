"use server"

import { userServices } from "@/services/user.service"

export const getUserSession = async()=> {
        return await userServices.getSession();
    }

export const healthCheck = async() => {
    const res = (await fetch('http://localhost:5000')).json();
    return res
}

