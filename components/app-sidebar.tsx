"use client"

import * as React from "react"
import Link from "next/link"
import { LucideGraduationCap, LayoutGrid, Sparkles } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { USER_ROLES } from "@/constants"
import { SidebarRoute } from "@/types"
import { IUser } from "@/types/user.type"
import { adminRoutes } from "@/routes/adminRoutes"
import { guestRoutes } from "@/routes/guestRoutes"
import { studentRoutes } from "@/routes/studentRoutes"
import { tutorRoutes } from "@/routes/tutorRoutes"

const roleMeta: Record<string, { label: string; subtitle: string }> = {
  [USER_ROLES.ADMIN]: {
    label: "Administrator",
    subtitle: "Platform governance and quality",
  },
  [USER_ROLES.TUTOR]: {
    label: "Tutor Workspace",
    subtitle: "Teach, schedule, and track progress",
  },
  [USER_ROLES.STUDENT]: {
    label: "Student Workspace",
    subtitle: "Learn, book, and improve outcomes",
  },
  [USER_ROLES.GUEST]: {
    label: "Guest Demo",
    subtitle: "Preview the platform with sample data",
  },
}

export function AppSidebar({
  user,
  ...props
}: { user: IUser } & React.ComponentProps<typeof Sidebar>) {
  let routes: SidebarRoute[] = []

  switch (user.role) {
    case USER_ROLES.ADMIN:
      routes = adminRoutes
      break
    case USER_ROLES.STUDENT:
      routes = studentRoutes
      break
    case USER_ROLES.TUTOR:
      routes = tutorRoutes
      break
    case USER_ROLES.GUEST:
      routes = guestRoutes
      break
    default:
      routes = []
  }

  const activeRoleMeta =
    roleMeta[user.role] || {
      label: "Workspace",
      subtitle: "Manage your dashboard",
    }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="gap-3 px-3 pt-5 pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-auto p-0 hover:bg-transparent hover:text-sidebar-foreground text-sidebar-foreground transition-colors duration-200"
            >
              <Link href="/" className="group rounded-2xl border border-sidebar-border/60 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <LucideGraduationCap className="size-5" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold tracking-wide">SkillBridge</span>
                    <span className="truncate text-xs text-muted-foreground">Learning Platform</span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="rounded-xl border border-sidebar-border/50 bg-muted/35 px-3 py-2">
          <div className="flex items-center gap-2 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            {activeRoleMeta.label}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{activeRoleMeta.subtitle}</p>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-10 rounded-xl border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary transition-colors duration-200"
            >
              <Link href="/dashboard" className="flex items-center gap-2 font-medium">
                <LayoutGrid className="size-4" />
                Dashboard Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="mx-3" />

      <SidebarContent className="px-1 pb-2">
        <NavMain routes={routes} />
      </SidebarContent>

      <SidebarFooter className="px-2 pb-3">
        <SidebarSeparator className="mx-1" />
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
