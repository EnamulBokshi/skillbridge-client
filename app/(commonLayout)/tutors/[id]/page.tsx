import { getTutorByIdAction } from "@/action/tutor.action";
import TutorInfo from "@/components/modules/tutors/TutorInfo";
import TutorReviews from "@/components/modules/tutors/TutorReviews";
import TutorSlots from "@/components/modules/tutors/TutorSlots";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Briefcase,
  CalendarClock,
  Star,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
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
  const tutorId = id?.trim();

  if (!tutorId) {
    notFound();
  }

  const { data: tutor, error } = await getTutorByIdAction(tutorId);


  if (error || !tutor) {
    notFound();
  }

  const now = new Date();
  const availableUpcomingSlots = tutor.slot.filter(
    (slot) => !slot.isBooked && new Date(slot.endTime) > now,
  ).length;

  const tutorName = `${tutor.firstName} ${tutor.lastName}`;

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 py-8 md:py-10">
      <div className="container mx-auto space-y-6 px-4 md:px-6">
        <section className="relative overflow-hidden rounded-3xl border bg-card shadow-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent" />

          <div className="grid min-h-72 lg:grid-cols-[1.45fr_0.9fr]">
            <div className="relative isolate overflow-hidden p-5 sm:p-6 md:p-8 lg:p-10">
              {tutor.profilePicture ? (
                <Image
                  src={tutor.profilePicture}
                  alt={tutorName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="absolute inset-0 -z-10 object-cover"
                />
              ) : (
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/30 via-primary/10 to-background" />
              )}

              <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/75 to-background/10" />

              <div className="flex h-full flex-col justify-between gap-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Link href="/tutors">
                    <Button variant="secondary" className="h-10 rounded-full px-4">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Tutors
                    </Button>
                  </Link>

                  <div className="flex flex-wrap items-center gap-2">
                    <a href="#available-slots">
                      <Button variant="outline" size="sm" className="rounded-full bg-background/80 backdrop-blur">
                        Book a Slot
                      </Button>
                    </a>
                    <a href="#reviews">
                      <Button variant="secondary" size="sm" className="rounded-full">
                        View Reviews
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="max-w-2xl space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{tutor.category.name}</Badge>
                    {tutor.isFeatured && <Badge>Featured Tutor</Badge>}
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
                      {tutorName}
                    </h1>
                    <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                      Learn with a verified mentor and book based on your preferred schedule.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border bg-background/75 p-3 backdrop-blur">
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        {tutor.avgRating.toFixed(1)}
                      </p>
                    </div>
                    <div className="rounded-2xl border bg-background/75 p-3 backdrop-blur">
                      <p className="text-xs text-muted-foreground">Sessions</p>
                      <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        {tutor.completedSessions}
                      </p>
                    </div>
                    <div className="rounded-2xl border bg-background/75 p-3 backdrop-blur">
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        {tutor.experienceYears}+ years
                      </p>
                    </div>
                    <div className="rounded-2xl border bg-background/75 p-3 backdrop-blur">
                      <p className="text-xs text-muted-foreground">Slots</p>
                      <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                        {availableUpcomingSlots}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-4 border-t bg-card/80 p-5 sm:p-6 md:p-8 lg:border-t-0 lg:border-l lg:p-10">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Quick profile</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.email && <Badge variant="outline">Email ready</Badge>}
                  {tutor.phone && <Badge variant="outline">Call support</Badge>}
                  {tutor.address && <Badge variant="outline">Location set</Badge>}
                </div>
              </div>

              <div className="rounded-2xl border bg-background/80 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  About tutor
                </p>
                <p className="mt-2 line-clamp-4 text-sm text-muted-foreground">
                  {tutor.bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section id="profile">
              <TutorInfo tutor={tutor} />
            </section>

            <section id="reviews">
              <TutorReviews reviews={tutor.reviews} />
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4" id="available-slots">
              <TutorSlots slots={tutor.slot} tutorId={tutor.id} />

              <div className="rounded-xl border bg-card p-4">
                <p className="text-sm font-semibold">Need help before booking?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Visit our contact page for support with schedule, payment, or session guidance.
                </p>
                <Link href="/contact" className="mt-3 inline-flex">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
