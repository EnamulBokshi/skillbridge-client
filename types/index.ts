import { LucideIcon } from "lucide-react";

export interface ServiceOption {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string;
}

export type TResponse<T> = {
  data: T | null;
  message?: string;
  error: { message: string } | null;
};

export interface GeneralSearchParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
  slug?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
}

export type SidebarRoute = {
  title: string;
  url: string;
  icon?: React.ComponentType<any>;
  items?: {
    title: string;
    url: string;
    icon?: React.ComponentType<any>;
    isActive?: boolean;
  }[];
};

export interface ServerResponse {
  success?: boolean;
  data?: any | null;
  error: any | null;
  message?: string;
}

export interface IReview {
  studentId: string;
  tutorId: string;
  rating: number;
  comment?: string;
}
