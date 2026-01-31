import { SidebarRoute } from "@/types";
import { ChartBarStackedIcon, SquaresIntersect, StretchHorizontal, UserCog, Users2 } from "lucide-react";





export const adminRoutes: SidebarRoute[] = [
    {
      title: "Management",
      url: "#",
      icon: ChartBarStackedIcon,
      items: [
        {
          title: "Category",
          url: "/dashboard/admin/categories",
          icon: ChartBarStackedIcon,
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
        }
        
      ],
    },
   
]