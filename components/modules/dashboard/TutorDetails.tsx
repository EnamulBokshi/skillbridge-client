import { TutorDetailedProfile } from "@/types/tutor.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";
import { getTutorByIdAction } from "@/action/tutor.action";
import Link from "next/link";

interface TutorInfoProps {
  tutor: TutorDetailedProfile;
}

export default  async function TutorDetails({ tutorId, isAdmin }: { tutorId: string, isAdmin: boolean }) {
  console.log("Fetching details for tutor ID: ", tutorId);
    const {data: tutor, error, message} = await getTutorByIdAction(tutorId);
console.log("Tutor details fetched: ", tutor, error, message);

    if(error || !tutor) {
      console.error("Error fetching tutor details: ", message);
        return <div className="text-center text-gray-500">Failed to load tutor details.</div>
    }
    // console.log("Tutor details: ", tutor);
  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Tutor Details</h2>
        <Link href={`${isAdmin ? `/dashboard/admin/users/${tutor.user.id}/tutor/${tutor.id}` : `/dashboard/tutor/profile?edit=true&tutorId=${tutor.id}`}`} className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Edit Profile
        </Link>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <Avatar size="lg" className="h-32 w-32">
              <AvatarImage
                src={tutor.profilePicture || undefined}
                alt={`${tutor.firstName} ${tutor.lastName}`}
              />
              <AvatarFallback className="text-3xl p-2">
                {tutor.firstName.charAt(0)}
                {tutor.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Basic Info */}
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">
                    {tutor.firstName} {tutor.lastName}
                  </h1>
                  {tutor.isFeatured ?  (
                    <Badge variant="secondary">
                      <Award className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  ):(
                    <Badge variant="outline">
                      <Award className="h-3 w-3 mr-1" />
                      Regular
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{tutor.category.name}</p>
              </div>

              {/* Rating & Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">
                    {tutor.avgRating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">
                    ({tutor.totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">{tutor.completedSessions}</span>
                  <span className="text-muted-foreground">sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">{tutor.experienceYears}+</span>
                  <span className="text-muted-foreground">years</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                {tutor.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{tutor.email}</span>
                  </div>
                )}
                {tutor.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{tutor.phone}</span>
                  </div>
                )}
                {tutor.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {tutor.address}
                      {tutor.zip && `, ${tutor.zip}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-line">{tutor.bio}</p>
        </CardContent>
      </Card>

      {/* Expertise Areas */}
      {tutor.expertiseAreas && tutor.expertiseAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Expertise Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tutor.expertiseAreas.map((area, index) => (
                <Badge key={index} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}


    </div>
  );
}
