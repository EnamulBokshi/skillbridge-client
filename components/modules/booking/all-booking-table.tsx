import { TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Table } from 'lucide-react';
import React from 'react'

export default function BookingTable() {
  
    return (
    <div className="space-y-3">
      <Table>
        <TableCaption>{caption}</TableCaption>

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
                  <button className="text-red-500 hover:underline" onClick={()=> handleSessionCancel(booking.id)}>
                    Cancel
                  </button>
                )}
                {
                  booking.status === BookingStatus.CONFIRMED && (
                    <div className="flex flex-col items-center gap-2 justify-end py-1">
                      <button className="text-yellow-600 hover:underline" onClick={()=> handleSessionJoin(booking.id, booking.slot.startTime)}>
                      Join Session
                    </button>
                    <Button size="sm" variant="outline" onClick={()=> handleSessionCancel(booking.id)}>
                      Cancel Session
                    </Button>
                    </div>
                  )
                }
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

     
    </div>
  );
}

