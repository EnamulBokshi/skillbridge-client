"use server";

import { contactService } from "@/services/contact.service";
import { CreateContactPayload } from "@/types/contact.type";
import { updateTag } from "next/cache";

export const createContactAction = async (payload: CreateContactPayload) => {
  const result = await contactService.createContact(payload);
  updateTag("contacts");
  return result;
};
