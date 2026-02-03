"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TutorDetailedProfile } from "@/types/tutor.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign } from "lucide-react";

interface TutorSlotsProps {
  slots: TutorDetailedProfile["slot"];
  tutorId: string;
}

export default function TutorSlots({ slots, tutorId }: TutorSlotsProps) {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Filter available slots (not booked)
  const availableSlots = slots.filter((slot) => !slot.isBooked);

  // Check if a slot is in the past
  const isSlotInPast = (slotEndTime: Date) => {
    const now = new Date();
    const endTime = new Date(slotEndTime);
    return endTime < now;
  };

  // Group slots by date
  const slotsByDate = availableSlots.reduce((acc, slot) => {
    const date = new Date(slot.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, typeof availableSlots>);

  const handleBookSlot = (slotId: string) => {
    // Redirect to confirm booking page with slot and tutor details
    router.push(`/confirm-booking?slotId=${slotId}&tutorId=${tutorId}`);
  };

  if (availableSlots.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Available Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No available slots at the moment. Please check back later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Slots ({availableSlots.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(slotsByDate).map(([date, dateSlots]) => (
            <div key={date}>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {date}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dateSlots.map((slot) => {
                  const isPastSlot = isSlotInPast(slot.endTime);
                  const startTime = new Date(slot.startTime).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );
                  const endTime = new Date(slot.endTime).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );

                  return (
                    <div
                      key={slot.id}
                      className={`border rounded-lg p-4 transition-all ${
                        isPastSlot
                          ? "opacity-60 bg-muted/50"
                          : selectedSlot === slot.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {startTime} - {endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-bold">{slot.slotPrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-2 flex-wrap">
                          {slot.isFeatured && (
                            <Badge variant="secondary" className="text-xs">
                              Featured
                            </Badge>
                          )}
                          {slot.isFree && (
                            <Badge variant="outline" className="text-xs">
                              Free
                            </Badge>
                          )}
                          {isPastSlot && (
                            <Badge variant="destructive" className="text-xs">
                              Past
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleBookSlot(slot.id)}
                          disabled={selectedSlot === slot.id || isPastSlot}
                          className="shrink-0 min-w-[90px]"
                        >
                          {isPastSlot
                            ? "Past"
                            : selectedSlot === slot.id
                            ? "Selected"
                            : "Book Now"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
