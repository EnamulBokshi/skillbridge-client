"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  DollarSign,
  User,
  CheckCircle2,
  Loader2,
  AlertCircle,
  HandCoins,
} from "lucide-react";
import { TutorDetailedProfile } from "@/types/tutor.type";
import { createBookingAction } from "@/action/booking.action";
import { toast } from "sonner";

interface PaymentClientProps {
  slot: TutorDetailedProfile["slot"][0];
  tutor: TutorDetailedProfile;
  studentId: string;
}

export default function PaymentClient({
  slot,
  tutor,
  studentId,
}: PaymentClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmPayment = () => {
    setError(null);
    startTransition(async () => {
      try {
        const response = await createBookingAction({
          slotId: slot.id,
        });

        if (response.success) {
          setIsConfirmed(true);
          toast.success("Booking confirmed successfully!");
          
          // Redirect to home page after 2 seconds
          setTimeout(() => {
            router.push("/?bookingSuccess=true");
          }, 2000);
        } else {
          setError(response.message || "Failed to create booking");
          toast.error(response.message || "Failed to create booking");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    });
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

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="rounded-full bg-green-100 p-6">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-green-600">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your session has been successfully booked
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting to home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Payment Confirmation</h1>
        <p className="text-muted-foreground">
          Review the payment details and confirm your booking
        </p>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b">
            {tutor.profilePicture ? (
              <img
                src={tutor.profilePicture}
                alt={`${tutor.firstName} ${tutor.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {tutor.firstName} {tutor.lastName}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {tutor.experienceYears} years exp
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-500">★</span>
                  <span>{tutor.avgRating || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium">{slotDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="text-sm font-medium">
                  {startTime} - {endTime}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HandCoins className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border dark:text-black">
            <span className="font-semibold">Session Fee</span>
            <span className="text-2xl font-bold">
              ${slot.isFree ? "0.00" : slot.slotPrice.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-amber-900">
                  Payment Collection Method
                </p>
                <p className="text-sm text-amber-800 mt-1">
                  Payment will be collected physically at the time of the
                  session. Please bring the exact amount or arrange payment
                  directly with your tutor.
                </p>
              </div>
            </div>
          </div>

          {slot.isFree && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 font-medium">
                ✓ This is a free session - No payment required
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              <p>
                By confirming, you agree to attend the session at the scheduled
                time
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              <p>
                You will receive a confirmation notification after booking
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              <p>
                Contact the tutor if you need to reschedule or cancel
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Go Back
            </Button>
            <Button
              className="flex-1"
              onClick={handleConfirmPayment}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirming...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
