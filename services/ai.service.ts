import { env } from "@/env";
import { TResponse } from "@/types";
import {
  AiChatRequestPayload,
  AiChatResponseData,
  AiModelsResponseData,
  ReviewSuggestionRequestPayload,
  ReviewSuggestionResponseData,
  TutorBioWriterRequestPayload,
  TutorBioWriterResponseData,
  TutorRecommendationRequestPayload,
  TutorRecommendationResponseData,
} from "@/types/ai.type";
import { cookies } from "next/headers";

const apiBaseUrl = env.NEXT_PUBLIC_API_URL;

const parseErrorMessage = async (response: Response) => {
  try {
    const errorData = await response.json();
    return (
      errorData?.message || errorData?.error || "AI request failed"
    ) as string;
  } catch {
    return "AI request failed";
  }
};

export const aiService = {
  
  chat: async (
    payload: AiChatRequestPayload,
  ): Promise<TResponse<AiChatResponseData>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await parseErrorMessage(response);
        return {
          data: null,
          error: { message },
          success: false,
          message,
        };
      }

      const json = await response.json();
      return {
        data: json?.data,
        error: null,
        success: true,
        message: json?.message,
      };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Failed to generate AI response" },
        success: false,
      };
    }
  },

  getTutorRecommendations: async (
    payload: TutorRecommendationRequestPayload,
  ): Promise<TResponse<TutorRecommendationResponseData>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/ai/tutor-recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await parseErrorMessage(response);
        return {
          data: null,
          error: { message },
          success: false,
          message,
        };
      }

      const json = await response.json();
      return {
        data: json?.data,
        error: null,
        success: true,
        message: json?.message,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          message:
            error?.message || "Failed to generate tutor recommendations",
        },
        success: false,
      };
    }
  },

  getModels: async (): Promise<TResponse<AiModelsResponseData>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/ai/models`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const message = await parseErrorMessage(response);
        return {
          data: null,
          error: { message },
          success: false,
          message,
        };
      }

      const json = await response.json();
      return {
        data: json?.data,
        error: null,
        success: true,
        message: json?.message,
      };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Failed to fetch AI models" },
        success: false,
      };
    }
  },

  writeTutorBio: async (
    payload: TutorBioWriterRequestPayload,
  ): Promise<TResponse<TutorBioWriterResponseData>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/ai/write/tutor-bio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await parseErrorMessage(response);
        return {
          data: null,
          error: { message },
          success: false,
          message,
        };
      }

      const json = await response.json();
      return {
        data: json?.data,
        error: null,
        success: true,
        message: json?.message,
      };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Failed to generate tutor bio" },
        success: false,
      };
    }
  },

  getReviewSuggestions: async (
    payload: ReviewSuggestionRequestPayload,
  ): Promise<TResponse<ReviewSuggestionResponseData>> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/ai/write/review-suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await parseErrorMessage(response);
        return {
          data: null,
          error: { message },
          success: false,
          message,
        };
      }

      const json = await response.json();
      console.log("Review suggestions response:", json);
      return {
        data: json?.data,
        error: null,
        success: true,
        message: json?.message,
      };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Failed to generate review suggestions" },
        success: false,
      };
    }
  },


};
