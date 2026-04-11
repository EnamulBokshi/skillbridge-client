"use client";

import { ISlotResponse } from "@/types/slot.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Star,
  Trash2,
  BookOpen,
  Tag,
} from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface SlotCardProps {
  slot: ISlotResponse;
  editable?: boolean;
  onEdit?: (slot: ISlotResponse) => void;
  onDelete?: (slotId: string) => void;
}

export function SlotCard({
  slot,
  editable = false,
  onEdit,
  onDelete,
}: SlotCardProps) {
  const startTime = new Date(slot.startTime);
  const endTime = new Date(slot.endTime);
  const slotDate = new Date(slot.date);
  const tutorId = slot.tutorId;

  const durationMs = endTime.getTime() - startTime.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  const hours = Math.floor(durationHours);
  const minutes = Math.round((durationHours - hours) * 60);
  const durationText = hours > 0
    ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`.trim()
    : `${minutes}m`;

  const tutorInitials = slot.tutorProfile
    ? `${slot.tutorProfile.firstName[0]}${slot.tutorProfile.lastName[0]}`
    : "TU";
  const isPastSlot = new Date(slot.endTime) < new Date();
  const isBookable = !editable && !slot.isBooked && !isPastSlot;

  const router = useRouter();
  const handleBookSlot = (slotId: string) => {
    router.push(`/confirm-booking?slotId=${slotId}&tutorId=${tutorId}`);
  };

  const statusLabel = slot.isBooked ? "Booked" : isPastSlot ? "Expired" : "Available";

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-border/70 bg-card/85 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-r from-primary/8 via-secondary/10 to-transparent" />

      <CardHeader className="relative space-y-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 ring-2 ring-border/60">
              <AvatarImage
                src={
                  slot.tutorProfile?.profilePicture ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${slot.tutorProfile?.firstName || "Tutor"}+${slot.tutorProfile?.lastName || "Profile"}`
                }
                alt={
                  slot.tutorProfile
                    ? `${slot.tutorProfile.firstName} ${slot.tutorProfile.lastName}`
                    : "Tutor profile"
                }
              />
              <AvatarFallback>{tutorInitials}</AvatarFallback>
            </Avatar>

            <div>
              <p className="line-clamp-1 text-sm font-semibold">
                {slot.tutorProfile
                  ? `${slot.tutorProfile.firstName} ${slot.tutorProfile.lastName}`
                  : "Assigned Tutor"}
              </p>
              <p className="text-xs text-muted-foreground">Session Tutor</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {slot.isFeatured && (
              <Badge variant="secondary" className="rounded-full">
                <Star className="mr-1 h-3 w-3 fill-current" />
                Featured
              </Badge>
            )}
            {slot.isFree && (
              <Badge variant="outline" className="rounded-full">
                Free
              </Badge>
            )}
            <Badge
              variant={slot.isBooked || isPastSlot ? "outline" : "default"}
              className="rounded-full"
            >
              {statusLabel}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <p className="line-clamp-1 text-base font-semibold capitalize">
              {slot.subject?.name || "General Session"}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Tag className="h-3.5 w-3.5" />
            <span className="line-clamp-1 capitalize">
              {slot.subject?.category?.name || "Uncategorized"}
            </span>
          </div>
        </div>

        <div className="grid gap-2.5 rounded-xl border bg-background/70 p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(slotDate, "EEEE, MMM dd, yyyy")}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {format(startTime, "hh:mm a")} - {format(endTime, "hh:mm a")}
            </span>
            <Badge variant="outline" className="ml-auto rounded-full text-[10px]">
              {durationText}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center justify-between rounded-xl border bg-background/70 px-3 py-2.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Session Fee
          </span>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-lg font-semibold">
              {slot.isFree ? "Free" : `$${slot.slotPrice.toFixed(2)}`}
            </span>
          </div>
        </div>
      </CardContent>

      {editable ? (
        <CardFooter className="gap-2 border-t pt-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit?.(slot)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => onDelete?.(slot.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </CardFooter>
      ) : (
        <CardFooter className="border-t pt-3">
          <Button
            className="w-full rounded-full"
            onClick={() => handleBookSlot(slot.id)}
            disabled={!isBookable}
          >
            {isPastSlot ? "Session Ended" : slot.isBooked ? "Already Booked" : "Book Session"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
