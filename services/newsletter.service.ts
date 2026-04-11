import { env } from "@/env";
import {
  INewsletterSubscriber,
  SendBulkNewsletterPayload,
  SubscribeNewsletterPayload,
  UnsubscribeNewsletterPayload,
} from "@/types/newsletter.type";
import { ServerResponse } from "@/types";
import { cookies } from "next/headers";

type NewsletterListResponse = {
  subscribers?: INewsletterSubscriber[];
  data?: INewsletterSubscriber[];
};

const subscribeNewsletter = async (payload: SubscribeNewsletterPayload) => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/newsletters/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result: ServerResponse = await response.json();
    return {
      data: result.data,
      error: result.error,
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return {
      data: null,
      error,
      success: false,
      message: "Failed to subscribe to newsletter",
    };
  }
};

const unsubscribeNewsletter = async (payload: UnsubscribeNewsletterPayload) => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/newsletters/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result: ServerResponse = await response.json();
    return {
      data: result.data,
      error: result.error,
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    return {
      data: null,
      error,
      success: false,
      message: "Failed to unsubscribe from newsletter",
    };
  }
};

const getSubscribers = async () => {
  const cookieStore = await cookies();
  const headers = {
    "Content-Type": "application/json",
    Cookie: cookieStore.toString(),
  };

  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/newsletters/subscribers`, {
      method: "GET",
      headers,
      next: { tags: ["newsletter-subscribers"] },
      cache: "no-store",
    });

    const result: ServerResponse = await response.json();
    const payload = (result.data ?? {}) as NewsletterListResponse;
    const subscribers = Array.isArray(payload)
      ? payload
      : payload.subscribers || payload.data || [];

    return {
      data: subscribers,
      error: result.error,
      success: result.success,
      message: result.message,
    };
  } catch (firstError) {
    try {
      // Fallback for backends that expose subscribers at /newsletters
      const fallbackResponse = await fetch(`${env.NEXT_PUBLIC_API_URL}/newsletters`, {
        method: "GET",
        headers,
        next: { tags: ["newsletter-subscribers"] },
        cache: "no-store",
      });

      const fallbackResult: ServerResponse = await fallbackResponse.json();
      const payload = (fallbackResult.data ?? {}) as NewsletterListResponse;
      const subscribers = Array.isArray(payload)
        ? payload
        : payload.subscribers || payload.data || [];

      return {
        data: subscribers,
        error: fallbackResult.error,
        success: fallbackResult.success,
        message: fallbackResult.message,
      };
    } catch (error) {
      console.error("Error fetching newsletter subscribers:", firstError, error);
      return {
        data: [],
        error,
        success: false,
        message: "Failed to fetch newsletter subscribers",
      };
    }
  }
};

const sendBulkNewsletterEmail = async (payload: SendBulkNewsletterPayload) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/newsletters/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const result: ServerResponse = await response.json();
    return {
      data: result.data,
      error: result.error,
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    console.error("Error sending bulk newsletter email:", error);
    return {
      data: null,
      error,
      success: false,
      message: "Failed to send newsletter email",
    };
  }
};

export const newsletterService = {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getSubscribers,
  sendBulkNewsletterEmail,
};
