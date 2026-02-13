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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2, User, X } from "lucide-react";
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

  return (
    <Card className="relative w-full max-w-md rounded-2xl shadow-sm hover:shadow-md transition">
      {/* Header */}
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image ?? ""} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold leading-none">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {user.role !== "ADMIN" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
          >
            <User className="mr-1 h-4 w-4" />
            View Profile
          </Button>
        )}
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-wrap gap-2">
        <Badge variant="secondary">{user.role}</Badge>

        <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
          {user.status}
        </Badge>

        {user.isAssociate && <Badge variant="outline">Associate</Badge>}
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Joined on {new Date(user.createdAt).toLocaleDateString()}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete && onDelete(user.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
            {user.status !== "BANNED" && (
              <DropdownMenuItem
                className="text-warning "
                onClick={() => onBan && onBan(user.id)}
              >
                <X className="mr-2 h-4 w-4 text-destructive" />
                Ban
              </DropdownMenuItem>
            )}
            {user.status === "BANNED" && (
              <DropdownMenuItem
                className="text-warning "
                onClick={() => onUnban && onUnban(user.id)}
              >
                <X className="mr-2 h-4 w-4 text-destructive" />
                Unban
              </DropdownMenuItem>
            )}
            {user.role !== "ADMIN" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
              >
                <User className="mr-1 h-4 w-4" />
                View Profile
              </Button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
