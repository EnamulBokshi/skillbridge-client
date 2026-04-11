export const GUEST_SESSION_COOKIE = "skillbridge-demo-session";

export const GUEST_SESSION_DURATION_SECONDS = 60 * 60 * 24;

import { USER_ROLES } from "@/constants";

export const guestUserProfile = {
  id: "guest-demo-user",
  name: "Guest User",
  email: "guest@skillbridge.local",
  emailVerified: false,
  image: null,
  createdAt: new Date(0),
  updatedAt: new Date(0),
  role: USER_ROLES.GUEST,
  status: "ACTIVE",
  isAssociate: false,
  student: undefined,
  tutorProfile: undefined,
};

export const setGuestSession = () => {
  if (typeof document === "undefined") return;

  document.cookie = `${GUEST_SESSION_COOKIE}=true; path=/; max-age=${GUEST_SESSION_DURATION_SECONDS}`;
};

export const clearGuestSession = () => {
  if (typeof document === "undefined") return;

  document.cookie = `${GUEST_SESSION_COOKIE}=; path=/; max-age=0`;
};