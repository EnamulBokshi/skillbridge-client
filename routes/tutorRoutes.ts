import { Bot, CalendarCheck, DatabaseZap, GalleryThumbnailsIcon, Settings2, SquareArrowDownLeft, SquareArrowOutUpRight, SquareTerminal, UserRoundPen } from "lucide-react";

export const tutorRoutes = [
    {
      title: "Management",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Availability Slots",
          url: "/dashboard/tutor/slots",
          icon: CalendarCheck ,
        },
        {
          title: "Analytics",
          url: "/dashboard/tutor/analytics",
          icon: DatabaseZap 
        },
        {
          title: "Sessions",
          url: "/dashboard/tutor/sessions",
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