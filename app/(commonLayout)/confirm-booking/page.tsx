import { redirect } from "next/navigation";
import { getUserSession } from "@/action/user.action";
import { getTutorByIdAction } from "@/action/tutor.action";
import ConfirmBookingClient from "@/components/modules/booking/ConfirmBookingClient";

interface ConfirmBookingPageProps {
  searchParams: Promise<{ slotId?: string; tutorId?: string }>;
}

export default async function ConfirmBookingPage({
  searchParams,
}: ConfirmBookingPageProps) {
  const params = await searchParams;
  const { slotId, tutorId } = params;

  // Check if user is logged in
  const { data: session } = await getUserSession();
  
  if (!session || !session.user) {
    redirect("/login?callbackUrl=/confirm-booking?slotId=" + slotId + "&tutorId=" + tutorId);
  }

  // Check if user is a student
  if (session.user.role !== "STUDENT") {
    redirect("/tutors?error=only-students-can-book");
  }

  // Validate required params
  if (!slotId || !tutorId) {
    redirect("/tutors?error=missing-booking-info");
  }

  // Fetch tutor details
  const tutorResponse = await getTutorByIdAction(tutorId);

  if (!tutorResponse.data || tutorResponse.error) {
    redirect("/tutors?error=tutor-not-found");
  }

  const tutor = tutorResponse.data;
  
  // Find the specific slot
  const slot = tutor.slot.find((s) => s.id === slotId);

  if (!slot) {
    redirect(`/tutors/${tutorId}?error=slot-not-found`);
  }

  // Check if slot is already booked
  if (slot.isBooked) {
    redirect(`/tutors/${tutorId}?error=slot-already-booked`);
  }

  // Check if slot is in the past
  const slotEndTime = new Date(slot.endTime);
  if (slotEndTime < new Date()) {
    redirect(`/tutors/${tutorId}?error=slot-in-past`);
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <ConfirmBookingClient 
        slot={slot} 
        tutor={tutor} 
        studentId={session.user.id}
      />
    </div>
  );
}
