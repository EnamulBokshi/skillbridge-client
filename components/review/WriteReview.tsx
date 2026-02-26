"use client";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { createReviewAction } from "@/action/student.action";
import { CreateReviewPayload } from "@/types/student.type";
import { Button } from "../ui/button";
import StarRating from "./StarRating";

const formSchema = z.object({
  rating: z.string().min(1, "Rating is required!"),
  comment: z.string().min(5, "Comment must be at least 5 characters!"),
});
export default function WriteReview({
  tutorId,
  studentId,
  onClose,
}: {
  tutorId: string;
  studentId: string;
  onClose?: () => void;
}) {
  const form = useForm({
    defaultValues: {
      rating: "1",
      comment: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // Handle review submission logic here
      console.log("Submitting review for tutor:", tutorId);
      const loading = toast.loading("Submitting your review...");
      try {
        const payload: CreateReviewPayload = {
          rating: parseInt(value.rating),
          comment: value.comment,
          tutorId,
        };
        const { data, error, message } = await createReviewAction(
          studentId,
          payload,
        );
        if (!error) {
          toast.success(message || "Review submitted successfully");
        } else {
          toast.error(message || "Failed to submit review. Please try again.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        toast.dismiss(loading);
      }
      console.log("Submitting review for tutor:", tutorId);
      console.log("Rating:", value.rating);
      console.log("Comment:", value.comment);
      if (onClose) {
        onClose();
      }
    },
  });

  return (
      <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          id="review-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="rating"
              children={(field) => {
                const rating = Number(field.state.value);

                return (
                  <Field>
                    <FieldLabel>
                      Rating <span className="text-red-500">*</span>
                    </FieldLabel>

                    <StarRating
                      value={rating}
                      onChange={(value) => field.handleChange(String(value))}
                    />
                  </Field>
                );
              }}
            />

            <form.Field
              name="comment"
              children={(field) => (
                <Field>
                  <FieldLabel>Comment</FieldLabel>
                  <Textarea
                    placeholder="Write your review here..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="review-form" className="w-full">
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
}
