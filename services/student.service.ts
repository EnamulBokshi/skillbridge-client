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
import { PaginatedResponse, SessionSearchParams, TResponse } from "@/types";
import handleParams from "@/helper/handleSearchParams";

const apiBaseUrl = env.NEXT_PUBLIC_API_URL;

/**
 * Creates a new student
 * @param payload - CreateStudentPayload
 * @returns Promise<ApiResponse<StudentProfile>>
 */
export const createStudent = async (
  payload: CreateStudentPayload,
): Promise<TResponse<StudentProfile>> => {
  try {
    const cookieStore = cookies();
    const response = await fetch(`${apiBaseUrl}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    return (await response.json()) as TResponse<StudentProfile>;
  } catch (error: any) {
    console.error("Error creating student profile:", error);
    return {
      data: null,
      error:
        error.message ||
        "An error occurred while creating the student profile.",
      message:
        error.message ||
        "An error occurred while creating the student profile.",
    };
  }
};

/**
 * Fetches the student profile based on studentId
 * @param studentId - The student's ID
 * @returns Promise<TResponse<StudentDetailedProfile>>
 */
export const getStudentProfile = async (
  studentId: string,
): Promise<TResponse<StudentDetailedProfile>> => {
  try {
    const cookieStore = cookies();
    const response = await fetch(`${apiBaseUrl}/students/${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    return (await response.json()) as TResponse<StudentDetailedProfile>;
  } catch (error: any) {
    return {
      data: null,
      error:
        error.message ||
        "An error occurred while fetching the student profile.",
      message:
        error.message ||
        "An error occurred while fetching the student profile.",
    };
  }
};

/**
 * Updates an existing student
 * @param studentId - The student's ID
 * @param payload - UpdateStudentPayload
 * @returns Promise<ApiResponse<StudentProfile>>
 */
export const updateStudentProfile = async (
  studentId: string,
  payload: UpdateStudentPayload,
): Promise<TResponse<StudentProfile>> => {
  try {
    const cookieStore = cookies();
    const response = await fetch(`${apiBaseUrl}/students/${studentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    return (await response.json()) as TResponse<StudentProfile>;
  } catch (error: any) {
    console.error("Error updating student profile:", error);
    return {
      success: false,
      data: null,
      error:
        error.message ||
        "An error occurred while updating the student profile.",
      message:
        error.message ||
        "An error occurred while updating the student profile.",
    };
  }
};

/**
 * Deletes a student profile
 * @param studentId - The student's ID
 * @returns Promise<TResponse<void>>
 */
export const deleteStudentProfile = async (
  studentId: string,
): Promise<TResponse<void>> => {
  try {
    const cookieStore = cookies();
    const response = await fetch(`${apiBaseUrl}/students/${studentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    return (await response.json()) as TResponse<void>;
  } catch (error: any) {
    console.error("Error deleting student profile:", error);
    return {
      success: false,
      data: null,
      error:
        error.message ||
        "An error occurred while deleting the student profile.",
      message:
        error.message ||
        "An error occurred while deleting the student profile.",
    };
  }
};

/**
 * Fetches statistics for a student
 * @param studentId - The student's ID
 * @returns Promise<ApiResponse<StudentStats>>
 */
export const getStudentStats = async (
  studentId: string,
): Promise<TResponse<StudentStats>> => {
  try {
    const cookieStore = cookies();
    const response = await fetch(`${apiBaseUrl}/students/${studentId}/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    return (await response.json()) as TResponse<StudentStats>;
  } catch (error: any) {
    console.error("Error fetching student stats:", error);
    return {
      success: false,
      data: null,
      error:
        error.message || "An error occurred while fetching the student stats.",
      message:
        error.message || "An error occurred while fetching the student stats.",
    };
  }
};

export const getCompletedSessions = async (
  studentId: string,
): Promise<PaginatedResponse<Bookings>> => {
  try {
    const cookieStore = cookies();
    const response = await fetch(
      `${apiBaseUrl}/students/${studentId}/sessions?status=COMPLETED`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );
  
    return (await response.json()) as PaginatedResponse<Bookings>;
  } catch (error: any) {
    console.error("Error fetching completed sessions:", error);
    return {
      success: false,
      error: error.message || "An error occurred while fetching completed sessions.",
      message:
        error.message || "An error occurred while fetching completed sessions.",
      data: {
        data: [],
        pagination: {
          totalRecords: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      },
    };
  }
};

export const getAllSessions = async (
  studentId: string,
  params?: SessionSearchParams,
): Promise<PaginatedResponse<Bookings>> => {
  try {
    const url = new URL(`${apiBaseUrl}/students/${studentId}/sessions`);
    const paramUrl = handleParams(url.toString(), params);
    console.log("Fetching all sessions with URL:", paramUrl);

    const cookieStore = cookies();
    const response = await fetch(paramUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: { tags: [`student-sessions-${studentId}`] },
    });

    return (await response.json()) as Promise<PaginatedResponse<Bookings>>;
  } catch (error: any) {
    console.error("Error fetching all sessions:", error);
    return {
      success: false,
      error: error.message || "An error occurred while fetching all sessions.",
      message:
        error.message || "An error occurred while fetching all sessions.",
      data: {
        data: [],
        pagination: {
          totalRecords: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      },
    };
  }
};

export const getUpcomingSessions = async (
  studentId: string,
): Promise<TResponse<Bookings[]>> => {
  try {
    const cookieStore = cookies();
    const response = await fetch(
      `${apiBaseUrl}/students/${studentId}/sessions?status=PENDING,CONFIRMED`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );

    return (await response.json()) as TResponse<Bookings[]>;
  } catch (error: any) {
    console.error("Error fetching upcoming sessions:", error);
    return {
      success: false,
      error:
        error.message || "An error occurred while fetching upcoming sessions.",
      message:
        error.message || "An error occurred while fetching upcoming sessions.",
      data: [],
    };
  }
};

export const createReview = async (
  studentId: string,
  payload: CreateReviewPayload,
): Promise<TResponse<StudentReview>> => {
 try {
   const cookieStore = cookies();
   const response = await fetch(`${apiBaseUrl}/students/${studentId}/review`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Cookie: cookieStore.toString(),
     },
     body: JSON.stringify(payload),
   });
 
   return (await response.json()) as TResponse<StudentReview>;
 } catch (error: any) {
   return {
     success: false,
     error: error.message || "An error occurred while creating the review.",
     message:
       error.message || "An error occurred while creating the review.",
       data: null
   };
 }
};

/**
 * Cancels a booking
 * @param bookingId - The booking's ID
 * @returns Promise<TResponse<Bookings>>
 */
export const cancelBooking = async (
  bookingId: string,
): Promise<TResponse<Bookings>> => {
  try {
    const cookieStore = cookies();
    const response = await fetch(
      `${apiBaseUrl}/students/sessions/${bookingId}/cancel`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );
  
    return (await response.json()) as TResponse<Bookings>;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An error occurred while canceling the booking.",
      message:
        error.message || "An error occurred while canceling the booking.",
      data: null,
    };
  }
};
