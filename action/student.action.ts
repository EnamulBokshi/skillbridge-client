"use server";

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
} from "../services/student.service";


import {
  CreateStudentPayload,
  UpdateStudentPayload,
  CreateReviewPayload,
  StudentProfile,
  StudentDetailedProfile,
  StudentStats,
  StudentBooking,
  StudentReview,
  ApiResponse,
} from "@/types/student.type";

/**
 * Creates a new student
 * @param payload - CreateStudentPayload
 * @returns Promise<ApiResponse<StudentProfile>>
 */
export const createStudentAction = async (
  payload: CreateStudentPayload
): Promise<ApiResponse<StudentProfile>> => {
  return await createStudent(payload);
};

/**
 * Fetches the student profile
 * @param studentId - The student's ID
 * @returns Promise<ApiResponse<StudentDetailedProfile>>
 */
export const getStudentProfileAction = async (
  studentId: string
): Promise<ApiResponse<StudentDetailedProfile>> => {
  return await getStudentProfile(studentId);
};

/**
 * Updates an existing student
 * @param studentId - The student's ID
 * @param payload - UpdateStudentPayload
 * @returns Promise<ApiResponse<StudentProfile>>
 */
export const updateStudentProfileAction = async (
  studentId: string,
  payload: UpdateStudentPayload
): Promise<ApiResponse<StudentProfile>> => {
  return await updateStudentProfile(studentId, payload);
};

/**
 * Deletes a student profile
 * @param studentId - The student's ID
 * @returns Promise<ApiResponse<void>>
 */
export const deleteStudentProfileAction = async (
  studentId: string
): Promise<ApiResponse<void>> => {
  return await deleteStudentProfile(studentId);
};

/**
 * Fetches statistics for a student
 * @param studentId - The student's ID
 * @returns Promise<ApiResponse<StudentStats>>
 */
export const getStudentStatsAction = async (
  studentId: string
): Promise<ApiResponse<StudentStats>> => {
  return await getStudentStats(studentId);
};

/**
 * Fetches completed sessions for a student
 * @param studentId - The student's ID
 * @returns Promise<ApiResponse<StudentBooking[]>>
 */
export const getCompletedSessionsAction = async (
  studentId: string
): Promise<ApiResponse<StudentBooking[]>> => {
  return await getCompletedSessions(studentId);
};

/**
 * Fetches upcoming sessions for a student
 * @param studentId - The student's ID
 * @returns Promise<ApiResponse<StudentBooking[]>>
 */
export const getUpcomingSessionsAction = async (
  studentId: string
): Promise<ApiResponse<StudentBooking[]>> => {
  return await getUpcomingSessions(studentId);
};

/**
 * Creates a review for a tutor
 * @param studentId - The student's ID
 * @param payload - CreateReviewPayload
 * @returns Promise<ApiResponse<StudentReview>>
 */
export const createReviewAction = async (
  studentId: string,
  payload: CreateReviewPayload
): Promise<ApiResponse<StudentReview>> => {
  return await createReview(studentId, payload);
};

/**
 * Cancels a booking
 * @param studentId - The student's ID
 * @param bookingId - The booking's ID
 * @returns Promise<ApiResponse<StudentBooking>>
 */
export const cancelBookingAction = async (
  studentId: string,
  bookingId: string
): Promise<ApiResponse<StudentBooking>> => {
  return await cancelBooking(studentId, bookingId);
};
