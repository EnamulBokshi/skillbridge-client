import { SidebarRoute } from "@/types";
import {
  BookA,
  BookCopy,
  Bot,
  ChartBarStackedIcon,
  Mail,
  StretchHorizontal,
  Tags,
  UserCog,
} from "lucide-react";





export const adminRoutes: SidebarRoute[] = [
    {
      title: "Management",
      url: "#",
      icon: ChartBarStackedIcon,
      items: [
        {
          title: "Categories",
          url: "/dashboard/admin/categories",
          icon: Tags,
          isActive: true,
        },
        {
          title: "Users",
          url:"/dashboard/admin/users",
          icon: UserCog,
          isActive: false
        },
        {
          title: "Slots",
          url:"/dashboard/admin/slots",
          icon: StretchHorizontal ,
          isActive: false
        },
        {
          title: "Bookings",
          url:"/dashboard/admin/bookings",
          icon: BookA ,
          isActive: false
        },
        {
          title: "Subjects",
          url:"/dashboard/admin/subjects",
          icon: BookCopy ,
          isActive: false
        },
        {
          title: "AI Assistant",
          url: "/dashboard/admin/ai",
          icon: Bot,
          isActive: false,
        },
        {
          title: "Newsletter",
          url: "/dashboard/admin/newsletter",
          icon: Mail,
          isActive: false,
        }
        
      ],
    },
   
]