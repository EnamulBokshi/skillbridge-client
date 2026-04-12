"use server"

import { adminService } from "@/services/admin.service";
import { tutorService } from "@/services/tutor.service";
import { PaginatedResponse, TResponse } from "@/types";
import { AdminDashboardStats } from "@/types/admin-dashboard.type";
import { Bookings, BookingSearchParams } from "@/types/bookings.type";
import { IUser, UserFilterParams } from "@/types/user.type";

export const getAllUserAction = async (params?:UserFilterParams): Promise<PaginatedResponse<IUser>> => {
    return await adminService.getAllUser(params);
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

export const getBookingsAction = async(params?: BookingSearchParams): Promise<PaginatedResponse<Bookings>> => {
     return await adminService.getBookings(params);
}

// ============ SUPER_ADMIN ACTIONS ============

export const getAllAdminsAction = async (page: number = 1, limit: number = 10) => {
    return await adminService.getAllAdmins(page, limit);
}

export const createAdminAction = async (payload: { email: string; name: string; password: string }) => {
    return await adminService.createAdmin(payload);
}

export const updateAdminAction = async (adminId: string, payload: { email?: string; name?: string; status?: string }) => {
    return await adminService.updateAdmin(adminId, payload);
}

export const deleteAdminAction = async (adminId: string) => {
    return await adminService.deleteAdmin(adminId);
}

export const getAllUsersAction = async (params?: UserFilterParams): Promise<PaginatedResponse<IUser>> => {
    return await adminService.getAllUsers(params);
}

export const deleteUserAction = async (userId: string) => {
    return await adminService.deleteUser(userId);
}

export const banUserAction = async (userId: string) => {
    return await adminService.banUser(userId);
}

export const unbanUserAction = async (userId: string) => {
    return await adminService.unbanUser(userId);
}