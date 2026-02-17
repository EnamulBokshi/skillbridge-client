import { ApiResponse, PaginatedResponse, TResponse } from "@/types";
import { cookies } from "next/headers";
import { env } from "@/env";
import { IUser } from "@/types/user.type";
import { AdminDashboardStats } from "@/types/admin-dashboard.type";
import { Bookings, BookingSearchParams } from "@/types/bookings.type";
import handleParams from "@/helper/handleSearchParams";

const getAllUser = async (): Promise<PaginatedResponse<IUser>> => {
    try {
        const cookieStore = cookies();
        const respone = await fetch(`${env.NEXT_PUBLIC_API_URL}/admin/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });
        return (await respone.json()) as PaginatedResponse<IUser>;
    } catch (error: any) {
        console.error("Error fetching users:", error);
        throw new Error(error.message || "An error occurred while fetching users.");
    }

}

const cancelBooking = async ( bookingId: string) => {
    try {
        const cookieStore = cookies();
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/admin/sessions/${bookingId}/cancel`,
          { 
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Cookie: cookieStore.toString(),
            },
          });
        
          const data = await response.json();
      return{
        data: data.data,
        error: null,
        message: data.message

      }
    }
     catch (error:any) {
        console.error("Error canceling booking:", error);
        return{
            data: null,
            error: error.message || "An error occurred while canceling the booking.",
            message: error.message || "An error occurred while canceling the booking."
            
        }
    }
}

const confirmBooking = async ( bookingId: string) => {
    try {
        const cookieStore = cookies();
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/admin/sessions/${bookingId}/confirm`,
          { 
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Cookie: cookieStore.toString(),
            },
          });
        
          const data = await response.json();
      return{
        data: data.data,
        error: null,
        message: data.message

      }
    }
     catch (error:any) {
        console.error("Error confirming booking:", error);
        return{
            data: null,
            error: error.message || "An error occurred while confirming the booking.",
            message: error.message || "An error occurred while confirming the booking."
            
        }
    }
}
const getDashboardStats = async():Promise<TResponse<AdminDashboardStats>>=> {
     try {
        const cookieStore = cookies();
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/admin/dashboard-stats`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });
        return  (await response.json()) as TResponse<AdminDashboardStats>;
     }  catch (error: any) {
      console.error("Error creating tutor profile:", error);
      return {
        data: null,
        error: { message: error.message || "Tutor profile creation failed" },
      };
    }
}

const updateUser = async (userId: string, payload: Partial<IUser>): Promise<TResponse<IUser>> => {
   try {
     console.log("AdminService: Updating user with ID:", userId, "Payload:", payload);
     const cookieStore = cookies();
     const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
         method: "PATCH",
         headers: {
             "Content-Type": "application/json",
             Cookie: cookieStore.toString(),
         },
         body: JSON.stringify(payload),
     });
     return (await response.json()) as TResponse<IUser>;
   }  catch (error: any) {
      console.error("Error creating tutor profile:", error);
      return {
        data: null,
        error: { message: error.message || "Tutor profile creation failed" },
      };
    }
}

const getBookings = async(params?:BookingSearchParams):Promise<PaginatedResponse<Bookings>>=> {
   try {
     const cookieStore = cookies();
     const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/bookings`);
     console.log("AdminService: Fetching bookings with params:", params)
     const paramsUrl = handleParams(url.toString(), params);
     console.log("Fetching bookings with URL:", paramsUrl);
     const response = await fetch(paramsUrl, {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             Cookie: cookieStore.toString(),
         },
         cache: "no-store",
         next: { tags: ['bookings'] }
     });
     return (await response.json()) as PaginatedResponse<Bookings>;
   } catch (error: any) {
      console.log(error);
      return {
        success: false,
        data: {
          data: [],
          pagination: {
            page: 1,
            limit: 1,
            totalPages: 1,
            totalRecords: 0,
          },
        },
        error: error,
        message: error.message || "Failed to get tutors",
      };
    }
}
export const adminService = {
    getAllUser,
    cancelBooking,
    confirmBooking,
    getDashboardStats,
    updateUser,
    getBookings
}