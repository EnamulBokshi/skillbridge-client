"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function BookingSuccessToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const bookingSuccess = searchParams.get("bookingSuccess");
    
    if (bookingSuccess === "true") {
      toast.success("Payment Successful!", {
        description: "Your booking has been confirmed. Check your sessions for details.",
        duration: 5000,
      });

      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete("bookingSuccess");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  return null;
}
