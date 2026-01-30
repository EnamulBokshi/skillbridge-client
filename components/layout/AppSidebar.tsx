"use client"

import * as React from "react"
import {
  Bot,
  DatabaseBackup,
  LucideIcon,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { adminRoutes } from "@/routes/adminRoutes"
import { studentRoutes } from "@/routes/studentRoutes"
import { tutorRoutes } from "@/routes/tutorRoutes"
import { Route } from "@/types"
import { USER_ROLES as UserRole } from "@/constants"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
 
  navMain: [
    {
      title: "Blogs",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Write Blog",
          url: "/dashboard/write-blog",
        },
        {
          title: "View Blogs",
          url: "/dashboard/view-blogs",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: DatabaseBackup,
      items: [
        {
          title: "View Stats",
          url: "/dashboard/blogs-stats",
        },
        
      ],
    },
   
  ],
 
}

export function AppSidebar({user, ...props }:{user:{role:string}} & React.ComponentProps<typeof Sidebar>) {

let routes:Route[] = [];
switch(user.role){
  case UserRole.ADMIN: 
      routes = adminRoutes
      break;
  case UserRole.STUDENT:
    routes = studentRoutes;
    break;

  case UserRole.TUTOR:
    routes = tutorRoutes;
    break;
  default:
    routes = [];
    break;
}


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
