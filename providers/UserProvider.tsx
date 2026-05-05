"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { userClientServices as userServices } from "@/services/user.service.client";

interface UserProfile {
  id: string;
  // Add other profile properties as needed
  [key: string]: any;
}

interface UserContextType {
  tutorProfile: UserProfile | null;
  studentProfile: UserProfile | null;
  userId: string | null;
  isLoading: boolean;
  refreshUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [tutorProfile, setTutorProfile] = useState<UserProfile | null>(null);
  const [studentProfile, setStudentProfile] = useState<UserProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const { data: session } = await userServices.getSession();

      if (!session?.user) {
        // User logged out
        setUserId(null);
        setTutorProfile(null);
        setStudentProfile(null);
        return;
      }

      setUserId(session.user.id);

      // Fetch full user details
      const userDetails = await userServices.getUser(session.user.id);

      if (userDetails.data) {
        if (userDetails.data.tutorProfile) {
          setTutorProfile(userDetails.data.tutorProfile);
        }
        if (userDetails.data.student) {
          setStudentProfile(userDetails.data.student);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // On error, clear the profile data
      setUserId(null);
      setTutorProfile(null);
      setStudentProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const value: UserContextType = {
    tutorProfile,
    studentProfile,
    userId,
    isLoading,
    refreshUserProfile: fetchUserProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProvider");
  }
  return context;
}
