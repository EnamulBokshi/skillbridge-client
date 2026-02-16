import { LucideIcon } from "lucide-react";
import { BookingStatus } from "./student.type";

export interface ServiceOption {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string;
}

export type TResponse<T> = {
  success?: boolean;
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
export interface ApiResponse<T> {
  success: boolean;
  error: any | null;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  error: any | null;
  message: string;
  data: PaginatedData<T>;
}

export interface PaginationType {
  page: string | number;
  limit: string | number;
  totalRecords: string | number;
  totalPages: string | number;
}


export interface UserProfileType{
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  status: string;
  isAssociate: boolean;
  student?: {
      id: string;
      lastName: string;
      firstName: string;
  } | null;
  tutorProfile?: {
    id: string;
    lastName: string;
    firstName: string;
  } | null;
}
  

export interface SessionSearchParams {
  status?: BookingStatus;
  date?: string;
  search?: string;
  page?: number | string;
  limit?: number | string;
}

