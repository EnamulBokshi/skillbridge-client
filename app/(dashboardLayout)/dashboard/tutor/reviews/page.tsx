import ReviewList from "@/components/review/ReviewList";
import { USER_ROLES } from "@/constants";
import { userServices } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Star } from "lucide-react";

export default async function ReviewPage() {
  const { data: session } = await userServices.getSession();

  // Not logged in
  if (!session) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-10 text-center space-y-3">
            <AlertTriangle className="mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              Access Denied
            </h2>
            <p className="text-muted-foreground">
              You must be logged in as a tutor to view this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userId = session.user.id;

  const {
    data: userProfile,
    error: userProfileError,
  } = await userServices.getUser(userId);

  // Profile error
  if (userProfileError || !userProfile) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-10 text-center space-y-3">
            <AlertTriangle className="mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              Error Loading Profile
            </h2>
            <p className="text-muted-foreground">
              Failed to load user profile. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not tutor
  if (userProfile.role !== USER_ROLES.TUTOR) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-10 text-center space-y-3">
            <AlertTriangle className="mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              Tutor Access Only
            </h2>
            <p className="text-muted-foreground">
              Only tutors can view reviews.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tutorId = userProfile.tutorProfile?.id;

  // No tutor profile
  if (!tutorId) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-10 text-center space-y-3">
            <AlertTriangle className="mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              No Tutor Profile
            </h2>
            <p className="text-muted-foreground">
              You need a tutor profile to view reviews.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <Star className="text-primary" />
        <div>
          <h1 className="text-3xl font-bold">
            Tutor Reviews
          </h1>
          <p className="text-muted-foreground">
            See what your students are saying about you
          </p>
        </div>
      </div>

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>
            Student Feedback
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ReviewList tutorId={tutorId} />
        </CardContent>
      </Card>

    </div>
  );
}