import { BookingStatus } from "./student.type";

export interface Bookings {
  id: string;
  status: BookingStatus;
  studentId: string;
  slotId: string;
  createdAt: string;
  updatedAt: string;
  student: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    profilePicture?: string | null;
    email?: string | null;
  };
  slot: {
    date: string;
    startTime: string;
    endTime: string;
    tutorId: string;
    slotPrice: number;
    tutorProfile: {
      id: string;
      firstName: string;
      lastName: string;
      email?: string | null;
      profilePicture?: string | null;
    };
  };
}

export interface BookingBasic {
  id: string;
  studentId: string;
  slotId: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingSearchParams {
  search?: string;
  status?: BookingStatus;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}