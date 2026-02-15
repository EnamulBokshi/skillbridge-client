import { TutorProfile } from "@/types/tutor.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Award, GraduationCap } from "lucide-react";
import Link from "next/link";
import { PaginatedResponse } from "@/types";
import { getTutorsAction } from "@/action/tutor.action";

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

  // if (!tutorsData || tutorsData.length === 0) {
  //   return null;
  // }
  // console.log("Featured Tutors Data:", tutorsData);
  const tutorsList: TutorProfile[] = tutorsData.data || [];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="mb-2">
            <Award className="mr-1 h-3 w-3" />
            Featured Experts
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Meet Our Star Experts
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Learn from the best. Our featured tutors are highly-rated
            professionals dedicated to helping you achieve your learning goals.
          </p>
        </div>

        {/* Featured Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorsList.map((tutor: TutorProfile) => (
            <Link key={tutor.id} href={`/tutors/${tutor.id}`}>
              <Card className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:-translate-y-1 h-full dark:bg-background dark:shadow-destructive">
                {/* IMAGE SECTION */}
                <div className="relative w-full h-72 overflow-hidden">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarImage
                      src={tutor.profilePicture || './default-avatar.webp' ||`https://ui-avatars.com/api/?name=${tutor.firstName}+${tutor.lastName}&background=random&size=256`}
                      alt={`${tutor.firstName} ${tutor.lastName}`}
                      className="object-cover object-top to-15% -top-2.5 group-hover:scale-110 transition-transform duration-700"
                    />
                    <AvatarFallback className="text-4xl font-bold bg-muted">
                      {tutor.firstName.charAt(0)}
                      {tutor.lastName.charAt(0)}

                      
                    </AvatarFallback>
                  </Avatar>

                  {/* Rating Overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">
                      {tutor?.avgRating?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <CardContent className="p-6 space-y-4">
                  {/* Name */}
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {tutor.firstName} {tutor.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tutor.experienceYears}+ years of experience
                    </p>
                  </div>

                  {/* Expertise */}
                  {tutor.expertiseAreas?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tutor.expertiseAreas.slice(0, 3).map((area, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Bio */}
                  {tutor.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tutor.bio}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
