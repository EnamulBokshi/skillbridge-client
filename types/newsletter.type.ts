export interface INewsletterSubscriber {
  id: string;
  name: string;
  email: string;
  isSubscribed: boolean;
  unsubscribedAt: string | null;
  isDeleted: boolean;
  isDeletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribeNewsletterPayload {
  name: string;
  email: string;
}

export interface UnsubscribeNewsletterPayload {
  email: string;
}

export interface SendBulkNewsletterPayload {
  emails: string[];
  subject: string;
  message: string;
}
