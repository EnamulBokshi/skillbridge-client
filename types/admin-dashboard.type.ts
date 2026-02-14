import { BookingStatus } from "./student.type";

export interface AdminDashboardStats {
  users: {
    total: number;
    active: number;
    banned: number;
  };

  bookings: {
    total: number;
    completed: number;
    cancelled: number;
    pending: number;
    recent: number; // last 30 days
  };

  revenue: {
    total: number;
    lastThirtyDays: number;
  };

  slots: {
    total: number;
    booked: number;
    free: number;
    available: number;
  };

  reviews: {
    total: number;
    averageRating: number;
  };
}


