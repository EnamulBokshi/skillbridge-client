"use server";

import { newsletterService } from "@/services/newsletter.service";
import {
  SendBulkNewsletterPayload,
  SubscribeNewsletterPayload,
  UnsubscribeNewsletterPayload,
} from "@/types/newsletter.type";
import { updateTag } from "next/cache";

export const subscribeNewsletterAction = async (
  payload: SubscribeNewsletterPayload,
) => {
  const result = await newsletterService.subscribeNewsletter(payload);
  updateTag("newsletter-subscribers");
  return result;
};

export const unsubscribeNewsletterAction = async (
  payload: UnsubscribeNewsletterPayload,
) => {
  const result = await newsletterService.unsubscribeNewsletter(payload);
  updateTag("newsletter-subscribers");
  return result;
};

export const getNewsletterSubscribersAction = async () => {
  return await newsletterService.getSubscribers();
};

export const sendBulkNewsletterEmailAction = async (
  payload: SendBulkNewsletterPayload,
) => {
  return await newsletterService.sendBulkNewsletterEmail(payload);
};
