"use client";

import { cancelBookingAction, markAsCompletedAction } from "@/action/tutor.action";
import { confirmBookingAction } from "@/action/tutor.action";
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
import { BookingStatus, } from "@/types/student.type";

import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "../common/ConfirmDialog";
import WriteReview from "@/components/review/WriteReview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Bookings } from "@/types/bookings.type";

const ITEMS_PER_PAGE = 10;

export default function BookingTable({
  bookings,
  caption,
  role,
  isBulkData = false,
}: {
  bookings: Bookings[];
  caption?: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  handleApprove?: (bookingId: string) => void;
  isBulkData?: boolean;
}) {


  // console.log("Received bookings in BookingTable:", bookings);
  const { confirm } = useConfirm();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return bookings?.slice(startIndex, endIndex);
  }, [bookings, currentPage]);
  const [reviewData, setReviewData] = useState<{
    tutorId: string;
    studentId: string;
  } | null>(null);
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
    const ok = await confirm({
      title: "Cancel/Reject booking?",
      description:
        "This action cannot be undone. Are you sure you want to proceed?",
      confirmText: "Yes, Cancel it",
      destructive: true,
    });
    if (ok) {
      const loadingToast = toast.loading("Cancelling booking...");
      const { data, error, message } = await cancelBookingAction(bookingId);
      console.log(`Cancel booking with ID: ${bookingId}`);
      if (error) {
        toast.error("Failed to cancel booking. Please try again.", {
          id: loadingToast,
        });
      } else {
        toast.success(message, { id: loadingToast });
      }
      toast.dismiss(loadingToast);
    }
  };
  const handleSessionJoin = async (
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
    const ok = await confirm({
      title: "Join session?",
      description: "You are about to join the session. Do you want to proceed?",
      confirmText: "Yes, Join it",
    });
    if (ok) {
      toast.success("Joining session...", { id: loading });
      toast.info(
        `Session will end at ${endDateObj.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        { id: loading },
      );
      toast.success("Session joined successfully!", { id: loading });
      toast.success("Funny! 😄", { id: loading });
      toast.success("This feature is coming soon!", { id: loading });

      console.log(`Joining session for booking ID: ${bookingId}`);
    }
    loading && toast.dismiss(loading);
  };
  // const handleSessionComplete = async (bookingId: string) => {
  //   const ok = confirm("Mark this session as completed?");
  //   if (ok){
  //     setLoading(true);
  //     const loadingToast = toast.loading("Marking session as completed...");
  //     const {data, error, message} = await cancelBookingAction(bookingId) ;
  //     console.log(`Mark session as completed for booking ID: ${bookingId}`, data, error, message);
  //     if(error){
  //       toast.error(message, {id: loadingToast});
  //     } else {
  //       toast.success(message, {id: loadingToast});
  //     }
  //     setLoading(false);
  //     toast.dismiss(loadingToast);
  //   }
  // };

  const handleApproveBooking = async (bookingId: string) => {
    const ok = await confirm({
      title: "Confirm/Approve booking?",
      description: "Are you sure you want to confirm this booking?",
      confirmText: "Yes, Confirm it",
    });
    if (ok) {
      setLoading(true);
      const loadingToast = toast.loading("Confirming booking...");
      const { data, error, message } = await confirmBookingAction(bookingId);
      console.log(
        `Approve/Confirm booking with ID: ${bookingId}`,
        data,
        error,
        message,
      );
      if (error) {
        toast.error("Failed to approve booking. Please try again.", {
          id: loadingToast,
        });
      } else {
        toast.success("Booking approved successfully!", { id: loadingToast });
      }
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    const ok = await confirm({
      title: "Cancel/Reject booking?",
      description:
        "This action cannot be undone. Are you sure you want to proceed?",
      confirmText: "Yes, Cancel it",
      destructive: true,
    });
    if (ok) {
      setLoading(true);
      const loadingToast = toast.loading("Cancelling booking...");
      const { data, error, message } = await cancelBookingAction(bookingId);
      console.log(
        `Cancel/Reject booking with ID: ${bookingId}`,
        data,
        error,
        message,
      );
      if (error) {
        toast.error("Failed to cancel booking. Please try again.", {
          id: loadingToast,
        });
      } else {
        toast.success("Booking cancelled successfully!", { id: loadingToast });
      }
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const handleWriteReview = (tutorId: string, studentId: string) => {
    setReviewData({ tutorId, studentId });
    setShowReviewForm(true);
  };


    const handleSessionComplete = async (bookingId: string) => {
      
      const ok = confirm({
        title: "Are sure want to mark this session as completed?",
        description: "This action can't be undone",
        destructive: false,
        confirmText: "Yes, mark as completed"
      })
      if(!ok) {
        return null;
      }
      const loadingToast = toast.loading("Marking session as completed...");
      const {data, error, message} = await markAsCompletedAction(bookingId) ;
      console.log(`Mark session as completed for booking ID: ${bookingId}`, data, error, message);
      if(error){
        toast.error(message, {id: loadingToast});
      } else {
        toast.success(message, {id: loadingToast});
      }
      toast.dismiss(loadingToast);
    
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
                {role == "STUDENT"  && booking.status === BookingStatus.PENDING && (
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleSessionCancel(booking.id)}
                  >
                    Cancel
                  </button>
                )}
                { role == "STUDENT"  && booking.status === BookingStatus.CONFIRMED && (
                  <div className="flex  items-center gap-2 justify-end py-1">
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
                          onClick={() =>
                            handleSessionComplete &&
                            handleSessionComplete(booking.id)
                          }
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
                {role == "STUDENT" && booking.status === BookingStatus.COMPLETED && (
                  <Button
                    className="ml-auto"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleWriteReview(
                        booking.slot.tutorProfile.id,
                        booking.studentId,
                      )
                    }
                  >
                    Write a review
                  </Button>
                )}
                {(role === "TUTOR" || role === "ADMIN") && booking.status === BookingStatus.PENDING && (
                  <>
                    <Button
                      className="ml-auto mr-2 bg-cyan-700"
                      size="sm"
                      variant="default"
                      onClick={() => handleApproveBooking(booking.id)}
                    >
                      Confirm/Accept
                    </Button>
                    <Button
                      className="ml-auto"
                      size="sm"
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel/Reject
                    </Button>
                  </>
                )}
                {(role === 'TUTOR' || role === "ADMIN") && booking.status === BookingStatus.CONFIRMED && (
                  <Button
                      className="ml-auto mr-2 bg-cyan-700"
                      size="sm"
                      variant="default"
                      onClick={() => handleSessionComplete(booking.id)}
                    >
                      Mark as completed
                    </Button>
                )
              }
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
      {isBulkData && bookings.length > ITEMS_PER_PAGE && (
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
      {showReviewForm && reviewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Dialog open={showReviewForm} onOpenChange={setShowReviewForm} >
            <DialogContent className="sm:max-w-lg p-4 rounded-md" >
              <DialogHeader>
                <DialogTitle >How was your session?</DialogTitle>
                <DialogDescription>
                  Please provide your feedback for the tutor.
                </DialogDescription>
              </DialogHeader>

              {showReviewForm && (
                <div className="py-2">
                  <WriteReview
                    tutorId={reviewData.tutorId}
                    studentId={reviewData.studentId}
                    onClose={() => setShowReviewForm(false)}
                  />
                </div>
              )}

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
