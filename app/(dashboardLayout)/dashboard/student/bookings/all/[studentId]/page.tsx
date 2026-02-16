import { getAllSesssionAction } from "@/action/student.action";
import BookingTable from "@/components/modules/booking/BookingTable";
import BookingTableFilterController from "@/components/ui/filter-controller-simple";
import { PaginationController } from "@/components/ui/pagination-controller";
import { BookingStatus } from "@/types/student.type";

interface StudentBookingProps {
  params: Promise<{
    studentId: string;
  }>;
  searchParams: Promise<{
    status?: BookingStatus;
    page?: number;
    limit?: number;
  }>;
}

export default async function StudentAllBookings({
  params,
  searchParams,
}: StudentBookingProps) {
  const { studentId } = await params;
  const { status, page, limit } = await searchParams;
  console.log(
    "Fetching bookings for student ID:",
    studentId,
    "with status:",
    status,
  );
  const { data: bookings, error } = await getAllSesssionAction(studentId, {
    status,
    page,
    limit,
  });
  const data = (bookings?.data || []);
  const pagination = bookings?.pagination || {};
//   console.log("Bookings data:", data);
//   console.log("Pagination info:", pagination);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      <div>
        <BookingTableFilterController />
        <BookingTable
          bookings={data}
          caption="All bookings you have engaged so far!"
          role="STUDENT"
        />
        <PaginationController pagination={pagination} />
      </div>
    </div>
  );
}
