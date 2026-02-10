"use server"

import { adminService } from "@/services/admin.service";
import { PaginatedResponse } from "@/types";
import { IUser } from "@/types/user.type";

export const getAllUserAction = async (): Promise<PaginatedResponse<IUser>> => {
    return await adminService.getAllUser();
}

export const cancelBookingAction = async ( bookingId: string) => {
    return await adminService.cancelBooking(bookingId);
}

export const confirmBookingAction = async ( bookingId: string) => {
    return await adminService.confirmBooking(bookingId);
}
