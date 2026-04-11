import { SidebarRoute } from "@/types";
import { BadgeInfo, GraduationCap, Sparkles, UserPlus } from "lucide-react";

export const guestRoutes: SidebarRoute[] = [
  {
    title: "Demo Overview",
    url: "#",
    icon: Sparkles,
    items: [
      {
        title: "Dashboard Home",
        url: "/dashboard",
        icon: BadgeInfo,
      },
      {
        title: "Become a Student",
        url: "/signup",
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Start Learning",
    url: "#",
    icon: GraduationCap,
    items: [
      {
        title: "Login",
        url: "/login",
        icon: UserPlus,
      },
      {
        title: "Sign Up",
        url: "/signup",
        icon: GraduationCap,
      },
    ],
  },
];