import { TutorProfile } from "@/types/tutor.type";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Sparkles, Star } from "lucide-react";
import { getTutorsAction } from "@/action/tutor.action";
import FeaturedTutorCardRail from "./FeaturedTutorCardRail";

// interface FeaturedTutorsHeroProps {
//   tutors: PaginatedResponse<TutorProfile>;
// }

export default async function FeaturedTutorsHero() {
  // Handle different data structures

  const { data: tutorsData } = await getTutorsAction({
    isFeatured: true,
    page: 1,
    limit: 6,
    sortBy: "avgRating",
    orderBy: "desc",
  });

  const tutorsList: TutorProfile[] = tutorsData?.data || [];

  console.log("Fetched featured tutors:", tutorsList);
  if (tutorsList.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-4xl border border-border/70 bg-linear-to-br from-primary/8 via-background to-secondary/10 p-6 shadow-xl sm:p-8 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(79,70,229,0.16),transparent_32%),radial-gradient(circle_at_84%_90%,rgba(6,182,212,0.2),transparent_30%)]" />

          <div className="relative mb-8 space-y-4 md:mb-10">
            <Badge variant="secondary" className="gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
              <Award className="h-3.5 w-3.5" />
              Campaign Spotlight
            </Badge>

            <h2 className="max-w-4xl text-balance text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">
              Learn Faster With Elite Tutors Who Turn Goals Into Results
            </h2>

            <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
              Every featured mentor here is handpicked for teaching quality, outcomes, and consistency.
              Start your momentum with focused sessions, personalized support, and proven expertise.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 py-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                Weekly Featured Picks
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 py-1.5">
                <Star className="h-4 w-4 fill-accent text-accent" />
                Top Rated Mentors
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 py-1.5">
                <ArrowRight className="h-4 w-4 text-primary" />
                One Click To Start
              </span>
            </div>
          </div>

          {/* Hero Footer: Single-line card rail */}
          <FeaturedTutorCardRail tutors={tutorsList} />
        </div>
      </div>
    </section>
  );
}
