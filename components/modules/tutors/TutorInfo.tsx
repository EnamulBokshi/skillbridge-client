import { TutorDetailedProfile } from "@/types/tutor.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Star,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";

interface TutorInfoProps {
  tutor: TutorDetailedProfile;
}

export default function TutorInfo({ tutor }: TutorInfoProps) {
  const tutorName = `${tutor.firstName} ${tutor.lastName}`;
  const hasContactInfo = Boolean(tutor.email || tutor.phone || tutor.address);

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="overflow-hidden">
        <CardHeader className="space-y-0 p-0">
          <div className="relative aspect-16/7 min-h-55 w-full overflow-hidden bg-muted md:aspect-16/5">
            {tutor.profilePicture ? (
              <Image
                src={tutor.profilePicture}
                alt={tutorName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-end bg-linear-to-br from-primary/35 via-primary/20 to-background p-6">
                <div className="max-w-xl space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    Tutor profile
                  </p>
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {tutorName}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {tutor.category.name} · {tutor.experienceYears}+ years experience
                  </p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

            <div className="absolute bottom-4 left-4 flex items-end gap-4 md:bottom-6 md:left-6">
              <Avatar className="h-20 w-20 border-4 border-background shadow-lg md:h-24 md:w-24">
                <AvatarImage
                  src={tutor.profilePicture || undefined}
                  alt={tutorName}
                />
                <AvatarFallback className="text-2xl md:text-3xl">
                  {tutor.firstName.charAt(0)}
                  {tutor.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1 text-white drop-shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold md:text-3xl">{tutorName}</h1>
                  {tutor.isFeatured && (
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      <Award className="mr-1 h-3 w-3" />
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-white/80 md:text-base">{tutor.category.name}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-4 md:grid-cols-3 md:p-6">
            <div className="flex items-center gap-2 rounded-2xl border bg-background/70 p-3">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Average Rating</p>
                <p className="font-semibold">
                  {tutor.avgRating.toFixed(1)} ({tutor.totalReviews} reviews)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border bg-background/70 p-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Completed Sessions</p>
                <p className="font-semibold">{tutor.completedSessions}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border bg-background/70 p-3">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="font-semibold">{tutor.experienceYears}+ years</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* About Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>About the tutor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground md:text-base">
              {tutor.bio}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teaching snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl border bg-background/70 px-3 py-2">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">{tutor.category.name}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border bg-background/70 px-3 py-2">
              <span className="text-muted-foreground">Rating</span>
              <span className="font-medium">{tutor.avgRating.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border bg-background/70 px-3 py-2">
              <span className="text-muted-foreground">Reviews</span>
              <span className="font-medium">{tutor.totalReviews}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border bg-background/70 px-3 py-2">
              <span className="text-muted-foreground">Sessions</span>
              <span className="font-medium">{tutor.completedSessions}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expertise Areas */}
      {tutor.expertiseAreas && tutor.expertiseAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Expertise Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tutor.expertiseAreas.map((area, index) => (
                <Badge key={index} variant="secondary" className="rounded-full px-3 py-1">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {hasContactInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Contact details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tutor.email && (
                <div className="rounded-xl border bg-background/70 p-3 text-sm">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p>
                  <p className="mt-1 break-all font-medium">{tutor.email}</p>
                </div>
              )}
              {tutor.phone && (
                <div className="rounded-xl border bg-background/70 p-3 text-sm">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
                  <p className="mt-1 font-medium">{tutor.phone}</p>
                </div>
              )}
              {tutor.address && (
                <div className="rounded-xl border bg-background/70 p-3 text-sm sm:col-span-2 lg:col-span-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Location</p>
                  <p className="mt-1 font-medium">
                    {tutor.address}
                    {tutor.zip && `, ${tutor.zip}`}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
