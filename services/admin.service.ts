import { ApiResponse, PaginatedResponse } from "@/types";
import { cookies } from "next/headers";
import { env } from "@/env";
import { IUser } from "@/types/user.type";
import { StudentBooking } from "@/types/student.type";
const getAllUser = async (): Promise<PaginatedResponse<IUser>> => {
    try {
        const cookieStore = await cookies();
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
        const cookieStore = await cookies();
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
        const cookieStore = await cookies();
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
export const adminService = {
    getAllUser,
    cancelBooking,
    confirmBooking

}