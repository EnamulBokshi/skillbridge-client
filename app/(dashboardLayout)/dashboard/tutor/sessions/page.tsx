import { cancelBookingAction, getSessionsAction, markAsCompletedAction } from "@/action/tutor.action";
import { getUserSession } from "@/action/user.action"
import BookingTable from "@/components/modules/booking/BookingTable";
import BookingTableFilterController from "@/components/ui/filter-controller-simple";
import { PaginationController } from "@/components/ui/pagination-controller";
import { authClient } from "@/lib/auth-client";
import { userServices } from "@/services/user.service";
import { BookingStatus } from "@/types/tutor.type";
import Link from "next/dist/client/link";


export default async function SessionPage() {
  // const {data: userSession} = await getUserSession()
  // const user = userSession?.user;
  const session = await authClient.getSession();
  const user = session.data?.user;
  const error = session.error;
  console.log("User in SessionPage:", user);
  if(error || !user){
    return (
      <div className="flex justify-center items-center h-60 text-muted-foreground">
        Please login to view your sessions.
      </div>
    );
  }

  const userId = user.id;
  console.log("User ID:", userId);
  if(!userId){
    return (
      <div className="flex justify-center items-center h-60 text-muted-foreground">
        Please login to view your sessions.
      </div>
    );
  }
  const {data: userProfile} = await userServices.getUser(userId);
console.log("User Profile:", userProfile);
  const tutorId = userProfile?.tutorProfile?.id;
  console.log("Tutor ID:", tutorId);
  if(!tutorId){
    return (
      <div className="flex justify-center items-center h-60 text-muted-foreground">
        You do not have a tutor profile. Please create one to view your sessions.
      </div>
    );
  }
  const {data: sessionsData, message} = await getSessionsAction(tutorId);
  const allSessions =  ( sessionsData?.data || []) || []; 
  const allSessionPagination = sessionsData?.pagination || null;
  console.log("Sessions data:", sessionsData, message);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Sessions</h1>
      {/* <div>
              <BookingTableFilterController />
              <BookingTable
                bookings={allSessions}
                caption="All bookings you have engaged so far!"
                role="TUTOR"
              />
              <PaginationController pagination={allSessionPagination} />
            </div> */}
      <section className="rounded-lg border bg-background shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            All Sessions
          </h2>
          <p className="text-sm text-muted-foreground">
            All sessions that booked by students
          </p>
        </div>

        <div className="p-4">
          <BookingTableFilterController />
          {!allSessions || allSessions.length === 0 ? (
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
              bookings={allSessions}
              caption="All bookings you were engaged so far!"
              role="TUTOR"
            />
            <div className="mt-4">
              <PaginationController pagination={allSessionPagination} />
            </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
