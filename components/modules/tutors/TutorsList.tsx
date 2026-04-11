"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import {
  Star,
  Bookmark,
  Loader2,
} from "lucide-react";
import { TutorProfile } from "@/types/tutor.type";

interface TutorsListProps {
  initialTutors: any;
}

export default function TutorsList({ initialTutors }: TutorsListProps) {
  const tutors: TutorProfile[] = initialTutors?.data || [];

  const getTutorImage = (tutor: TutorProfile) => {
    if (tutor.profilePicture) return tutor.profilePicture;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      `${tutor.firstName} ${tutor.lastName}`,
    )}&background=EEF2FF&color=1E1B4B&size=256`;
  };

  const getTutorCardTitle = (tutor: TutorProfile) => {
    const primaryExpertise = tutor.expertiseAreas?.[0]?.trim();
    if (primaryExpertise) return `${primaryExpertise} Intensive`;
    return `${tutor.firstName} ${tutor.lastName}`;
  };

  const getTutorTag = (tutor: TutorProfile) => {
    const primaryExpertise = tutor.expertiseAreas?.[0]?.trim();
    if (primaryExpertise) return primaryExpertise;
    return "Top Tutor";
  };

  return (
    <section className="w-full py-6">
      {initialTutors === undefined ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : tutors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tutors.map((tutor: TutorProfile) => (
            <Link key={tutor.id} href={`/tutors/${tutor.id}`}>
              <Card className="group h-full overflow-hidden rounded-3xl border border-border/70 bg-card/90 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative h-85 overflow-hidden">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarImage
                      src={getTutorImage(tutor)}
                      alt={`${tutor.firstName} ${tutor.lastName}`}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <AvatarFallback className="text-4xl font-bold bg-muted">
                      {tutor.firstName.charAt(0)}
                      {tutor.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/15 to-transparent" />

                  <div className="absolute left-4 top-4">
                    <Badge className="rounded-xl border-0 bg-black/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {getTutorTag(tutor)}
                    </Badge>
                  </div>

                  <button
                    type="button"
                    aria-label="Save tutor"
                    className="absolute right-4 top-4 rounded-full border border-white/40 bg-white/25 p-2 text-white backdrop-blur-sm"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>

                  <CardContent className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="mb-2 text-4xl font-semibold leading-tight tracking-tight">
                      {getTutorCardTitle(tutor)}
                    </h3>

                    <p className="mb-2 text-lg font-medium text-white/90">
                      {tutor.experienceYears}+ years
                      <span className="mx-2 text-white/50">•</span>
                      Rated {tutor?.avgRating?.toFixed(1) || "0.0"}
                    </p>

                    <div className="flex items-center gap-2 text-lg text-white/92">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={getTutorImage(tutor)} alt={tutor.firstName} />
                        <AvatarFallback className="text-[10px]">
                          {tutor.firstName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        Coach {tutor.firstName} {tutor.lastName}
                      </span>
                      <Star className="ml-auto h-4 w-4 fill-amber-300 text-amber-300" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/70 bg-card/50 py-14 text-center">
          <p className="text-lg text-muted-foreground">No tutors found.</p>
        </div>
      )}
    </section>
  );
}
