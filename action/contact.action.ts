"use server";

import { contactService } from "@/services/contact.service";
import { CreateContactPayload, UpdateContactPayload } from "@/types/contact.type";
import { updateTag } from "next/cache";

export const createContactAction = async (payload: CreateContactPayload) => {
  const result = await contactService.createContact(payload);
  updateTag("contacts");
  return result;
};

export const getContactsAction = async () => {
  return await contactService.getAllContacts();
};

export const updateContactAction = async (
  contactId: string,
  payload: UpdateContactPayload,
) => {
  const result = await contactService.updateContact(contactId, payload);
  updateTag("contacts");
  return result;
};
