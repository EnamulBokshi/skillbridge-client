"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { PenLine, Star } from "lucide-react";
import { toast } from "sonner";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	createTestimonial,
	updateTestimonial,
} from "../../../services/testimonial.client";
import {
	createTestimonialZodSchema,
	updateTestimonialZodSchema,
} from "../../../zod/testimonial.schema";

type DialogMode = "create" | "edit";

interface TestimonialFeedbackDialogProps {
	mode?: DialogMode;
	testimonialId?: string;
	initialValues?: {
		title?: string;
		content: string;
		rating: number;
	};
	trigger?: ReactNode;
	onSubmitted?: () => void;
	refreshOnSubmit?: boolean;
}

function firstErrorMessage(error: unknown, fallback: string): string {
	if (typeof error === "string") {
		return error;
	}

	if (error && typeof error === "object" && "message" in error) {
		const maybeMessage = (error as { message?: unknown }).message;
		if (typeof maybeMessage === "string" && maybeMessage.trim().length > 0) {
			return maybeMessage;
		}
	}

	return fallback;
}

export default function TestimonialFeedbackDialog({
	mode = "create",
	testimonialId,
	initialValues,
	trigger,
	onSubmitted,
	refreshOnSubmit = true,
}: TestimonialFeedbackDialogProps) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const isEditMode = mode === "edit";

	const form = useForm({
		defaultValues: {
			title: initialValues?.title ?? "",
			content: initialValues?.content ?? "",
			rating: initialValues?.rating ?? 0,
		},
		onSubmit: async ({ value }) => {
			const normalizedPayload = {
				title: value.title.trim() || undefined,
				content: value.content.trim(),
				rating: Number(value.rating),
			};

			if (isEditMode && !testimonialId) {
				toast.error("Testimonial ID is required");
				return;
			}

			try {
				setIsSubmitting(true);
				if (isEditMode && testimonialId) {
					const parsedUpdate = updateTestimonialZodSchema.safeParse(normalizedPayload);
					if (!parsedUpdate.success) {
						toast.error(parsedUpdate.error.issues[0]?.message || "Invalid testimonial input");
						return;
					}

					await updateTestimonial(testimonialId, parsedUpdate.data);
					toast.success("Testimonial updated successfully");
				} else {
					const parsedCreate = createTestimonialZodSchema.safeParse(normalizedPayload);
					if (!parsedCreate.success) {
						toast.error(parsedCreate.error.issues[0]?.message || "Invalid testimonial input");
						return;
					}

					await createTestimonial(parsedCreate.data);
					toast.success("Testimonial shared successfully");
				}
				form.reset();
				setOpen(false);
				onSubmitted?.();
				if (refreshOnSubmit) {
					router.refresh();
				}
			} catch (error) {
				toast.error(firstErrorMessage(error, isEditMode ? "Failed to update testimonial" : "Failed to submit testimonial"));
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger || (
					<Button className="h-10 rounded-full px-5" type="button">
						<PenLine className="h-4 w-4" />
						Share Feedback
					</Button>
				)}
			</DialogTrigger>

			<DialogContent className="sm:max-w-2xl border-border bg-background text-foreground">
				<DialogHeader>
					<DialogTitle className="text-2xl">
						{isEditMode ? "Edit your testimonial" : "Share your testimonial"}
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						{isEditMode
							? "Update your feedback so the community sees your latest experience."
							: "Tell the community what stood out for you. Your feedback will appear in the home testimonial carousel."}
					</DialogDescription>
				</DialogHeader>

				<form
					className="grid gap-4"
					onSubmit={(event) => {
						event.preventDefault();
						event.stopPropagation();
						void form.handleSubmit();
					}}
				>
					<form.Field
						name="title"
						validators={{
							onChange: ({ value }) => {
								const result = createTestimonialZodSchema.shape.title.safeParse(value.trim() || undefined);
								return result.success ? undefined : result.error.issues[0]?.message;
							},
						}}
					>
						{(field) => (
							<div className="space-y-1.5">
								<Label htmlFor={field.name} className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
									Title <span className="font-normal normal-case tracking-normal opacity-70">(optional)</span>
								</Label>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="A short headline for your feedback"
									aria-invalid={Boolean(field.state.meta.errors.length)}
									className="h-11"
									disabled={isSubmitting}
								/>
								{field.state.meta.isTouched && field.state.meta.errors[0] ? (
									<p className="text-xs text-red-500">{String(field.state.meta.errors[0])}</p>
								) : null}
							</div>
						)}
					</form.Field>

					<form.Field
						name="rating"
						validators={{
							onChange: ({ value }) => {
								const result = createTestimonialZodSchema.shape.rating.safeParse(value);
								return result.success ? undefined : result.error.issues[0]?.message;
							},
						}}
					>
						{(field) => (
							<div className="space-y-2">
								<Label className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Rating</Label>
								<div className="flex flex-wrap gap-2">
									{[1, 2, 3, 4, 5].map((value) => {
										const isActive = Number(field.state.value) >= value;

										return (
											<button
												key={value}
												type="button"
												onClick={() => field.handleChange(value)}
												className={
													isActive
														? "inline-flex h-11 items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 text-sm font-semibold text-primary transition hover:bg-primary/15"
														: "inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted"
												}
												aria-pressed={field.state.value === value}
											>
												<Star className={isActive ? "h-4 w-4 fill-current" : "h-4 w-4"} />
												<span>{value}</span>
											</button>
										);
									})}
								</div>
								{field.state.meta.isTouched && field.state.meta.errors[0] ? (
									<p className="text-xs text-red-500">{String(field.state.meta.errors[0])}</p>
								) : null}
							</div>
						)}
					</form.Field>

					<form.Field
						name="content"
						validators={{
							onChange: ({ value }) => {
								const result = createTestimonialZodSchema.shape.content.safeParse(value);
								return result.success ? undefined : result.error.issues[0]?.message;
							},
						}}
					>
						{(field) => (
							<div className="space-y-1.5">
								<Label htmlFor={field.name} className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
									Feedback
								</Label>
								<Textarea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="What did you love about your experience?"
									aria-invalid={Boolean(field.state.meta.errors.length)}
									className="min-h-32"
									disabled={isSubmitting}
								/>
								{field.state.meta.isTouched && field.state.meta.errors[0] ? (
									<p className="text-xs text-red-500">{String(field.state.meta.errors[0])}</p>
								) : null}
							</div>
						)}
					</form.Field>

					<div className="flex flex-wrap items-center gap-3 pt-2">
						<Button
							type="submit"
							className="h-11 rounded-full px-5"
							disabled={isSubmitting}
						>
							{isSubmitting
								? isEditMode
									? "Updating..."
									: "Submitting..."
								: isEditMode
									? "Update Testimonial"
									: "Submit Testimonial"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}