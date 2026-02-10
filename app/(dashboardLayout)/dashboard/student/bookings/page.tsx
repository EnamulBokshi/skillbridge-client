import { getCompletedSessionsAction } from "@/action/student.action";
import { getStudentUpcomingsAction } from "@/action/student.action copy";
import { getUserSession } from "@/action/user.action";
import BookingTable from "@/components/modules/booking/BookingTable";
import { Button } from "@/components/ui/button";
import { userServices } from "@/services/user.service";
import Link from "next/link";

export default async function BookingsStudent() {
  const { data: userSession, error: userSessionError } =
    await getUserSession();

  const user = userSession?.user;

  if (userSessionError || !user) {
    return (
      <div className="flex justify-center items-center h-60 text-muted-foreground">
        Please login to view your bookings.
      </div>
    );
  }

  const { data: userProfile, error: userProfileError } =
    await userServices.getUser(user.id);

  if (userProfileError || !userProfile) {
    return (
      <div className="flex justify-center items-center h-60 text-muted-foreground">
        Unable to fetch user profile.
      </div>
    );
  }

  const { data: upcomingsSessions } =
    await getStudentUpcomingsAction(userProfile.student?.id);

    console.log("Upcoming sessions data:", upcomingsSessions);
  const { data: completedSessions } =
    await getCompletedSessionsAction(user.id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your tutoring sessions
        </p>
      </div>

      {/* Upcoming Sessions */}
      <section className="rounded-lg border bg-background shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            Upcoming Sessions
          </h2>
          <p className="text-sm text-muted-foreground">
            Sessions you have booked and are yet to attend
          </p>
        </div>

        <div className="p-4">
          {!upcomingsSessions || upcomingsSessions.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-muted-foreground">
                You have no upcoming sessions.
              </p>
              <Link
                href="/slots"
                className="inline-block text-primary underline underline-offset-4"
              >
                Explore available sessions
              </Link>
            </div>
          ) : (
            <BookingTable
              bookings={upcomingsSessions}
              caption="Your upcoming sessions"
            />
          )}
        </div>
      </section>

      {/* Completed Sessions */}
      <section className="rounded-lg border bg-background shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            Completed Sessions
          </h2>
          <p className="text-sm text-muted-foreground">
            Sessions you have already completed
          </p>
        </div>

        {/* <div className="p-4">
          {!completedSessions || completedSessions.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-muted-foreground">
                No completed sessions yet.
              </p>
              <Link
                href="/slots"
                className="inline-block text-primary underline underline-offset-4"
              >
                Book your first session
              </Link>
            </div>
          ) : (
            <BookingTable
              bookings={completedSessions}
              caption="Your completed sessions"
            />
          )}
        </div> */}
      </section>

      {/* all sessions */}
      {/* <section className="rounded-lg border bg-background shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            All Sessions
          </h2>
          <p className="text-sm text-muted-foreground">
            View all your sessions in one place
          </p>
        </div>

        <div className="p-4">

          </div>


      </section> */}
      
      {/* Quick access */}
      <div className="flex gap-3 justify-baseline">
        <Button variant={"outline"} asChild>
          <Link href={`/dashboard/student/bookings/all/${userProfile.student?.id}`} >
          View All Sessions
          </Link>
        </Button>
      </div>
    </div>
  );
}
