import { getBookingsAction } from "@/action/admin.action";
import BookingTable from "@/components/modules/booking/BookingTable";
import FilterController from "@/components/ui/filter-controller";
import BookingTableFilterController from "@/components/ui/filter-controller-simple";
import { PaginationController } from "@/components/ui/pagination-controller";
import { BookingSearchParams } from "@/types/bookings.type";

type BookingProps = {
  searchParams: Promise<BookingSearchParams>;
};

export default async function BookingsAdmin({ searchParams }: BookingProps) {
  const params = await searchParams;
  const { data: bookings, error } = await getBookingsAction(params);
  
  const pagination = bookings?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings Management</h1>
      <div>
        {/* <FilterController /> */}
        <BookingTableFilterController />
        {error ? (
          <div className="text-red-500">Error loading bookings: {error}</div>
        ) : (
          <BookingTable bookings={bookings.data.flat() || []} role={"ADMIN"} />
        )}
        <PaginationController pagination={pagination} />
      </div>
    </div>
  );
}
