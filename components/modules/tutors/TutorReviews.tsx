import { TutorDetailedProfile } from "@/types/tutor.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface TutorReviewsProps {
  reviews: TutorDetailedProfile["reviews"];
}

export default function TutorReviews({ reviews }: TutorReviewsProps) {
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (!reviews || reviews.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-dashed bg-muted/30 px-4 py-10 text-center">
            <p className="text-sm font-medium">No reviews yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Be the first student to share feedback after your session.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Reviews ({reviews.length})</CardTitle>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {averageRating.toFixed(1)} average
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border bg-background/70 p-4 shadow-sm transition-colors hover:bg-background">
              <div className="flex gap-4">
                {/* Student Avatar */}
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback>
                    {review.student.firstName?.charAt(0) || "U"}
                    {review.student.lastName?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>

                {/* Review Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {review.student.firstName} {review.student.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {review.comment || "No written comment was provided for this review."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
