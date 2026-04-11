import { env } from "@/env";
import { TResponse } from "@/types";
import {
  SearchSuggestionContext,
  SearchSuggestionRequestPayload,
  SearchSuggestionResponseData,
} from "@/types/ai.type";

const apiBaseUrl = env.NEXT_PUBLIC_API_URL;

const CACHE_TTL_MS = 1000 * 60 * 5;
const MAX_CACHE_ENTRIES = 200;

type SuggestionCacheEntry = {
  data: SearchSuggestionResponseData;
  expiresAt: number;
};

const suggestionCache = new Map<string, SuggestionCacheEntry>();
const inFlightSuggestionRequests = new Map<
  string,
  Promise<TResponse<SearchSuggestionResponseData>>
>();

const normalizeQuery = (query: string) => query.trim().toLowerCase();

const buildCacheKey = (payload: SearchSuggestionRequestPayload) => {
  const normalizedQuery = normalizeQuery(payload.query);
  const limit = payload.limit ?? 5;
  const context = payload.context ?? "all";
  return `${context}::${limit}::${normalizedQuery}`;
};

const getCachedSuggestions = (key: string): SearchSuggestionResponseData | null => {
  const hit = suggestionCache.get(key);
  if (!hit) return null;

  if (hit.expiresAt <= Date.now()) {
    suggestionCache.delete(key);
    return null;
  }

  return hit.data;
};

const setCachedSuggestions = (key: string, data: SearchSuggestionResponseData) => {
  // Refresh insertion order for simple FIFO/LRU-like eviction.
  if (suggestionCache.has(key)) {
    suggestionCache.delete(key);
  }

  suggestionCache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  if (suggestionCache.size > MAX_CACHE_ENTRIES) {
    const firstKey = suggestionCache.keys().next().value as string | undefined;
    if (firstKey) {
      suggestionCache.delete(firstKey);
    }
  }
};

const waitForSharedRequest = async (
  requestPromise: Promise<TResponse<SearchSuggestionResponseData>>,
  signal?: AbortSignal,
): Promise<TResponse<SearchSuggestionResponseData>> => {
  if (!signal) {
    return requestPromise;
  }

  if (signal.aborted) {
    return {
      data: null,
      error: { message: "Request cancelled" },
      success: false,
      message: "Request cancelled",
    };
  }

  return await Promise.race([
    requestPromise,
    new Promise<TResponse<SearchSuggestionResponseData>>((resolve) => {
      signal.addEventListener(
        "abort",
        () => {
          resolve({
            data: null,
            error: { message: "Request cancelled" },
            success: false,
            message: "Request cancelled",
          });
        },
        { once: true },
      );
    }),
  ]);
};

const fetchSuggestionsFromServer = async (
  payload: SearchSuggestionRequestPayload,
): Promise<TResponse<SearchSuggestionResponseData>> => {
  const queryParams = new URLSearchParams({
    query: payload.query,
    limit: String(payload.limit ?? 5),
  });

  if (payload.context) {
    queryParams.set("context", payload.context as SearchSuggestionContext);
  }

  const response = await fetch(
    `${apiBaseUrl}/ai/search-suggestions?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

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
  const nextData = (json?.data ?? {
    suggestions: [],
    query: payload.query,
    context: payload.context ?? "all",
  }) as SearchSuggestionResponseData;

  return {
    data: nextData,
    error: null,
    success: true,
    message: json?.message,
  };
};

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
      const cacheKey = buildCacheKey(payload);
      const cached = getCachedSuggestions(cacheKey);
      if (cached) {
        return {
          data: cached,
          error: null,
          success: true,
          message: "Suggestions served from cache",
        };
      }

      const sharedRequest = inFlightSuggestionRequests.get(cacheKey);
      if (sharedRequest) {
        return await waitForSharedRequest(sharedRequest, signal);
      }

      const requestPromise = fetchSuggestionsFromServer(payload)
        .then((result) => {
          if (result.data && !result.error) {
            setCachedSuggestions(cacheKey, result.data);
          }
          return result;
        })
        .finally(() => {
          inFlightSuggestionRequests.delete(cacheKey);
        });

      inFlightSuggestionRequests.set(cacheKey, requestPromise);

      return await waitForSharedRequest(requestPromise, signal);
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
