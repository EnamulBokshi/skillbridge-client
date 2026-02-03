import { TutorProfile } from "@/types/tutor.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Award, GraduationCap } from "lucide-react";
import Link from "next/link";

interface FeaturedTutorsHeroProps {
  tutors: TutorProfile[] | any;
}

export default function FeaturedTutorsHero({ tutors }: FeaturedTutorsHeroProps) {
  // Handle different data structures
  const tutorsList = Array.isArray(tutors) ? tutors : tutors?.tutors || [];
  
  if (!tutorsList || tutorsList.length === 0) {
    return null;
  }

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
            Learn from the best. Our featured tutors are highly-rated professionals
            dedicated to helping you achieve your learning goals.
          </p>
        </div>

        {/* Featured Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorsList.map((tutor:TutorProfile) => (
            <Link key={tutor.id} href={`/tutors/${tutor.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Avatar size="lg" className="h-16 w-16">
                    <AvatarImage 
                      src={tutor.profilePicture || undefined} 
                      alt={`${tutor.firstName} ${tutor.lastName}`} 
                    />
                    <AvatarFallback className="text-lg">
                      {tutor.firstName.charAt(0)}
                      {tutor.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl mb-1">
                      {tutor.firstName} {tutor.lastName}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{tutor.avgRating.toFixed(1)}</span>
                      <span className="text-muted-foreground">Rating</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Expertise */}
                {tutor.expertise && (
                  <div>
                    <p className="text-sm font-medium mb-1 flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      Expertise
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tutor.expertise}
                    </p>
                  </div>
                )}

                {/* Bio */}
                {tutor.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {tutor.bio}
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {tutor.experience !== null && (
                    <Badge variant="outline" className="gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {tutor.experience}+ years
                    </Badge>
                  )}
                  {tutor.hourlyRate !== null && (
                    <Badge variant="outline">
                      ${tutor.hourlyRate}/hr
                    </Badge>
                  )}
                  {tutor.languages && tutor.languages.length > 0 && (
                    <Badge variant="secondary">
                      {tutor.languages[0]}
                      {tutor.languages.length > 1 && ` +${tutor.languages.length - 1}`}
                    </Badge>
                  )}
                </div>

                {/* Certifications */}
                {tutor.certifications && tutor.certifications.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-1">
                      {tutor.certifications.length} Certification{tutor.certifications.length !== 1 ? 's' : ''}
                    </p>
                  </div>
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
