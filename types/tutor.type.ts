// ============================================
// ENUMS
// ============================================

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED"
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
  firstName?: string;
  lastName?: string;
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

export interface TutorProfile {
  id: string;
  tid: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  bio: string | null;
  expertise: string | null;
  experience: number | null;
  hourlyRate: number | null;
  education: string | null;
  languages: string[];
  certifications: string[];
  profilePicture: string | null;
  isFeatured: boolean;
  totalEarned: number;
  avgRating: number;
  createdAt: string;
  updatedAt: string;
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
