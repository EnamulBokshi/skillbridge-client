// ============================================
// ENUMS
// ============================================

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface CreateTutorPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  expertise?: string;
  experience?: number;
  hourlyRate?: number;
  education?: string;
  languages?: string[];
  certifications?: string[];
  profilePicture?: string;
  isFeatured?: boolean;
}

export interface UpdateTutorPayload {
  firstName: string;
  lastName: string;
  bio: string;
  categoryId: string;
  userId?: string;
  phone?: string;
  address?: string;
  email: string;
  zip?: string;
  isFeatured?: boolean;
  experienceYears: number;
  cv?: string;
  expertiseAreas: string[];
  profilePicture?: string;
}

// export interface TutorProfile {
//   id: string;
//   firstName: string;
//   lastName: string;
//   bio: string;
//   categoryId: string;
//   userId: string;
//   phone?: string;
//   address?: string;
//   email: string;
//   zip?: string;
//   isFeatured?: boolean;
//   experienceYears: number;
//   cv?: string;
//   expertiseAreas: string[];
//   profilePicture?: string;
// }

export interface TutorProfile {
  id: string;
  tid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  address: string;
  zip: string;
  cv?: string | null;
  expertiseAreas: string[];
  experienceYears: number;
  avgRating?: number;
  totalEarned?: number;
  profilePicture?: string | null;
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId?: string;

  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface TutorDetailedProfile {
  id: string;
  tid: string;
  userId: string;
  firstName: string;
  lastName: string;
  isFeatured: boolean;
  profilePicture: string | null;
  bio: string;
  completedSessions: number;
  experienceYears: number;
  cv: string | null;
  expertiseAreas: string[];
  categoryId: string;
  avgRating: number;
  totalReviews: number;
  totalEarned: number;
  phone: string | null;
  address: string | null;
  email: string | null;
  zip: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    status: string | null;
    email: string;
    image: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  slot: {
    id: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    subjectId: string;
    slotPrice: number;
    isBooked: boolean;
    isFeatured: boolean;
    isFree: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    student: {
      id: string;
      firstName: string | null;
      lastName: string | null;
    };
  }[];
}

export interface TutorStats {
  totalEarnings: number;
  totalBookings: number;
  completedBookings: number;
  averageRating: number;
  totalReviews: number;
}

export interface TutorBooking {
  id: string;
  status: BookingStatus;
  studentId: string;
  slotId: string;
  createdAt: string;
  updatedAt: string;
  student: {
    firstName: string;
    lastName: string;
  };
  slot: {
    date: string;
    startTime: string;
    endTime: string;
    tutorId: string;
    slotPrice: number;
  };
}

export interface TutorReview {
  id: string;
  rating: number;
  comment: string;
  tutorId: string;
  studentId: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TutorSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  slotPrice: number;
  tutorId: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateBookingStatusPayload {
  status: BookingStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// ============================================
// QUERY PARAMETERS
// ============================================

export interface GetTutorsParams {
  page?: number;
  limit?: number;
  isFeatured?: boolean;
  search?: string;
  categoryId?: string;
  minRating?: number;
  maxRating?: number;
  minExperience?: number;
  maxExperience?: number;
  sortBy?: string;
  orderBy?: "asc" | "desc";
}
