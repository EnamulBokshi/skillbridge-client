import { getTutorByIdAction } from "@/action/tutor.action";
import TutorInfo from "@/components/modules/tutors/TutorInfo";
import TutorReviews from "@/components/modules/tutors/TutorReviews";
import TutorSlots from "@/components/modules/tutors/TutorSlots";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TutorDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TutorDetailsPage({
  params,
}: TutorDetailsPageProps) {
  const { id } = await params;
  
  console.log("Tutor ID:", id);
  
  if (!id) {
    notFound();
  }
  
  const { data: tutor, error } = await getTutorByIdAction(id);


  if (error || !tutor) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Link href="/tutors">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tutors
          </Button>
        </Link>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tutor Info */}
          <div className="lg:col-span-2 space-y-8">
            <TutorInfo tutor={tutor} />
            <TutorReviews reviews={tutor.reviews} />
          </div>

          {/* Right Column - Available Slots */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <TutorSlots slots={tutor.slot} tutorId={tutor.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
