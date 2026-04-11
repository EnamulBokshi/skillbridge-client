"use client";

import { TutorProfile } from "@/types/tutor.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  tutors: TutorProfile[];
};

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

export default function FeaturedTutorCardRail({ tutors }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const checkScrollState = () => {
      const maxLeft = rail.scrollWidth - rail.clientWidth;
      setCanScrollLeft(rail.scrollLeft > 4);
      setCanScrollRight(rail.scrollLeft < maxLeft - 4);
    };

    checkScrollState();
    rail.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);

    return () => {
      rail.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;

    const cardWidth = 320;
    const gap = 20;
    const offset = cardWidth + gap;

    rail.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative p-2 rounded">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden rounded-r  w-16 bg-linear-to-r from-background/85 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden rounded-l w-16 bg-linear-to-l from-background/85 to-transparent lg:block" />

      <div className="mb-4 hidden items-center justify-end gap-2 lg:flex">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => scrollByAmount("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll tutors left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => scrollByAmount("right")}
          disabled={!canScrollRight}
          aria-label="Scroll tutors right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {tutors.map((tutor) => (
          <Link key={tutor.id} href={`/tutors/${tutor.id}`} className="shrink-0 snap-start">
            <Card className="group w-72.5 overflow-hidden rounded-3xl border border-border/70 bg-card/85 p-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-80">
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
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
