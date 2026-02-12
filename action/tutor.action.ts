'use server'

import { tutorService } from "@/services/tutor.service";
import { ApiResponse, PaginatedResponse, SessionSearchParams, TResponse } from "@/types";
import { ISlotResponse, IUpdateSlotPayload, SlotSearchParams } from "@/types/slot.type";
import { Bookings } from "@/types/student.type";
import {
  CreateTutorPayload,
  UpdateTutorPayload,
  UpdateBookingStatusPayload,
  GetTutorsParams,
} from "@/types/tutor.type";
import { updateTag } from "next/dist/server/web/spec-extension/revalidate";

/**
 * CREATE TUTOR PROFILE
 * Creates a new tutor profile
 */
export const createTutorAction = async (tutorData: CreateTutorPayload) => {
  return await tutorService.createTutor(tutorData);
};

/**
 * GET ALL TUTORS
 * Fetches all tutors with optional filtering, sorting, and pagination
 */
export const getTutorsAction = async (params?: GetTutorsParams) => {
  return await tutorService.getTutors(params);
}

/**
 * UPDATE TUTOR PROFILE
 * Updates an existing tutor profile
 */
export const updateTutorAction = async (
  tutorId: string,
  tutorData: UpdateTutorPayload
) => {
  return await tutorService.updateTutor(tutorId, tutorData);
};

/**
 * GET TUTOR BY ID
 * Fetches a tutor profile by ID
 */
export const getTutorByIdAction = async (tutorId: string) => {
  return await tutorService.getTutorById(tutorId);
};

/**
 * DELETE TUTOR
 * Deletes a tutor profile
 */
export const deleteTutorAction = async (tutorId: string) => {
  return await tutorService.deleteTutor(tutorId);
};

/**
 * GET DASHBOARD STATS
 * Fetches tutor dashboard statistics
 */
export const getTutorDashboardStatsAction = async (tutorId: string) => {
  console.log("Fetching dashboard stats for tutor ID:", tutorId);
  return await tutorService.getDashboardStats(tutorId);
};

/**
 * GET UPCOMING BOOKINGS
 * Fetches upcoming bookings for a tutor
 */
export const getTutorUpcomingBookingsAction = async (tutorId: string) => {
  return await tutorService.getUpcomingBookings(tutorId);
};

/**
 * GET COMPLETED BOOKINGS
 * Fetches completed bookings for a tutor
 */
export const getTutorCompletedBookingsAction = async (tutorId: string) => {
  return await tutorService.getCompletedBookings(tutorId);
};

/**
 * GET TUTOR REVIEWS
 * Fetches all reviews for a tutor
 */
export const getTutorReviewsAction = async (tutorId: string) => {
  return await tutorService.getTutorReviews(tutorId);
};

/**
 * GET TUTOR SLOTS
 * Fetches all slots for a tutor
 */
export const getTutorSlotsAction = async (tutorId: string, params?: SlotSearchParams): Promise<PaginatedResponse<ISlotResponse[]>> => {
  return await tutorService.getTutorSlots(tutorId, params);
};

export const updateSlotAction = async(slotId:string, payload:Partial<IUpdateSlotPayload>): Promise<TResponse<ISlotResponse>>=>{
    const result = await tutorService.updateTutorSlot(slotId, payload);
    updateTag('slots');
    return result;
}

/**
 * DELETE TUTOR SLOT
 * Deletes a specific slot for a tutor
 */
export const deleteTutorSlotAction = async (
  // tutorId: string,
  slotId: string
) => {
  return await tutorService.deleteTutorSlot(slotId);
};

/**
 * UPDATE BOOKING STATUS
 * Updates the status of a booking
 */
export const updateBookingStatusAction = async (
  tutorId: string,
  bookingId: string,
  statusData: UpdateBookingStatusPayload
) => {
  return await tutorService.updateBookingStatus(tutorId, bookingId, statusData);
};

/**
 * GET ALL TUTOR BOOKINGS
 * Fetches all bookings for a tutor (all statuses)
 */
export const getAllTutorBookingsAction = async (tutorId: string) => {
  return await tutorService.getAllTutorBookings(tutorId);
};

export const getSessionsAction = async(tutorId: string, params?: SessionSearchParams): Promise<PaginatedResponse<Bookings[]>> => {
  return await tutorService.getAllSessions(tutorId, params);
}

export const confirmBookingAction = async (bookingId: string): Promise<TResponse<Bookings>> => {
  return await tutorService.confirmBooking(bookingId);
}

export const cancelBookingAction = async (bookingId: string): Promise<TResponse<Bookings>> => { 
  return await tutorService.cancelBooking(bookingId);
}

export const markAsCompletedAction = async (bookingId: string): Promise<TResponse<Bookings>> => {
  return await tutorService.markAsCompleted(bookingId);
}