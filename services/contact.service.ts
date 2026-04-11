import { env } from "@/env";
import { ServerResponse } from "@/types";
import { CreateContactPayload, IContact } from "@/types/contact.type";
import { cookies } from "next/headers";

const createContact = async (payload: CreateContactPayload) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const result: ServerResponse = await response.json();
    return {
      data: result.data as IContact | null,
      error: result.error,
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    console.error("Error creating contact:", error);
    return {
      data: null,
      error,
      success: false,
      message: "Failed to submit contact form",
    };
  }
};

export const contactService = {
  createContact,
};
