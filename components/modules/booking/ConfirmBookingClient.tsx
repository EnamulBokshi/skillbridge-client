"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, User, BookOpen } from "lucide-react";
import { TutorDetailedProfile } from "@/types/tutor.type";

interface ConfirmBookingClientProps {
  slot: TutorDetailedProfile["slot"][0];
  tutor: TutorDetailedProfile;
  studentId: string;
}

export default function ConfirmBookingClient({
  slot,
  tutor,
  studentId,
}: ConfirmBookingClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    // Navigate to payment page with booking details
    router.push(
      `/payment?slotId=${slot.id}&tutorId=${tutor.id}&studentId=${studentId}`
    );
  };

  const slotDate = new Date(slot.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const startTime = new Date(slot.startTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = new Date(slot.endTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Confirm Your Booking</h1>
        <p className="text-muted-foreground">
          Please review your booking details before confirming
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tutor Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            {tutor.profilePicture ? (
              <img
                src={tutor.profilePicture}
                alt={`${tutor.firstName} ${tutor.lastName}`}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {tutor.firstName} {tutor.lastName}
              </h3>
              <p className="text-muted-foreground">{tutor.bio}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary">
                  {tutor.experienceYears} years experience
                </Badge>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">{tutor.avgRating || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{slotDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">
                  {startTime} - {endTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium text-xl">
                  ${slot.slotPrice}
                  {slot.isFree && (
                    <Badge variant="outline" className="ml-2">
                      Free
                    </Badge>
                  )}
                </p>
              </div>
            </div>
          </div>

          {slot.isFeatured && (
            <Badge variant="secondary" className="mt-2">
              Featured Session
            </Badge>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold">
              ${slot.isFree ? "0.00" : slot.slotPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Payment will be collected physically at the time of the session
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Proceed to Confirm"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
