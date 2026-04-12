import { SidebarRoute } from "@/types";
import {
  BookA,
  BookCopy,
  Bot,
  CircleUserRound,
  ChartBarStackedIcon,
  ClipboardCheck,
  Inbox,
  GraduationCap,
  Mail,
  StretchHorizontal,
  Tags,
  UserCog,
  Shield,
} from "lucide-react";

export const adminRoutes: SidebarRoute[] = [
  {
    title: "Academic Catalog",
    url: "#",
    icon: GraduationCap,
    items: [
      {
        title: "Categories",
        url: "/dashboard/admin/categories",
        icon: Tags,
      },
      {
        title: "Subjects",
        url: "/dashboard/admin/subjects",
        icon: BookCopy,
      },
    ],
  },
  {
    title: "Platform Operations",
    url: "#",
    icon: ChartBarStackedIcon,
    items: [
      {
        title: "Users",
        url: "/dashboard/admin/users",
        icon: UserCog,
      },
      {
        title: "Slots",
        url: "/dashboard/admin/slots",
        icon: StretchHorizontal,
      },
      {
        title: "Bookings",
        url: "/dashboard/admin/bookings",
        icon: BookA,
      },
      {
        title: "Admin Management",
        url: "/dashboard/admin/management",
        icon: Shield,
      },
    ],
  },
  {
    title: "Engagement & Growth",
    url: "#",
    icon: ClipboardCheck,
    items: [
      {
        title: "AI Assistant",
        url: "/dashboard/admin/ai",
        icon: Bot,
      },
      {
        title: "Newsletter",
        url: "/dashboard/admin/newsletter",
        icon: Mail,
      },
      {
        title: "Contact Inbox",
        url: "/dashboard/admin/contacts",
        icon: Inbox,
      },
    ],
  },
  {
    title: "Account",
    url: "#",
    icon: CircleUserRound,
    items: [
      {
        title: "Profile",
        url: "/dashboard/admin/profile",
        icon: CircleUserRound,
      },
    ],
  },
];