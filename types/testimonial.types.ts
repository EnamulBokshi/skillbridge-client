export interface ITestimonialUser {
  id: string;
  name: string;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export interface ITestimonial {
  id: string;
  title?: string | null;
  content: string;
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: ITestimonialUser;
}

export interface CreateTestimonialPayload {
  title?: string;
  content: string;
  rating: number;
}

export interface UpdateTestimonialPayload {
  title?: string;
  content?: string;
  rating?: number;
}
