import { env } from "@/env";
import { StudentRegistration } from "@/types/user.type";
import { get } from "http";
import { cookies } from "next/headers";
const apiBaseUrl = env.NEXT_PUBLIC_API_URL;
const studentService = {
  createStudent: async (studentData: StudentRegistration) => {
    try {
      const cookieStore = await cookies();
      // console.log("Student Data:", studentData); // Debug log
      const response = await fetch(`${apiBaseUrl}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(studentData),
      });
      const resonseData = await response.json();
      console.log("Response Data from createStudent:", resonseData); // Debug log

      if (!response.ok) {
        return {
          data: null,
          error: {
            message: resonseData.message || "Failed to create student profile",
          },
        };
      }
      return { data: resonseData.data, error: null };
    } catch (error: any) {
      console.error("Error creating student profile:", error);
      return {
        data: null,
        error: { message: "Student profile creation failed" },
      };
    }
  },
  getStudentProfile: async (studentId: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/students/${studentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const responseData = await response.json();
      return {
        data: responseData.data,
        success: responseData.success,
        message: responseData.message,
        error: responseData.error,
      };
    } catch (error: any) {
      console.error("Error fetching student profile:", error);
      return {
        data: null,
        error: { message: "Fetching student profile failed" },
      };
    }
  },
  updateStudentProfile: async (
    studentId: string,
    studentData: Partial<StudentRegistration>,
  ) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(studentData),
      });
      const responseData = await response.json();
      return {
        data: responseData.data,
        success: responseData.success,
        message: responseData.message,
        error: responseData.error,
      };
    } catch (error: any) {
      console.error("Error updating student profile:", error);
      return {
        data: null,
        error: { message: "Updating student profile failed" },
      };
    }
  },
  deleteStudentProfile: async (studentId: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${apiBaseUrl}/students/${studentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const responseData = await response.json();
      return {
        data: responseData.data,
        success: responseData.success,
        message: responseData.message,
        error: responseData.error,
      };
    } catch (error: any) {
      console.error("Error deleting student profile:", error);
      return {
        data: null,
        error: { message: "Deleting student profile failed" },
      };
    }
  },
  getStudentStats: async (studentId: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(
        `${apiBaseUrl}/students/${studentId}/stats`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
        },
      );
      const responseData = await response.json();
      return {
        data: responseData.data,
        success: responseData.success,
        message: responseData.message,
        error: responseData.error,
      };
    } catch (error: any) {
      console.error("Error fetching student stats:", error);
      return {
        data: null,
        error: { message: "Fetching student stats failed" },
      };
    }
  },
  getCompletedSessions: async (studentId: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(
        `${apiBaseUrl}/students/${studentId}/completed-sessions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
          next: {tags: ['student-completed-sessions']},
        },
      );
      const responseData = await response.json();
      return {
        data: responseData.data,
        success: responseData.success,
        message: responseData.message,
        error: responseData.error,
      };
    } catch (error: any) {
      console.error("Error fetching completed sessions:", error);
      return {
        data: null,
        error: { message: "Fetching completed sessions failed" },
      };
    }
  },
  getUpcomingSessions: async (studentId: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(
        `${apiBaseUrl}/students/${studentId}/upcoming-sessions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
          next: {tags: ['student-upcoming-sessions']},
        },
      );
      const responseData = await response.json();
      return {
        data: responseData.data,
        success: responseData.success,
        message: responseData.message,
        error: responseData.error,
      };
    } catch (error: any) {
      console.error("Error fetching upcoming sessions:", error);
      return {
        data: null,
        error: { message: "Fetching upcoming sessions failed" },
      };
    }
  }
};

export { studentService };
