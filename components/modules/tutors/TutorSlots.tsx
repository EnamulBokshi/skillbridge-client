"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TutorDetailedProfile } from "@/types/tutor.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign } from "lucide-react";

interface TutorSlotsProps {
  slots: TutorDetailedProfile["slot"];
  tutorId: string;
}

const MAX_SLOTS_PER_DAY = 6;

export default function TutorSlots({ slots, tutorId }: TutorSlotsProps) {
  const router = useRouter();

  const availableSlots = useMemo(() => {
    const now = new Date();
    return slots.filter((slot) => !slot.isBooked && new Date(slot.endTime) > now);
  }, [slots]);

  const groupedSlots = useMemo(() => {
    const grouped = availableSlots.reduce((acc, slot) => {
      const dateLabel = new Date(slot.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!acc[dateLabel]) {
        acc[dateLabel] = [];
      }

      acc[dateLabel].push(slot);
      return acc;
    }, {} as Record<string, typeof availableSlots>);

    return Object.entries(grouped).sort(
      ([a], [b]) => new Date(a).getTime() - new Date(b).getTime(),
    );
  }, [availableSlots]);

  const handleBookSlot = (slotId: string) => {
    router.push(`/confirm-booking?slotId=${slotId}&tutorId=${tutorId}`);
  };

  if (availableSlots.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Available Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-dashed bg-muted/30 px-4 py-10 text-center">
            <p className="text-sm font-medium">No available slots right now</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please check back later or use the contact option for scheduling help.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Available Slots ({availableSlots.length})</CardTitle>
          <p className="text-xs text-muted-foreground">
            Book directly or view the full schedule below.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {groupedSlots.map(([date, dateSlots]) => (
            <div key={date}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Calendar className="h-4 w-4" />
                  {date}
                </h3>
                {dateSlots.length > MAX_SLOTS_PER_DAY && (
                  <p className="text-xs text-muted-foreground">
                    Showing first {MAX_SLOTS_PER_DAY} of {dateSlots.length}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {dateSlots.slice(0, MAX_SLOTS_PER_DAY).map((slot) => {
                  const startTime = new Date(slot.startTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  const endTime = new Date(slot.endTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      key={slot.id}
                      className="rounded-2xl border bg-background/70 p-4 shadow-sm transition-all hover:border-primary/40 hover:bg-background"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {startTime} - {endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">
                            {slot.isFree ? "Free" : slot.slotPrice}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {slot.isFeatured && (
                            <Badge variant="secondary" className="rounded-full text-xs">
                              Featured
                            </Badge>
                          )}
                          {slot.isFree && (
                            <Badge variant="outline" className="rounded-full text-xs">
                              Free
                            </Badge>
                          )}
                        </div>

                        <Button
                          size="sm"
                          onClick={() => handleBookSlot(slot.id)}
                          className="shrink-0 rounded-full min-w-24"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <Button asChild className="w-full rounded-xl">
            <Link href={`/sessions?tutorId=${tutorId}`}>View All Slots</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
