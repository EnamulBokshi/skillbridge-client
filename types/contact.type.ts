export interface CreateContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  userId: string | null;
  adminReply: string | null;
  repliedAt: string | null;
  repliedById: string | null;
  createdAt: string;
  updatedAt: string;
}
