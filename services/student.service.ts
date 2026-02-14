"use server";
import { env } from "@/env";
import { cookies } from "next/headers";
import {
  CreateStudentPayload,
  UpdateStudentPayload,
  StudentProfile,
  StudentDetailedProfile,
  StudentStats,
  CreateReviewPayload,
  StudentReview,
  ApiResponse,
  BookingStatus,
} from "@/types/student.type";
import { Bookings } from "@/types/bookings.type";
import { PaginatedResponse, SessionSearchParams } from "@/types";
import handleParams from "@/helper/handleSearchParams";

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
): Promise<PaginatedResponse<Bookings[]>> => {
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

  return (await response.json()) as PaginatedResponse<Bookings[]>;
};

export const getAllSessions = async (
  studentId: string,
  params?: SessionSearchParams
):Promise<PaginatedResponse<Bookings[]>> => {
  const url = new URL(`${apiBaseUrl}/students/${studentId}/sessions`);
  const paramUrl = handleParams(url.toString(),params)
  console.log("Fetching all sessions with URL:", paramUrl);
  
  const cookieStore = await cookies();
  const response = await fetch(
    paramUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: {tags: [`student-sessions-${studentId}`]}
    }
  );

  return (await response.json()) as Promise<PaginatedResponse<Bookings[]>>;
};

export const getUpcomingSessions = async (
  studentId: string
): Promise<ApiResponse<Bookings[]>> => {
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

  return (await response.json()) as ApiResponse<Bookings[]>;
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
 * @param bookingId - The booking's ID
 * @returns Promise<ApiResponse<Bookings>>
 */
export const cancelBooking = async (
  bookingId: string
): Promise<ApiResponse<Bookings>> => {
  const cookieStore = await cookies();
  const response = await fetch(
    `${apiBaseUrl}/students/sessions/${bookingId}/cancel`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    }
  );

  return (await response.json()) as ApiResponse<Bookings>;
};
