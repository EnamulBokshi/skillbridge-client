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
    console.log("Logging out user...");
    const res =  await userServices.logout();
    const cookieStore = await  cookies();
    const allCookies = cookieStore.getAll();
    allCookies.forEach(cookie => {
        cookieStore.delete(cookie.name);
    });
    console.log("All cookies cleared.");
    return res;
}

import { authClient } from "@/lib/auth-client";


export const getUserAction = async(userId: string): Promise<{data: IUser | null, error: any, message?: string}> => {
    return await userServices.getUser(userId);
}

export const verifyEmailOtpAction = async (payload: { email: string; otp: string }) => {
    return await userServices.verifyEmailOtp(payload);
}

export const resendVerificationOtpAction = async (payload: { email: string }) => {
    return await userServices.resendVerificationOtp(payload);
}

export const forgotPasswordAction = async (payload: { email: string; redirectTo: string }) => {
    return await userServices.forgotPassword(payload);
}

export const resetPasswordAction = async (payload: { token: string; newPassword: string; confirmPassword: string }) => {
    return await userServices.resetPassword(payload);
}

export const changePasswordAction = async (payload: { currentPassword: string; newPassword: string; confirmPassword: string; revokeOtherSessions: boolean }) => {
    return await userServices.changePassword(payload);
}