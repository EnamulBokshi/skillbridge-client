import {
  BookCheck,
  Bot,
  CircleUserRound,
  FileBarChartIcon,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const studentRoutes = [
  {
    title: "Learning Journey",
    url: "#",
    icon: BookCheck,
    items: [
      {
        title: "My Bookings",
        url: "/dashboard/student/bookings",
        icon: SquareTerminal,
      },
      {
        title: "Booking History",
        url: "/dashboard/student/bookings/all",
        icon: FileBarChartIcon,
      },
    ],
  },
  {
    title: "Support Tools",
    url: "#",
    icon: Bot,
    items: [
      {
        title: "AI Assistant",
        url: "/dashboard/student/ai",
        icon: Bot,
      },
    ],
  },
  {
    title: "Account",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "Profile",
        url: "/dashboard/student/profile",
        icon: CircleUserRound,
      },
    ],
  },
];