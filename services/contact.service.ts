import { env } from "@/env";
import { ServerResponse } from "@/types";
import {
  CreateContactPayload,
  IContact,
  UpdateContactPayload,
} from "@/types/contact.type";
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

const getAllContacts = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/contacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      next: { tags: ["contacts"] },
    });

    const result: ServerResponse = await response.json();
    return {
      data: result.data,
      error: result.error,
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      data: null,
      error,
      success: false,
      message: "Failed to load contacts",
    };
  }
};

const updateContact = async (
  contactId: string,
  payload: UpdateContactPayload,
) => {
  const cookieStore = await cookies();
  const endpoints = [
    `${env.NEXT_PUBLIC_API_URL}/contacts/${contactId}`,
    `${env.NEXT_PUBLIC_API_URL}/contacts/${contactId}/reply`,
  ];

  const methods: Array<"PATCH" | "PUT"> = ["PATCH", "PUT"];

  for (const endpoint of endpoints) {
    for (const method of methods) {
      try {
        const response = await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          continue;
        }

        const result: ServerResponse = await response.json();
        return {
          data: result.data as IContact | null,
          error: result.error,
          success: result.success,
          message: result.message,
        };
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    }
  }

  return {
    data: null,
    error: { message: "No compatible contact update endpoint found" },
    success: false,
    message: "Failed to update contact",
  };
};

export const contactService = {
  createContact,
  getAllContacts,
  updateContact,
};
