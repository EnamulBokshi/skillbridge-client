import { env } from "@/env";
import { ITestimonial } from "@/types/testimonial.types";

interface GetTestimonialsResponse {
  success?: boolean;
  message?: string;
  error?: { message?: string } | null;
  data?:
    | {
        testimonials?: ITestimonial[];
      }
    | ITestimonial[]
    | null;
}

export const getHomeTestimonials = async (limit = 9): Promise<ITestimonial[]> => {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/testimonials?page=1&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 120, tags: ["testimonials"] },
      }
    );

    const result = (await response.json()) as GetTestimonialsResponse;

    if (!response.ok) {
      return [];
    }

    if (Array.isArray(result.data)) {
      return result.data;
    }

    return result.data?.testimonials ?? [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};
