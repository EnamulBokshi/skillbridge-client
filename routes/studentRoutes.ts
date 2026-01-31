import {  FileBarChartIcon, Settings2, SquareTerminal } from "lucide-react";

export const studentRoutes = [
    {
      title: "Bookings",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Bookings",
          url: "/dashboard/student/bookings",
          icon: SquareTerminal
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/dashboard/student/profile",
          icon: FileBarChartIcon
        },
        
      ],
    },
]