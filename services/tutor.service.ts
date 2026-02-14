import { env } from "@/env";
import handleParams from "@/helper/handleSearchParams";
import { PaginatedResponse, SessionSearchParams, TResponse } from "@/types";
import { Bookings } from "@/types/bookings.type";
import {
  CreateTutorPayload,
  UpdateTutorPayload,
  TutorProfile,
  TutorDetailedProfile,
  TutorStats,
  TutorBooking,
  TutorReview,
  TutorSlot,
  UpdateBookingStatusPayload,
  ApiResponse,
  GetTutorsParams,
} from "@/types/tutor.type";
import { cookies } from "next/headers";
import { cancelBooking } from "./student.service";
import { ISlot, ISlotResponse, IUpdateSlotPayload, SlotSearchParams } from "@/types/slot.type";

const apiBaseUrl = env.NEXT_PUBLIC_API_URL;

const tutorService = {
  /**
   * CREATE TUTOR PROFILE
   * POST /tutors
   * Auth: ADMIN, TUTOR, USER
   */
  createTutor: async (
    tutorData: CreateTutorPayload,
  ): Promise<TResponse<TutorProfile>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(tutorData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create tutor profile");
      }

      const data: ApiResponse<TutorProfile> = await response.json();
      return { data: data.data, error: null };
    } catch (error: any) {
      console.error("Error creating tutor profile:", error);
      return {
        data: null,
        error: { message: error.message || "Tutor profile creation failed" },
      };
    }
  },

  /**
   * GET ALL TUTORS
   * GET /tutors
   * Auth: Public
   * Supports pagination, filtering, and sorting
   */
  getTutors: async (params?: GetTutorsParams): Promise<TResponse<any>> => {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params) {
        if (params.page !== undefined)
          queryParams.append("page", params.page.toString());
        if (params.limit !== undefined)
          queryParams.append("limit", params.limit.toString());
        if (params.isFeatured !== undefined)
          queryParams.append("isFeatured", params.isFeatured.toString());
        if (params.search) queryParams.append("search", params.search);
        if (params.categoryId)
          queryParams.append("categoryId", params.categoryId);
        if (params.minRating !== undefined)
          queryParams.append("minRating", params.minRating.toString());
        if (params.maxRating !== undefined)
          queryParams.append("maxRating", params.maxRating.toString());
        if (params.minExperience !== undefined)
          queryParams.append("minExperience", params.minExperience.toString());
        if (params.maxExperience !== undefined)
          queryParams.append("maxExperience", params.maxExperience.toString());
        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.orderBy) queryParams.append("orderBy", params.orderBy);
      }

      const queryString = queryParams.toString();
      const url = queryString
        ? `${apiBaseUrl}/tutors?${queryString}`
        : `${apiBaseUrl}/tutors`;

      const cookieStore = await cookies();
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: { tags: ["tutors"] },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch tutors");
      }

      const data: ApiResponse<any> = await response.json();
      return { data: data.data, error: null };
    } catch (error: any) {
      console.error("Error fetching tutors:", error);
      return {
        data: null,
        error: { message: error.message || "Failed to fetch tutors" },
      };
    }
  },

  /**
   * UPDATE TUTOR PROFILE
   * PATCH /tutors/:tutorId
   * Auth: TUTOR
   */
  updateTutor: async (
    tutorId: string,
    tutorData: UpdateTutorPayload,
  ): Promise<TResponse<TutorProfile>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/tutors/${tutorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(tutorData),
      });

      const data: ApiResponse<TutorProfile> = await response.json();
      return { data: data.data, error: null, message: data.message };
    } catch (error: any) {
      console.error("Error updating tutor profile:", error);
      return {
        data: null,
        error: { message: error.message || "Tutor profile update failed" },
      };
    }
  },

  /**
   * GET TUTOR BY ID
   * GET /tutors/:tutorId
   * Auth: Public (anyone can view tutor details)
   */
  getTutorById: async (
    tutorId: string,
  ): Promise<TResponse<TutorDetailedProfile>> => {
    try {
      console.log("Fetching tutor details for tutor ID (service):", tutorId);
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/tutors/${tutorId}`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const data: ApiResponse<TutorDetailedProfile> = await response.json();
      return { data: data.data, error: null, message: data.message };
    } catch (error: any) {
      console.error("Error fetching tutor:", error);
      return {
        data: null,
        error: error,
        message: error.message || "Failed to fetch tutor details",
      };
    }
  },

  /**
   *  DELETE TUTOR
   * DELETE /tutors/:tutorId
   * Auth: ADMIN
   */
  deleteTutor: async (tutorId: string): Promise<TResponse<TutorProfile>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/tutors/${tutorId}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete tutor");
      }

      const data: ApiResponse<TutorProfile> = await response.json();
      return { data: data.data, error: null };
    } catch (error: any) {
      console.error("Error deleting tutor:", error);
      return {
        data: null,
        error: { message: error.message || "Failed to delete tutor" },
      };
    }
  },

  /**
   * GET DASHBOARD STATS
   * GET /tutors/dashboard/stats/:tutorId
   * Auth: TUTOR
   */
  getDashboardStats: async (
    tutorId: string,
  ): Promise<TResponse<TutorStats>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(
        `${apiBaseUrl}/tutors/${tutorId}/dashboard`,
        {
          method: "GET",
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      const data: ApiResponse<TutorStats> = await response.json();
      return { data: data.data, error: null, message: data.message };
    } catch (error: any) {
      console.error("Error fetching dashboard stats:", error);
      return {
        data: null,
        error: { message: error.message || "Failed to fetch dashboard stats" },
      };
    }
  },

  /**
   * GET UPCOMING BOOKINGS
   * GET /tutors/:tutorId/upcoming-bookings
   * Auth: TUTOR
   */
  getUpcomingBookings: async (
    tutorId: string,
  ): Promise<TResponse<TutorBooking[]>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(
        `${apiBaseUrl}/tutors/${tutorId}/upcoming-bookings`,
        {
          method: "GET",
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch upcoming bookings",
        );
      }

      const data: ApiResponse<TutorBooking[]> = await response.json();
      return { data: data.data, error: null };
    } catch (error: any) {
      console.error("Error fetching upcoming bookings:", error);
      return {
        data: null,
        error: {
          message: error.message || "Failed to fetch upcoming bookings",
        },
      };
    }
  },

  /**
   * GET COMPLETED BOOKINGS
   * GET /tutors/:tutorId/completed-bookings
   * Auth: TUTOR
   */
  getCompletedBookings: async (
    tutorId: string,
  ): Promise<TResponse<TutorBooking[]>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(
        `${apiBaseUrl}/tutors/${tutorId}/completed-bookings`,
        {
          method: "GET",
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch completed bookings",
        );
      }

      const data: ApiResponse<TutorBooking[]> = await response.json();
      return { data: data.data, error: null };
    } catch (error: any) {
      console.error("Error fetching completed bookings:", error);
      return {
        data: null,
        error: {
          message: error.message || "Failed to fetch completed bookings",
        },
      };
    }
  },

  /**
   * GET TUTOR REVIEWS
   * GET /tutors/:tutorId/reviews
   * Auth: TUTOR, ADMIN
   */
  getTutorReviews: async (
    tutorId: string,
  ): Promise<TResponse<TutorReview[]>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/tutors/${tutorId}/reviews`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch tutor reviews");
      }

      const data: ApiResponse<TutorReview[]> = await response.json();
      return { data: data.data, error: null };
    } catch (error: any) {
      console.error("Error fetching tutor reviews:", error);
      return {
        data: null,
        error: { message: error.message || "Failed to fetch tutor reviews" },
      };
    }
  },

  /**
   * GET TUTOR SLOTS
   * GET /tutors/:tutorId/slots
   * Auth: TUTOR, ADMIN
   */
  getTutorSlots: async (tutorId: string, params?: SlotSearchParams): Promise<PaginatedResponse<ISlotResponse[]>> => {

    console.log("Fetching tutor slots for tutor ID:", tutorId, "with params:", params);
    const url = new URL(`${apiBaseUrl}/tutors/${tutorId}/slots`);
      const paramsUrl = handleParams(url.toString(), params);
      console.log("Fetching tutor slots with URL:", paramsUrl);
      const cookieStore = await cookies();
      const response = await fetch(paramsUrl, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: { tags: [`tutor-slots-${tutorId}`] },
      });
      return (await response.json()) as PaginatedResponse<ISlotResponse[]>;
    
  },

  updateTutorSlot: async(slotId: string, payload: IUpdateSlotPayload):Promise<TResponse<ISlotResponse>> => {
    const cookieStore = await cookies();
    const response = await fetch(`${apiBaseUrl}/slots/${slotId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    return (await response.json()) as TResponse<ISlotResponse>;

  },

  /**
   *  DELETE TUTOR SLOT
   * DELETE /tutors/slots/:slotId
   * Auth: TUTOR
   */
  deleteTutorSlot: async (
    slotId: string,
  ): Promise<TResponse<TutorSlot>> => {
    
      const cookieStore = await cookies();
      const response = await fetch(
        `${apiBaseUrl}/tutors/slots/${slotId}`,
        {
          method: "DELETE",
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

    return (await response.json()) as TResponse<TutorSlot>;     

  },

  /**
   * UPDATE BOOKING STATUS
   * PATCH /tutors/:tutorId/bookings/:bookingId/status
   * Auth: TUTOR
   */
  updateBookingStatus: async (
    tutorId: string,
    bookingId: string,
    statusData: UpdateBookingStatusPayload,
  ): Promise<TResponse<TutorBooking>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(
        `${apiBaseUrl}/tutors/${tutorId}/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(statusData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update booking status");
      }

      const data: ApiResponse<TutorBooking> = await response.json();

      return { data: data.data, error: null };
    } catch (error: any) {
      console.error("Error updating booking status:", error);
      return {
        data: null,
        error: { message: error.message || "Failed to update booking status" },
      };
    }
  },

  /**
   * GET ALL TUTOR BOOKINGS
   * GET /tutors/:tutorId/bookings
   * Auth: TUTOR, ADMIN
   */
  getAllTutorBookings: async (
    tutorId: string,
  ): Promise<TResponse<TutorBooking[]>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/tutors/${tutorId}/bookings`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch tutor bookings");
      }

      const data: ApiResponse<TutorBooking[]> = await response.json();
      return { data: data.data, error: null };
    } catch (error: any) {
      console.error("Error fetching tutor bookings:", error);
      return {
        data: null,
        error: { message: error.message || "Failed to fetch tutor bookings" },
      };
    }
  },
  getAllSessions: async (
    tutorId: string,
    params?: SessionSearchParams,
  ): Promise<PaginatedResponse<Bookings[]>> => {
    const cookieStore = await cookies();
    const url = new URL(`${apiBaseUrl}/tutors/${tutorId}/sessions`);
    const paramUrl = handleParams(url.toString(), params);
    console.log("Fetching all sessions (tutor) with URL:", paramUrl);
    const response = await fetch(paramUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: { tags: [`tutor-sessions-${tutorId}`] },
    });

    return (await response.json()) as Promise<PaginatedResponse<Bookings[]>>;
  },
  cancelBooking: async (bookingId: string): Promise<TResponse<Bookings>> => {
    const cookieStore = await cookies();
    const response = await fetch(`${apiBaseUrl}/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    return (await response.json()) as Promise<TResponse<Bookings>>;
  },
  confirmBooking: async (bookingId: string): Promise<TResponse<Bookings>> => {
    const cookieStore = await cookies();
    const response = await fetch(
      `${apiBaseUrl}/bookings/${bookingId}/confirm`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );
    return (await response.json()) as Promise<TResponse<Bookings>>;
  },

  markAsCompleted: async (
    bookingId: string,
  ): Promise<TResponse<Bookings>> => {
    const cookieStore = await cookies();
    const response = await fetch(
      `${apiBaseUrl}/bookings/${bookingId}/complete`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );
    return (await response.json()) as Promise<TResponse<Bookings>>;
  },
};

export { tutorService };
