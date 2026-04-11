import {
  Bot,
  CalendarCheck,
  DatabaseZap,
  GalleryThumbnailsIcon,
  Settings2,
  SquareTerminal,
  UserRoundPen,
  ViewIcon,
} from "lucide-react";

export const tutorRoutes = [
  {
    title: "Teaching Workflow",
    url: "#",
    icon: SquareTerminal,
    items: [
      {
        title: "Availability Slots",
        url: "/dashboard/tutor/slots",
        icon: CalendarCheck,
      },
      {
        title: "Sessions",
        url: "/dashboard/tutor/sessions",
        icon: GalleryThumbnailsIcon,
      },
      {
        title: "Student Reviews",
        url: "/dashboard/tutor/reviews",
        icon: ViewIcon,
      },
    ],
  },
  {
    title: "Performance",
    url: "#",
    icon: DatabaseZap,
    items: [
      {
        title: "Analytics",
        url: "/dashboard/tutor/analytics",
        icon: DatabaseZap,
      },
    ],
  },
  {
    title: "Account & Tools",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "Profile",
        url: "/dashboard/tutor/profile",
        icon: UserRoundPen,
      },
      {
        title: "AI Assistant",
        url: "/dashboard/tutor/ai",
        icon: Bot,
      },
    ],
  },
];