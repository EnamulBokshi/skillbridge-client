import { PaginatedResponse, TResponse } from "@/types";
import { cookies } from "next/headers";
import { env } from "@/env";
import { IUser, UserFilterParams } from "@/types/user.type";
import { AdminDashboardStats } from "@/types/admin-dashboard.type";
import { Bookings, BookingSearchParams } from "@/types/bookings.type";
import handleParams from "@/helper/handleSearchParams";

const getAllUser = async (params?: UserFilterParams): Promise<PaginatedResponse<IUser>> => {
    try {
`${env.NEXT_PUBLIC_API_URL}/admin/users`
        const cookieStore = await cookies();

        const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/users`);
        const paramUrl = handleParams(url.toString(), params)
        const respone = await fetch(paramUrl, {
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
const getDashboardStats = async():Promise<TResponse<AdminDashboardStats>>=> {
     try {
        const cookieStore = await cookies();
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
     const cookieStore = await cookies();
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
     const cookieStore = await cookies();
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
// ============ SUPER_ADMIN SERVICES ============

const getAllAdmins = async (page: number = 1, limit: number = 10) => {
    try {
        const cookieStore = await cookies();
        const url = new URL(`${env.NEXT_PUBLIC_API_URL}/api/v1/admin/super/admins`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());
        
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });
        return (await response.json()) as PaginatedResponse<IUser>;
    } catch (error: any) {
        console.error("Error fetching admins:", error);
        throw new Error(error.message || "An error occurred while fetching admins.");
    }
};

const createAdmin = async (payload: { email: string; name: string; password: string }) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/admin/super/admins`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        
        if (!response.ok) {
            return {
                data: null,
                error: data.message || "Failed to create admin",
                message: data.message || "Failed to create admin",
            };
        }
        
        return {
            data: data.data,
            error: null,
            message: data.message || "Admin created successfully",
        };
    } catch (error: any) {
        console.error("Error creating admin:", error);
        return {
            data: null,
            error: error.message || "An error occurred while creating admin",
            message: error.message || "An error occurred while creating admin",
        };
    }
};

const updateAdmin = async (adminId: string, payload: { email?: string; name?: string; status?: string }) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/admin/super/admins/${adminId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        
        if (!response.ok) {
            return {
                data: null,
                error: data.message || "Failed to update admin",
                message: data.message || "Failed to update admin",
            };
        }
        
        return {
            data: data.data,
            error: null,
            message: data.message || "Admin updated successfully",
        };
    } catch (error: any) {
        console.error("Error updating admin:", error);
        return {
            data: null,
            error: error.message || "An error occurred while updating admin",
            message: error.message || "An error occurred while updating admin",
        };
    }
};

const deleteAdmin = async (adminId: string) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/admin/super/admins/${adminId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });
        const data = await response.json();
        
        if (!response.ok) {
            return {
                data: null,
                error: data.message || "Failed to delete admin",
                message: data.message || "Failed to delete admin",
            };
        }
        
        return {
            data: data.data,
            error: null,
            message: data.message || "Admin deleted successfully",
        };
    } catch (error: any) {
        console.error("Error deleting admin:", error);
        return {
            data: null,
            error: error.message || "An error occurred while deleting admin",
            message: error.message || "An error occurred while deleting admin",
        };
    }
};

const getAllUsers = async (params?: UserFilterParams): Promise<PaginatedResponse<IUser>> => {
    try {
        const cookieStore = await cookies();
        const url = new URL(`${env.NEXT_PUBLIC_API_URL}/api/v1/admin/super/users`);
        const paramUrl = handleParams(url.toString(), params);
        
        const response = await fetch(paramUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });
        return (await response.json()) as PaginatedResponse<IUser>;
    } catch (error: any) {
        console.error("Error fetching users:", error);
        throw new Error(error.message || "An error occurred while fetching users.");
    }
};

const deleteUser = async (userId: string) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/admin/super/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });
        const data = await response.json();
        
        if (!response.ok) {
            return {
                data: null,
                error: data.message || "Failed to delete user",
                message: data.message || "Failed to delete user",
            };
        }
        
        return {
            data: data.data,
            error: null,
            message: data.message || "User deleted successfully",
        };
    } catch (error: any) {
        console.error("Error deleting user:", error);
        return {
            data: null,
            error: error.message || "An error occurred while deleting user",
            message: error.message || "An error occurred while deleting user",
        };
    }
};

const banUser = async (userId: string) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/admin/super/users/${userId}/ban`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });
        const data = await response.json();
        
        if (!response.ok) {
            return {
                data: null,
                error: data.message || "Failed to ban user",
                message: data.message || "Failed to ban user",
            };
        }
        
        return {
            data: data.data,
            error: null,
            message: data.message || "User banned successfully",
        };
    } catch (error: any) {
        console.error("Error banning user:", error);
        return {
            data: null,
            error: error.message || "An error occurred while banning user",
            message: error.message || "An error occurred while banning user",
        };
    }
};

const unbanUser = async (userId: string) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/admin/super/users/${userId}/unban`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });
        const data = await response.json();
        
        if (!response.ok) {
            return {
                data: null,
                error: data.message || "Failed to unban user",
                message: data.message || "Failed to unban user",
            };
        }
        
        return {
            data: data.data,
            error: null,
            message: data.message || "User unbanned successfully",
        };
    } catch (error: any) {
        console.error("Error unbanning user:", error);
        return {
            data: null,
            error: error.message || "An error occurred while unbanning user",
            message: error.message || "An error occurred while unbanning user",
        };
    }
};

export const adminService = {
    getAllUser,
    cancelBooking,
    confirmBooking,
    getDashboardStats,
    updateUser,
    getBookings,
    // Super Admin Services
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAllUsers,
    deleteUser,
    banUser,
    unbanUser,
}