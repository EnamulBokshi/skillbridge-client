import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudentStats } from "@/services/student.service";
import { IUser } from "@/types/user.type";
import { dateFormatter, calculateDuration } from "@/helper/dateFormatter";
import { Badge } from "@/components/ui/badge";
import { currencyFormatter } from "@/helper/currencyFormatter";

export default async function StudentDashboard({
  profile,
}: {
  profile: IUser | null;
}) {
  if (!profile) {
    return <div>Loading...</div>;
  }

  const { data: stats } = await getStudentStats(
    profile?.student?.id as string
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {profile.name} 👋
        </h1>
        <p className="text-muted-foreground">
          Here’s a quick overview of your tutoring activity
        </p>
      </div>

      {/* Stats */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Stats</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="transition hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {stats?.totalBookings || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="transition hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {stats?.totalUpcomingBookings || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="transition hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {stats?.totalCompletedBookings || 0}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Latest Bookings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Latest Bookings</h2>

        {!stats?.latestBooking?.length && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No bookings yet.
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {stats?.latestBooking?.map((booking) => (
            <Card
              key={booking.id}
              className="transition hover:shadow-md border"
            >
              <CardContent className="p-6 space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Session with{" "}
                      <span className="text-primary">
                        {booking.slot.tutorProfile.firstName}{" "}
                        {booking.slot.tutorProfile.lastName}
                      </span>
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Tutoring Session
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className="capitalize"
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div className="border-t" />

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {dateFormatter(booking.slot.date)}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="font-medium">
                      {new Date(
                        booking.slot.startTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" – "}
                      {new Date(
                        booking.slot.endTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {calculateDuration(
                        booking.slot.startTime,
                        booking.slot.endTime
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-semibold text-primary">
                      {currencyFormatter(
                        booking.slot.slotPrice
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}