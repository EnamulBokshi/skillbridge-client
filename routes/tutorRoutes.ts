import { Bot, CalendarCheck, DatabaseZap, GalleryThumbnailsIcon, Settings2, SquareArrowDownLeft, SquareArrowOutUpRight, SquareTerminal, UserRoundPen } from "lucide-react";

export const tutorRoutes = [
    {
      title: "Blogs",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Availability Slots",
          url: "/dashboard/availability",
          icon: CalendarCheck ,
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: DatabaseZap 
        },
        {
          title: "Settings",
          url: "/dashboard/tutor/settings",
          icon: UserRoundPen,
        },
      ],
    },
    {
      title: "Controls",
      url: "#",
      icon: Settings2,
      items: [      
        {
          title: "Profile",
          url: "/dashboard/tutor/profile",
          icon: GalleryThumbnailsIcon,
        },
      ],
    },
]