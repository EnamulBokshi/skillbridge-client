import { env } from "@/env";
import { TResponse } from "@/types";
import {
  SearchSuggestionContext,
  SearchSuggestionRequestPayload,
  SearchSuggestionResponseData,
} from "@/types/ai.type";

const apiBaseUrl = env.NEXT_PUBLIC_API_URL;

const parseErrorMessage = async (response: Response) => {
  try {
    const errorData = await response.json();
    return (errorData?.message || errorData?.error || "Search suggestions failed") as string;
  } catch {
    return "Search suggestions failed";
  }
};

export const searchSuggestionClient = {
  getSuggestions: async (
    payload: SearchSuggestionRequestPayload,
    signal?: AbortSignal,
  ): Promise<TResponse<SearchSuggestionResponseData>> => {
    try {
      const queryParams = new URLSearchParams({
        query: payload.query,
        limit: String(payload.limit ?? 5),
      });

      if (payload.context) {
        queryParams.set("context", payload.context as SearchSuggestionContext);
      }

      const response = await fetch(`${apiBaseUrl}/ai/search-suggestions?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
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
      if (error?.name === "AbortError") {
        return {
          data: null,
          error: { message: "Request cancelled" },
          success: false,
          message: "Request cancelled",
        };
      }

      return {
        data: null,
        error: { message: error?.message || "Failed to fetch search suggestions" },
        success: false,
      };
    }
  },
};
