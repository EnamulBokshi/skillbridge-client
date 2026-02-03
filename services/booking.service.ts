"use server";
import { env } from "@/env";
import { cookies } from "next/headers";

const apiBaseUrl = env.NEXT_PUBLIC_API_URL;

export interface CreateBookingPayload {
  slotId: string;
}

export interface BookingResponse {
  id: string;
  studentId: string;
  slotId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

/**
 * Creates a new booking
 * @param payload - CreateBookingPayload
 * @returns Promise<ApiResponse<BookingResponse>>
 */
export const createBooking = async (
  payload: CreateBookingPayload
): Promise<ApiResponse<BookingResponse>> => {
  const cookieStore = await cookies();
  const response = await fetch(`${apiBaseUrl}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  return (await response.json()) as ApiResponse<BookingResponse>;
};
