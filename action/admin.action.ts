"use server"

import { adminService } from "@/services/admin.service";
import { tutorService } from "@/services/tutor.service";
import { PaginatedResponse, TResponse } from "@/types";
import { AdminDashboardStats } from "@/types/admin-dashboard.type";
import { Bookings, BookingSearchParams } from "@/types/bookings.type";
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

export const getDashboardStatsAction = async(): Promise<TResponse<AdminDashboardStats>> => {
    return await adminService.getDashboardStats();
}

export const updateUserAction = async(userId: string, payload: Partial<IUser>): Promise<TResponse<IUser>> => {
    return await adminService.updateUser(userId, payload);
}

export const getTutorReviewsAction = async (tutorId: string) => {
  return await tutorService.getTutorReviews(tutorId);
}

export const getBookingsAction = async(params?: BookingSearchParams): Promise<PaginatedResponse<Bookings[]>> => {
     return await adminService.getBookings(params);
}