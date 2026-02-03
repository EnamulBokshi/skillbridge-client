"use server";

import { createBooking, CreateBookingPayload, BookingResponse, ApiResponse } from "@/services/booking.service";

/**
 * Creates a new booking
 * @param payload - CreateBookingPayload
 * @returns Promise<ApiResponse<BookingResponse>>
 */
export const createBookingAction = async (
  payload: CreateBookingPayload
): Promise<ApiResponse<BookingResponse>> => {
  return await createBooking(payload);
};
