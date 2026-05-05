import { env } from "@/env";
import { IUser } from "@/types/user.type";

export const userClientServices = {
  getSession: async () => {
    try {
      const res = await fetch(`/api/auth/get-session`, {
        cache: "no-store",
        credentials: "include",
      });
      const session = await res.json();
      if (!session) return { data: null, error: { message: "No active session found" } };
      return { data: session, error: null };
    } catch (error: any) {
      console.error(error);
      return { data: null, error: error?.message ?? error };
    }
  },
  getUser: async (userId: string): Promise<{ data: IUser | null; error: any; message?: string }> => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/v1/users/${userId}`, {
        cache: 'no-store',
        credentials: 'include'
      });
      const response = await res.json();
      return { data: response.data, error: null, message: response.message };
    } catch (error: any) {
      return { data: null, error: error?.message ?? error, message: error?.message ?? String(error) };
    }
  },
  logout: async () => {
    try {
      const res = await fetch(`/api/auth/signout`, {
        method: 'POST',
        credentials: 'include'
      });
      return { data: { success: true }, error: null };
    } catch (error: any) {
      console.error(error);
      return { data: null, error: error?.message ?? error, message: error?.message ?? String(error) };
    }
  },
  // Other client-safe methods can be added as needed
};

export default userClientServices;
