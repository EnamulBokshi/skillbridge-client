import { redirect } from "next/navigation";
import { getUserSession } from "@/action/user.action";
import { getTutorByIdAction } from "@/action/tutor.action";
import PaymentClient from "@/components/modules/booking/PaymentClient";

interface PaymentPageProps {
  searchParams: Promise<{ slotId?: string; tutorId?: string; studentId?: string }>;
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;
  const { slotId, tutorId, studentId } = params;

  // Check if user is logged in
  const { data: session } = await getUserSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  // Check if user is a student
  if (session.user.role !== "STUDENT") {
    redirect("/tutors?error=only-students-can-book");
  }

  // Validate required params
  if (!slotId || !tutorId || !studentId) {
    redirect("/tutors?error=missing-booking-info");
  }

  // Verify studentId matches session
  if (session.user.id !== studentId) {
    redirect("/tutors?error=unauthorized");
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

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <PaymentClient slot={slot} tutor={tutor} studentId={studentId} />
    </div>
  );
}
