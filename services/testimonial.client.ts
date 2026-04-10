"use client";

import { env } from "@/env";
import {
  CreateTestimonialPayload,
  ITestimonial,
  UpdateTestimonialPayload,
} from "@/types/testimonial.types";

interface CreateTestimonialResponse {
  success?: boolean;
  message?: string;
  error?: { message?: string } | null;
  data?: ITestimonial | null;
}

export const createTestimonial = async (
  payload: CreateTestimonialPayload
): Promise<ITestimonial> => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/testimonials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as CreateTestimonialResponse;

  if (!response.ok || !result.data) {
    throw new Error(result.message || "Failed to create testimonial");
  }

  return result.data;
};

export const updateTestimonial = async (
  testimonialId: string,
  payload: UpdateTestimonialPayload
): Promise<ITestimonial> => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/testimonials/${testimonialId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  const result = (await response.json()) as CreateTestimonialResponse;

  if (!response.ok || !result.data) {
    throw new Error(result.message || "Failed to update testimonial");
  }

  return result.data;
};

export const deleteTestimonial = async (testimonialId: string): Promise<void> => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/testimonials/${testimonialId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const result = (await response.json()) as CreateTestimonialResponse;

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete testimonial");
  }
};
