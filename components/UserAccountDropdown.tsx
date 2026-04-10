"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/user.type";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useConfirm } from "./modules/common/ConfirmDialog";
import { ModeToggle } from "./layout/ModeToggler";

interface UserAccountDropdownProps {
  user: Pick<IUser, "id" | "name" | "email" | "image" | "role">;
  showThemeToggle?: boolean;
  align?: "start" | "center" | "end";
  triggerSize?: "sm" | "md";
}

export function UserAccountDropdown({
  user,
  showThemeToggle = false,
  align = "end",
  triggerSize = "md",
}: UserAccountDropdownProps) {
  const { confirm } = useConfirm();

  const handleLogout = async () => {
    const ok = await confirm({
      title: "Logout?",
      description: "You will need to login again.",
      confirmText: "Logout",
      destructive: true,
    });
    if (!ok) return;
    const loading = toast.loading("Logging out...");
    await authClient.signOut();
    toast.dismiss(loading);
    toast.success("Logged out!");
    window.location.href = "/";
  };

  const userDisplayName = user?.name?.trim() || "User";
  const userDisplayEmail = user?.email?.trim() || "No email";
  const userAvatar = user?.image || undefined;
  const userFallbackLetter = userDisplayName.charAt(0).toUpperCase() || "U";

  const profileUrl = (() => {
    const role = user?.role?.toString().toUpperCase();
    if (role === "ADMIN" && user?.id) return `/dashboard/admin/users/${user.id}`;
    if (role === "TUTOR") return "/dashboard/tutor/profile";
    if (role === "STUDENT") return "/dashboard/student/profile";
    return "/dashboard";
  })();

  const triggerClasses =
    triggerSize === "sm"
      ? "h-8 w-8 p-1"
      : "px-2 py-1.5";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          className={`group flex items-center gap-2 rounded-full border border-white/20 bg-background/60 text-left shadow-sm backdrop-blur-md transition-colors hover:border-primary/50 ${triggerClasses}`}
        >
          <Avatar className={triggerSize === "sm" ? "h-8 w-8" : "h-8 w-8"}>
            <AvatarImage src={userAvatar} alt={userDisplayName} />
            <AvatarFallback className="bg-primary/15 text-primary font-semibold">
              {userFallbackLetter}
            </AvatarFallback>
          </Avatar>
          {triggerSize === "md" && (
            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          )}
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        sideOffset={10}
        className="w-72 rounded-2xl border border-white/15 bg-background/90 p-0 shadow-xl backdrop-blur-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="p-4"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <Avatar className="h-14 w-14 border border-white/25 shadow-sm">
              <AvatarImage src={userAvatar} alt={userDisplayName} />
              <AvatarFallback className="bg-primary/15 text-primary text-lg font-semibold">
                {userFallbackLetter}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-semibold text-foreground">{userDisplayName}</p>
            <p className="text-xs text-muted-foreground">{userDisplayEmail}</p>
          </div>
        </motion.div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
            <Link href={profileUrl} className="flex items-center gap-2">
              <UserCircle2 className="h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className={`p-2 flex items-center ${showThemeToggle ? "justify-between" : "justify-start"}`}>
          <DropdownMenuItem
            className="cursor-pointer rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive flex-1"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
          {showThemeToggle && (
            <div className="ml-2">
              <ModeToggle />
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
