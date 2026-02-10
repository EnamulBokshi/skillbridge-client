import { Card } from "@/components/ui/card";
import { getStudentStats } from "@/services/student.service";
import { UserProfileType } from "@/types";
import { SlotCard } from "../slot";
import { dateFormatter, calculateDuration } from "@/helper/dateFormatter";
import { Badge } from "@/components/ui/badge";
import { currencyFormatter } from "@/helper/currencyFormatter";

export default async function StudentDashboard({
  profile,
}: {
  profile: UserProfileType;
}) {
  const { data: stats, error } = await getStudentStats(
    profile.student?.id as string,
  );
  // const slot = stats?.latestBooking?.slot;

  console.log({ stats, error });
  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold">
        Welcome to Student Dashboard, {profile.name}!
      </h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Your Stats:</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-medium">Total sessions:</h3>
            <p className="text-2xl font-bold">{stats?.totalBookings || 0}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-medium">Upcoming Sessions:</h3>
            <p className="text-2xl font-bold">
              {stats?.totalUpcomingBookings || 0}
            </p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-medium">Completed Sessions:</h3>
            <p className="text-2xl font-bold">
              {stats?.totalCompletedBookings || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Latest bookings:</h2>
        {!stats?.latestBooking && (
          <p className="text-muted-foreground">No bookings yet.</p>
        )}
        {stats?.latestBooking &&
          // <SlotCard slot={stats?.latestBooking} editable={false} />
          stats.latestBooking.map((bookings) => (
            <Card className="mt-4" key={bookings.id}>
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      Session with{" "}
                      <span className="text-primary">
                        {bookings.slot.tutorProfile.firstName}{" "}
                        {bookings.slot.tutorProfile.lastName}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Upcoming tutoring session
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className="capitalize whitespace-nowrap"
                  >
                    {bookings.status}
                  </Badge>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {dateFormatter(bookings.slot.date)}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="font-medium">
                      {new Date(bookings.slot.startTime).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}{" "}
                      –{" "}
                      {new Date(bookings.slot.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {calculateDuration(
                        bookings.slot.startTime,
                        bookings.slot.endTime,
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-semibold text-primary">
                      {currencyFormatter(bookings.slot.slotPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
