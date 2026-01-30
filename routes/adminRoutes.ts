import { ChartBarStackedIcon, DatabaseBackup, LucideWholeWord } from "lucide-react";


export const adminRoutes = [
 
    
    {
      title: "Management",
      url: "#",
      icon: ChartBarStackedIcon,
      items: [
        {
          title: "Category",
          url: "/dashboard/admin/categories",
        },
        {
          title: "Users",
          url:"/dashboard/admin/users"
        },
        {
          title: "Slots",
          url:"/dashboard/admin/slots"
        }
        
      ],
    },
   
]