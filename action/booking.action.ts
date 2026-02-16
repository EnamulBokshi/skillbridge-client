"use server";

import { createBooking, CreateBookingPayload, BookingResponse, ApiResponse } from "@/services/booking.service";
import { TResponse } from "@/types";

/**
 * Creates a new booking
 * @param payload - CreateBookingPayload
 * @returns Promise<ApiResponse<BookingResponse>>
 */
export const createBookingAction = async (
  payload: CreateBookingPayload
): Promise<TResponse<BookingResponse>> => {
  return await createBooking(payload);
};
