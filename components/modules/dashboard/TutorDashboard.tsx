import { confirmBookingAction, getSessionsAction, getTutorDashboardStatsAction } from "@/action/tutor.action";
import { UserProfileType } from "@/types";
import DashboardCard from "./DashboardCard";
import Link from "next/link";
import BookingTable from "../booking/BookingTable";
import { PaginationController } from "@/components/ui/pagination-controller";
import { BookingStatus } from "@/types/student.type";
import BookingTableFilterController from "@/components/ui/filter-controller-simple";
import { Loading } from "@/components/common/Loading";
import { toast } from "sonner";

export default async function TutorDashboard({
  profile,
}: {
  profile: UserProfileType;
}) {
  if (!profile.tutorProfile) {
    return (
      <div className="flex justify-center items-center h-60 text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  const { data: dashboard } = await getTutorDashboardStatsAction(
    profile.tutorProfile.id,
  );
  const{data: pendingBooking, error:pendingBookingError, message: pendingBookingMessage} = await getSessionsAction(profile.tutorProfile.id,{status: BookingStatus.PENDING})
  
  const pendingBookingData = (pendingBooking.data).flat() || [];
  const pendingPagination = pendingBooking.pagination;
  const hasPendingBookings = pendingBookingData.length > 0;
if(!dashboard){
  return <  Loading title="Loading dashboard..." />
}
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {profile.name} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here’s a quick overview of your tutoring activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Sessions Booked 📚"
          value={dashboard?.totalBookings ?? 0}
        />

        {/* <DashboardCard
          title="Upcoming Sessions"
          value={dashboard?.upcomingSessions ?? 0}
        /> */}

        <DashboardCard
          title="Completed Sessions"
          value={dashboard?.completedBookings ?? 0}
        />
        <DashboardCard
          title="Average Rating ⭐"
          value={dashboard?.averageRating ?? 0}
        />
        <DashboardCard
          title="Total Reviews 📝"
          value={dashboard?.totalReviews ?? 0}
        />
        <DashboardCard
          title="Total Earnings 💰"
          value={`$${dashboard?.totalEarnings ?? 0}`}
          highlight
        />
      </div>
      <section className="rounded-lg border bg-background shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            Pending Sessions
          </h2>
          <p className="text-sm text-muted-foreground">
            All sessions that are pending your approval
          </p>
        </div>

        <div className="p-4">
          {/* <BookingTableFilterController /> */}
          {!hasPendingBookings ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-muted-foreground">
                No sessions yet.
              </p>
              <Link
                href="/slots"
                className="inline-block text-primary underline underline-offset-4"
              >
                Browse available slots
              </Link>
            </div>
          ) : (
            <>
            <BookingTable
              bookings={pendingBookingData}
              caption="All bookings you were engaged so far!"
              role="TUTOR"
            />
            <div className="mt-4">
              <PaginationController pagination={pendingPagination} />
            </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}


// const handleApprove = async(bookingId: string)=>{
//   const loadingToast = toast.loading("Approving session...");
//   const {data, error, message} = await confirmBookingAction(bookingId);
//   if(error){
//     toast.error(message, {id: loadingToast});
//   } else {
//     toast.success(message, {id: loadingToast});
//   }
//   toast.dismiss(loadingToast);
// }