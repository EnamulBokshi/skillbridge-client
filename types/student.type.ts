// ============================================
// ENUMS
// ============================================

export enum StudentStatus {
  ACTIVE = "ACTIVE",
  BAN = "BAN",
  INACTIVE = "INACTIVE"
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED"
}

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface CreateStudentPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  email?: string;
  zip?: string;
}

export interface UpdateStudentPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  email?: string;
  zip?: string;
  profilePicture?: string;
  status?: StudentStatus;
}

export interface StudentProfile {
  id: string;
  sid?: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  status: StudentStatus;
  profilePicture: string | null;
  phone: string | null;
  address: string | null;
  email: string | null;
  zip: string | null;
  completedSessions?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentDetailedProfile extends StudentProfile {
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    role: 'STUDENT' | 'TUTOR' | 'ADMIN';
    status: StudentStatus;
  };
  reviews: {
    id: string;
    rating: number;
    comment: string;
    tutorId: string;
    studentId: string;
    createdAt: string;
    updatedAt: string;
    tutor: {
      tid: string;
      firstName: string;
      lastName: string;
      avgRating: number;
    };
  }[];
  bookings: {
    id: string;
    studentId: string;
    slotId: string;
    status: BookingStatus;
    createdAt: string;
    updatedAt: string;
    slot: {
      id: string;
      tutorId: string;
      date: string;
      startTime: string;
      endTime: string;
      slotPrice: number;
      isBooked: boolean;
      isFeatured: boolean;
      isFree: boolean;
      subjectId: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export interface StudentStats {
  totalBookings: number;
  totalUpcomingBookings: number;
  totalCompletedBookings: number;
  latestBooking: {
    id: string;
    studentId: string;
    slotId: string;
    status: BookingStatus;
    createdAt: string;
    updatedAt: string;
    slot: {
      tutorProfile: {
        id: string;
        firstName: string;
        lastName: string;
      }
      id: string;
      date: string;
      slotPrice: number;
      startTime: string;
      endTime: string;
    };
  } [] | null;
  totalReviews: number;
}



export interface CreateReviewPayload {
  tutorId: string;
  rating: number;
  comment?: string;
}

export interface StudentReview {
  id: string;
  tutorId: string;
  studentId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  error: any | null;
  message: string;
  data: T;
}
