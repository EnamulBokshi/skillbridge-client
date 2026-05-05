"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pencil,
  Trash2,
  User,
  ShieldOff,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user.type";

export interface UserCardProps {
  user: IUser;
  onEdit?: () => void;
  onDelete?: (userId: string) => void;
  onBan?: (userId: string) => void;
  onUnban?: (userId: string) => void;
}

export function UserCard({
  user,
  onEdit,
  onDelete,
  onBan,
  onUnban,
}: UserCardProps) {
  const router = useRouter();
  const handleViewProfile = () =>
    router.push(`/dashboard/admin/users/${user.id}`);

  const isBanned = user.status === "BANNED";

  return (
    <Card className="
      relative flex flex-col w-full min-w-0 overflow-hidden
      rounded-2xl border border-border/60
      bg-card shadow-sm
      transition-all duration-200
      hover:border-primary/30 hover:shadow-md
      dark:border-border/50 dark:hover:border-primary/40
    ">
      {/* Header */}
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start gap-3 min-w-0">
          {/* Avatar */}
          <Avatar className="
            h-10 w-10 shrink-0
            ring-2 ring-primary/20 ring-offset-2 ring-offset-background
            dark:ring-primary/30
          ">
            <AvatarImage src={user.image ?? ""} alt={user.name} />
            <AvatarFallback className="text-sm font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Name / Email + Actions */}
          <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
            {/* Text */}
            <div className="min-w-0 flex-1 space-y-0.5">
              <h3 className="truncate text-sm font-semibold leading-snug">
                {user.name}
              </h3>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex shrink-0 items-center gap-1">
              {/* Icon-only on md/lg (sidebar takes space); full label on xl+ */}
              {user.role !== "ADMIN" && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-lg xl:hidden"
                    onClick={handleViewProfile}
                    aria-label="View profile"
                  >
                    <User className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden xl:flex h-7 px-2.5 text-xs gap-1.5 whitespace-nowrap"
                    onClick={handleViewProfile}
                  >
                    <User className="h-3 w-3" />
                    View Profile
                  </Button>
                </>
              )}

              {/* Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-lg"
                    aria-label="Open user actions"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={onEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>

                  {user.role !== "ADMIN" && (
                    <DropdownMenuItem
                      onClick={handleViewProfile}
                      className="xl:hidden"
                    >
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  {!isBanned ? (
                    <DropdownMenuItem
                      onClick={() => onBan?.(user.id)}
                      className="text-amber-600 focus:text-amber-600 dark:text-amber-500"
                    >
                      <ShieldOff className="mr-2 h-4 w-4" />
                      Ban User
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => onUnban?.(user.id)}
                      className="text-emerald-600 focus:text-emerald-600 dark:text-emerald-500"
                    >
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Unban User
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDelete?.(user.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Badges */}
      <CardContent className="px-4 pb-2 pt-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {user.role}
          </Badge>
          <Badge
            variant={isBanned ? "destructive" : "default"}
            className="text-xs px-2 py-0.5"
          >
            {user.status}
          </Badge>
          {user.isAssociate && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              Associate
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-auto px-4 pb-4 pt-2">
        <p className="text-xs text-muted-foreground">
          Joined{" "}
          {new Date(user.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </CardFooter>
    </Card>
  );
}