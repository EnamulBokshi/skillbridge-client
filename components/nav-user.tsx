"use client"

import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import logoutUser from "@/helper/logout"
import { USER_ROLES } from "@/constants"
import { useRouter } from "next/navigation"
import { ModeToggle } from "./layout/ModeToggler"
import { KeyRound, UserRoundCog } from "lucide-react"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    image: string | null | undefined
    role: string,
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const isGuest = user.role === USER_ROLES.GUEST

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-xl border border-sidebar-border/60 bg-muted/35 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg ring-2 ring-sidebar-border/60 grayscale">
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback className="rounded-lg">{user.name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-sidebar-border/70"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{user.name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {user.role}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Account
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {isGuest ? (
                <DropdownMenuItem onClick={() => router.push(`/signup`)}>
                  <IconUserCircle />
                  Become a Student
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => router.push(`/dashboard/${user.role.toLocaleLowerCase()}/profile`)}>
                  <IconUserCircle /> 
                  Profile
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>

            {!isGuest && (
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Settings
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="min-w-56 rounded-xl border-sidebar-border/70 p-1 shadow-xl">
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/${user.role.toLocaleLowerCase()}/profile?edit=true`)}>
                      <UserRoundCog />
                      Update Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/change-password`)}>
                      <KeyRound />
                      Change Password
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            )}

            <DropdownMenuLabel className="px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Appearance
            </DropdownMenuLabel>
            <div className="px-2 py-1.5">
              <ModeToggle />
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logoutUser}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
