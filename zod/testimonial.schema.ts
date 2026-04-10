import { z } from "zod";

export const createTestimonialZodSchema = z.object({
  title: z
    .string()
    .trim()
    .max(120, "Title can be at most 120 characters")
    .optional(),
  content: z
    .string()
    .trim()
    .min(10, "Feedback must be at least 10 characters")
    .max(2000, "Feedback can be at most 2000 characters"),
  rating: z
    .number({ error: "Rating is required" })
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
});

export const updateTestimonialZodSchema = createTestimonialZodSchema.partial();
