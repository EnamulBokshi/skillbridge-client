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

  // Calculate duration in hours
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  const hours = Math.floor(durationHours);
  const minutes = Math.round((durationHours - hours) * 60);
  const durationText = hours > 0 
    ? `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`.trim()
    : `${minutes}m`;

  // Get tutor initials for avatar fallback
  const tutorInitials = slot.tutorProfile
    ? `${slot.tutorProfile.firstName[0]}${slot.tutorProfile.lastName[0]}`
    : "TU";

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {/* Featured Badge */}
      {slot.isFeatured && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <Star className="w-3 h-3 mr-1 fill-white" />
            Featured
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        {/* Tutor Profile */}
        {slot.tutorProfile && (
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={slot.tutorProfile.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${slot.tutorProfile.firstName}+${slot.tutorProfile.lastName}`} 
                alt={`${slot.tutorProfile.firstName} ${slot.tutorProfile.lastName}`} 
              />
              <AvatarFallback>{tutorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">
                {slot.tutorProfile.firstName} {slot.tutorProfile.lastName}
              </p>
              <p className="text-xs text-muted-foreground">Tutor</p>
            </div>
          </div>
        )}

        {/* Subject & Category */}
        {slot.subject && (
          <div className="space-y-1 mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm capitalize">
                {slot.subject.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground capitalize">
                {slot.subject.category.name}
              </span>
            </div>
          </div>
        )}

        {/* Date & Time */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {format(slotDate, "EEEE, MMM dd, yyyy")}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {format(startTime, "hh:mm a")} - {format(endTime, "hh:mm a")}
            <Badge variant="outline" className="text-xs ml-auto">
              {durationText}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Price & Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold">
              {slot.isFree ? (
                <Badge variant="outline" className="text-lg">
                  FREE
                </Badge>
              ) : (
                `$${slot.slotPrice.toFixed(2)}`
              )}
            </span>
          </div>

          {/* Status Badge */}
          {slot.isBooked ? (
            <Badge variant="secondary">Booked</Badge>
          ) : (
            <Badge className="bg-green-500 hover:bg-green-600">
              Available
            </Badge>
          )}
        </div>
      </CardContent>

      {editable && (
        <CardFooter className="gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit?.(slot)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => onDelete?.(slot.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      )}

      {!editable && !slot.isBooked && (
        <CardFooter className="pt-4 border-t">
          <Button className="w-full">Book Now</Button>
        </CardFooter>
      )}
    </Card>
  );
}
