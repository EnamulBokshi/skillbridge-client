"use server";
import { env } from "@/env";
import { cookies } from "next/headers";
import {
  CreateStudentPayload,
  UpdateStudentPayload,
  StudentProfile,
  StudentDetailedProfile,
  StudentStats,
  StudentBooking,
  CreateReviewPayload,
  StudentReview,
  ApiResponse,
} from "@/types/student.type";

const apiBaseUrl = env.NEXT_PUBLIC_API_URL;

/**
 * Creates a new student
 * @param payload - CreateStudentPayload
 * @returns Promise<ApiResponse<StudentProfile>>
 */
export const createStudent = async (
  payload: CreateStudentPayload
): Promise<ApiResponse<StudentProfile>> => {
  const cookieStore = await cookies();
  const response = await fetch(`${apiBaseUrl}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  return (await response.json()) as ApiResponse<StudentProfile>;
};

/**
 * Fetches the student profile based on studentId
 * @param studentId - The student's ID
 * @returns Promise<ApiResponse<StudentDetailedProfile>>
 */
export const getStudentProfile = async (
  studentId: string
): Promise<ApiResponse<StudentDetailedProfile>> => {
  const cookieStore = await cookies();
  const response = await fetch(`${apiBaseUrl}/students/${studentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  return (await response.json()) as ApiResponse<StudentDetailedProfile>;
};

/**
 * Updates an existing student
 * @param studentId - The student's ID
 * @param payload - UpdateStudentPayload
 * @returns Promise<ApiResponse<StudentProfile>>
 */
export const updateStudentProfile = async (
  studentId: string,
  payload: UpdateStudentPayload
): Promise<ApiResponse<StudentProfile>> => {
  const cookieStore = await cookies();
  const response = await fetch(`${apiBaseUrl}/students/${studentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  return (await response.json()) as ApiResponse<StudentProfile>;
};

/**
 * Deletes a student profile
 * @param studentId - The student's ID
 * @returns Promise<ApiResponse<void>>
 */
export const deleteStudentProfile = async (
  studentId: string
): Promise<ApiResponse<void>> => {
  const cookieStore = await cookies();
  const response = await fetch(`${apiBaseUrl}/students/${studentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  return (await response.json()) as ApiResponse<void>;
};

/**
 * Fetches statistics for a student
 * @param studentId - The student's ID
 * @returns Promise<ApiResponse<StudentStats>>
 */
export const getStudentStats = async (
  studentId: string
): Promise<ApiResponse<StudentStats>> => {
  const cookieStore = await cookies();
  const response = await fetch(`${apiBaseUrl}/students/${studentId}/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  return (await response.json()) as ApiResponse<StudentStats>;
};


export const getCompletedSessions = async (
  studentId: string
): Promise<ApiResponse<StudentBooking[]>> => {
  const cookieStore = await cookies();
  const response = await fetch(
    `${apiBaseUrl}/students/${studentId}/sessions?status=COMPLETED`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    }
  );

  return (await response.json()) as ApiResponse<StudentBooking[]>;
};


export const getUpcomingSessions = async (
  studentId: string
): Promise<ApiResponse<StudentBooking[]>> => {
  const cookieStore = await cookies();
  const response = await fetch(
    `${apiBaseUrl}/students/${studentId}/sessions?status=PENDING,CONFIRMED`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    }
  );

  return (await response.json()) as ApiResponse<StudentBooking[]>;
};


export const createReview = async (
  studentId: string,
  payload: CreateReviewPayload
): Promise<ApiResponse<StudentReview>> => {
  const cookieStore = await cookies();
  const response = await fetch(`${apiBaseUrl}/students/${studentId}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  return (await response.json()) as ApiResponse<StudentReview>;
};

/**
 * Cancels a booking
 * @param studentId - The student's ID
 * @param bookingId - The booking's ID
 * @returns Promise<ApiResponse<StudentBooking>>
 */
export const cancelBooking = async (
  studentId: string,
  bookingId: string
): Promise<ApiResponse<StudentBooking>> => {
  const cookieStore = await cookies();
  const response = await fetch(
    `${apiBaseUrl}/students/${studentId}/bookings/${bookingId}/cancel`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    }
  );

  return (await response.json()) as ApiResponse<StudentBooking>;
};
