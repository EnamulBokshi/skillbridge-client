import { getTutorReviewsAction } from "@/action/tutor.action";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loading } from "../common/Loading";
import { Star } from "lucide-react";

export default async function ReviewList({ tutorId }: { tutorId: string }) {
  const {
    data: reviews,
    error,
    message,
  } = await getTutorReviewsAction(tutorId);

  if (!reviews) {
    return <Loading />;
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          No reviews yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const name = `${review.student.firstName} ${review.student.lastName}`;
        const initials =
          review?.student?.firstName?.[0]! || 'U' +
          review?.student?.lastName?.[0]! || 'M';

        return (
          <Card
            key={review.id}
            className="transition hover:shadow-md"
          >
            <CardContent className="p-5 space-y-4">
              {/* Header */}
              <div className="flex items-start gap-4">
                <Avatar className="w-11 h-11">
                  <AvatarImage
                    src={
                      review.student.profilePicture ||
                      "/default-avatar.png"
                    }
                    alt={name}
                  />
                  <AvatarFallback>
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {name}
                    </h3>

                    <span className="text-sm text-muted-foreground">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      )
                    )}

                    <span className="text-sm text-muted-foreground ml-2">
                      {review.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Comment */}
              {review.comment && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {review.comment}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}