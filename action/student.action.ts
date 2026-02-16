"use server";

import { PaginatedResponse, SessionSearchParams, TResponse } from "@/types";
import {
  createStudent,
  getStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
  getStudentStats,
  getCompletedSessions,
  getUpcomingSessions,
  createReview,
  cancelBooking,
  getAllSessions,
} from "../services/student.service";


import {
  CreateStudentPayload,
  UpdateStudentPayload,
  CreateReviewPayload,
  StudentProfile,
  StudentDetailedProfile,
  StudentStats,
  
  StudentReview,
  ApiResponse,
  BookingStatus,
} from "@/types/student.type";
import { Bookings } from "@/types/bookings.type";
import { SlotSearchParams } from "@/types/slot.type";

/**
 * Creates a new student
 * @param payload - CreateStudentPayload
 * @returns Promise<ApiResponse<StudentProfile>>
 */
export const createStudentAction = async (
  payload: CreateStudentPayload
): Promise<TResponse<StudentProfile>> => {
  return await createStudent(payload);
};

/**
 * Fetches the student profile
 * @param studentId - The student's ID
 * @returns Promise<TResponse<StudentDetailedProfile>>
 */
export const getStudentProfileAction = async (
  studentId: string
): Promise<TResponse<StudentDetailedProfile>> => {
  return await getStudentProfile(studentId);
};

/**
 * Updates an existing student
 * @param studentId - The student's ID
 * @param payload - UpdateStudentPayload
 * @returns Promise<TResponse<StudentProfile>>
 */
export const updateStudentProfileAction = async (
  studentId: string,
  payload: UpdateStudentPayload
): Promise<TResponse<StudentProfile>> => {
  return await updateStudentProfile(studentId, payload);
};

/**
 * Deletes a student profile
 * @param studentId - The student's ID
 * @returns Promise<TResponse<void>>
 */
export const deleteStudentProfileAction = async (
  studentId: string
): Promise<TResponse<void>> => {
  return await deleteStudentProfile(studentId);
};

/**
 * Fetches statistics for a student
 * @param studentId - The student's ID
 * @returns Promise<TResponse<StudentStats>>
 */
export const getStudentStatsAction = async (
  studentId: string
): Promise<TResponse<StudentStats>> => {
  return await getStudentStats(studentId);
};

/**
 * Fetches completed sessions for a student
 * @param studentId - The student's ID
 * @returns Promise<TResponse<StudentBooking[]>>
 */
export const getCompletedSessionsAction = async (
  studentId: string
): Promise<PaginatedResponse<Bookings>> => {
  return await getCompletedSessions(studentId);
};

/**
 * Fetches upcoming sessions for a student
 * @param studentId - The student's ID
 * @returns Promise<TResponse<StudentBooking[]>>
 */
export const getUpcomingSessionsAction = async (
  studentId: string
): Promise<TResponse<Bookings[]>> => {
  return await getUpcomingSessions(studentId);
};

export const getAllSesssionAction = async (
  studentId: string,
  params?: SessionSearchParams
):Promise<PaginatedResponse<Bookings>> => {
  return await getAllSessions(studentId, params);
}
  

/**
 * Creates a review for a tutor
 * @param studentId - The student's ID
 * @param payload - CreateReviewPayload
 * @returns Promise<TResponse<StudentReview>>
 */
export const createReviewAction = async (
  studentId: string,
  payload: CreateReviewPayload
): Promise<TResponse<StudentReview>> => {
  return await createReview(studentId, payload);
};

/**
 * Cancels a booking
 * @param studentId - The student's ID
 * @param bookingId - The booking's ID
 * @returns Promise<TResponse<StudentBooking>>
 */
export const cancelBookingAction = async (
  bookingId: string
): Promise<TResponse<Bookings>> => {
  return await cancelBooking( bookingId);
};
