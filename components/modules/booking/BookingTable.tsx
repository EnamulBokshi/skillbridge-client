"use client";

import { cancelBookingAction } from "@/action/student.action";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormatter } from "@/helper/dateFormatter";
import { BookingStatus, StudentBooking } from "@/types/student.type";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export default function BookingTable({
  bookings,
  caption,
}: {
  bookings: StudentBooking[];
  caption?: string;
}) {
  console.log("Received bookings in BookingTable:", bookings);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return bookings?.slice(startIndex, endIndex);
  }, [bookings, currentPage]);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const goToPrevious = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  const handleSessionCancel = async (bookingId: string) => {
    const { data, error } = await cancelBookingAction(bookingId);
    console.log(`Cancel booking with ID: ${bookingId}`);
  };
  const handleSessionJoin = (
    bookingId: string,
    startDate: string,
    endDate: string,
  ) => {
    const loading = toast.loading("Checking session time...");
    const now = new Date();
    const slotDate = new Date(startDate);
    const endDateObj = new Date(endDate);
    const timeDiff = slotDate.getTime() - now.getTime();
    const duration = endDateObj.getTime() - slotDate.getTime();

    if (now > endDateObj) {
      toast.error("This session has already ended.", { id: loading });
      return;
    }
    if (timeDiff > 15 * 60 * 1000) {
      toast.error(
        "You can only join the session within 15 minutes of the start time.",
        { id: loading },
      );
      return;
    }
    const ok = confirm(
      "You are about to join the session. Make sure to be on time. Proceed?",
    );
    if (ok) {
      console.log(`Joining session for booking ID: ${bookingId}`);
    }
    loading && toast.dismiss(loading);
  };
  const handleSessionComplete = (bookingId: string) => {
    const ok = confirm("Mark this session as completed?");
    if (ok)
      console.log(`Mark session as completed for booking ID: ${bookingId}`);
  };
  return (
    <div className="space-y-3">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Tutor Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableHead>{booking.id}</TableHead>
              <TableHead>
                {booking.slot.tutorProfile.firstName}{" "}
                {booking.slot.tutorProfile.lastName}
              </TableHead>
              <TableHead>{dateFormatter(booking.slot.date)}</TableHead>
              <TableHead>{formatTime(booking.slot.startTime)}</TableHead>
              <TableHead>{formatTime(booking.slot.endTime)}</TableHead>
              <TableHead className="capitalize">
                {booking.status.toLowerCase()}
              </TableHead>
              <TableHead className="text-right">
                {booking.status === "PENDING" && (
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleSessionCancel(booking.id)}
                  >
                    Cancel
                  </button>
                )}
                {booking.status === BookingStatus.CONFIRMED && (
                  <div className="flex flex-col items-center gap-2 justify-end py-1">
                    <button
                      className="text-yellow-600 hover:underline"
                      onClick={() =>
                        handleSessionJoin(
                          booking.id,
                          booking.slot.startTime,
                          booking.slot.endTime,
                        )
                      }
                    >
                      Join Session
                    </button>
                    {
                      // For demonstration, we show the "Mark as Completed" button for confirmed sessions. In a real app, this would likely be triggered by the tutor or automatically when the session time has passed.

                      new Date() > new Date(booking.slot.endTime) ? (
                        <button
                          className="text-green-600 hover:underline"
                          onClick={() => handleSessionComplete(booking.id)}
                        >
                          Mark as Completed
                        </button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSessionCancel(booking.id)}
                        >
                          Cancel Session
                        </Button>
                      )
                    }
                  </div>
                )}
                {booking.status === "COMPLETED" && (
                  <Button className="ml-auto" size="sm" variant="outline">
                    Write a review
                  </Button>
                )}
              </TableHead>
            </TableRow>
          ))}

          {paginatedBookings.length === 0 && (
            <TableRow>
              <TableHead colSpan={7} className="text-center py-6">
                No bookings found
              </TableHead>
            </TableRow>
          )}
        </TableBody>

        <TableFooter />
      </Table>

      {/* Pagination */}
      {bookings.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
