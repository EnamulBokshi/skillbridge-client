"use client";

import { ChevronLeft, ChevronRight, PencilLine, Quote, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import TestimonialFeedbackDialog from "@/components/modules/common/TestimonialFeedbackDialog";
import { useConfirm } from "@/components/modules/common/ConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteTestimonial } from "../../../services/testimonial.client";
import { ITestimonial } from "../../../types/testimonial.types";

interface TestimonialsCarouselProps {
	testimonials: ITestimonial[];
	isLoggedIn: boolean;
	currentUserId?: string | null;
	currentUserRole?: string | null;
}

const AUTOPLAY_THRESHOLD = 3;

const DUMMY_TESTIMONIALS: ITestimonial[] = [
	{
		id: "dummy-testimonial-1",
		title: "Helpful and easy to trust",
		content:
			"SkillBridge makes it simple to discover tutors that actually deliver consistency and clarity. The reviews feel honest and practical.",
		rating: 5,
		userId: "dummy-user-1",
		createdAt: "2026-04-01T10:00:00.000Z",
		updatedAt: "2026-04-01T10:00:00.000Z",
		user: {
			id: "dummy-user-1",
			name: "Amina Rahman",
			email: null,
			role: undefined,
			image: null,
		},
	},
	{
		id: "dummy-testimonial-2",
		title: "A better way to decide what to eat",
		content:
			"I like that the platform keeps tutor and subject feedback organized. It saves me from guessing and helps me choose with confidence.",
		rating: 4,
		userId: "dummy-user-2",
		createdAt: "2026-04-03T15:30:00.000Z",
		updatedAt: "2026-04-03T15:30:00.000Z",
		user: {
			id: "dummy-user-2",
			name: "Daniel Carter",
			email: null,
			role: undefined,
			image: null,
		},
	},
	{
		id: "dummy-testimonial-3",
		title: "Feels built for real diners",
		content:
			"The experience feels focused and friendly. It’s easy to browse, compare, and share opinions without the page feeling noisy.",
		rating: 5,
		userId: "dummy-user-3",
		createdAt: "2026-04-05T08:45:00.000Z",
		updatedAt: "2026-04-05T08:45:00.000Z",
		user: {
			id: "dummy-user-3",
			name: "Sophia Lee",
			email: null,
			role: undefined,
			image: null,
		},
	},
];

function formatDate(dateValue: string): string {
	const date = new Date(dateValue);
	if (Number.isNaN(date.getTime())) {
		return "Recently";
	}

	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

function getFallbackInitial(name?: string): string {
	return name?.trim()?.charAt(0)?.toUpperCase() || "U";
}

function getRoleLabel(role?: string): string {
	if (!role) {
		return "Community member";
	}

	return role.toLowerCase().replace(/_/g, " ");
}

function RatingStars({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
			{Array.from({ length: 5 }, (_, index) => {
				const starValue = index + 1;
				const active = rating >= starValue;

				return (
					<Star
						key={starValue}
						className={active ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-muted-foreground/40"}
					/>
				);
			})}
		</div>
	);
}

function getErrorMessage(error: unknown, fallback: string) {
	if (typeof error === "string") return error;
	if (error && typeof error === "object" && "message" in error) {
		const maybeMessage = (error as { message?: unknown }).message;
		if (typeof maybeMessage === "string" && maybeMessage.trim()) return maybeMessage;
	}
	return fallback;
}

export default function TestimonialsCarousel({
	testimonials,
	isLoggedIn,
	currentUserId,
	currentUserRole,
}: TestimonialsCarouselProps) {
	const router = useRouter();
	const { confirm } = useConfirm();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
	const autoplayRef = useRef<number | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [visibleCount, setVisibleCount] = useState(1);
	const [isPaused, setIsPaused] = useState(false);
	const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isPending, startTransition] = useTransition();
	const displayTestimonials = testimonials.length > 0 ? testimonials : DUMMY_TESTIMONIALS;
	const isAdmin = currentUserRole?.toUpperCase() === "ADMIN";

	const canAutoplay = displayTestimonials.length > AUTOPLAY_THRESHOLD;
	const maxIndex = Math.max(0, displayTestimonials.length - visibleCount);
	const isBusy = isRefreshing || isPending || pendingDeleteId !== null;

	const refreshTestimonials = () => {
		setIsRefreshing(true);
		startTransition(() => {
			router.refresh();
		});
	};

	useEffect(() => {
		if (isRefreshing) {
			setIsRefreshing(false);
		}
		// We intentionally rely on incoming testimonial data updates to end the visual loading state.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [testimonials]);

	useEffect(() => {
		function updateVisibleCount() {
			if (window.innerWidth >= 1024) {
				setVisibleCount(3);
				return;
			}

			if (window.innerWidth >= 640) {
				setVisibleCount(2);
				return;
			}

			setVisibleCount(1);
		}

		updateVisibleCount();
		window.addEventListener("resize", updateVisibleCount);

		return () => {
			window.removeEventListener("resize", updateVisibleCount);
		};
	}, []);

	useEffect(() => {
		if (activeIndex > maxIndex) {
			setActiveIndex(maxIndex);
		}
	}, [activeIndex, maxIndex]);

	const scrollToIndex = (index: number) => {
		const normalizedIndex = Math.max(0, Math.min(index, maxIndex));
		const card = cardRefs.current[normalizedIndex];

		if (card) {
			card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
		}

		setActiveIndex(normalizedIndex);
	};

	const handleScroll = () => {
		const container = containerRef.current;
		if (!container || displayTestimonials.length === 0) {
			return;
		}

		let closestIndex = 0;
		let closestDistance = Number.POSITIVE_INFINITY;

		cardRefs.current.forEach((card, index) => {
			if (!card) {
				return;
			}

			const distance = Math.abs(card.offsetLeft - container.scrollLeft);
			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = index;
			}
		});

		setActiveIndex(closestIndex);
	};

	useEffect(() => {
		if (!canAutoplay || isPaused || displayTestimonials.length <= visibleCount) {
			if (autoplayRef.current !== null) {
				window.clearInterval(autoplayRef.current);
				autoplayRef.current = null;
			}
			return;
		}

		autoplayRef.current = window.setInterval(() => {
			setActiveIndex((current) => {
				const nextIndex = current >= maxIndex ? 0 : current + 1;
				requestAnimationFrame(() => scrollToIndex(nextIndex));
				return nextIndex;
			});
		}, 4500);

		return () => {
			if (autoplayRef.current !== null) {
				window.clearInterval(autoplayRef.current);
				autoplayRef.current = null;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [canAutoplay, displayTestimonials.length, isPaused, maxIndex, visibleCount]);

	const paginationDots = useMemo(() => {
		return Array.from({ length: maxIndex + 1 }, (_, index) => index);
	}, [maxIndex]);

	const canManageTestimonial = (testimonial: ITestimonial) => {
		if (!isLoggedIn) return false;
		if (isAdmin) return true;
		return Boolean(currentUserId && testimonial.userId === currentUserId);
	};

	const handleDelete = async (testimonial: ITestimonial) => {
		const ok = await confirm({
			title: "Delete testimonial?",
			description: "This action cannot be undone.",
			confirmText: "Delete",
			destructive: true,
		});
		if (!ok) return;

		try {
			setPendingDeleteId(testimonial.id);
			await deleteTestimonial(testimonial.id);
			toast.success("Testimonial deleted successfully");
			refreshTestimonials();
		} catch (error) {
			toast.error(getErrorMessage(error, "Failed to delete testimonial"));
		} finally {
			setPendingDeleteId(null);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<p className="max-w-3xl text-sm leading-6 text-muted-foreground">
					Browse real feedback from the community. The carousel moves automatically when there are enough testimonials, and you can pause it anytime.
				</p>

				<div className="flex items-center gap-3">
					{isLoggedIn ? (
						<TestimonialFeedbackDialog />
					) : (
						<Button asChild variant="outline" className="h-10 rounded-full">
							<Link href="/login?redirect=/">Log in to share feedback</Link>
						</Button>
					)}
				</div>
			</div>

			<div
				className="relative"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				onFocusCapture={() => setIsPaused(true)}
				onBlurCapture={() => setIsPaused(false)}
			>
				{isBusy ? (
					<div className="pointer-events-none absolute inset-0 z-30 flex items-center gap-4 rounded-2xl bg-background/45 p-4 backdrop-blur-[1px]">
						<Skeleton className="h-56 flex-1 rounded-2xl bg-muted/80" />
						<Skeleton className="hidden h-56 flex-1 rounded-2xl bg-muted/80 sm:block" />
						<Skeleton className="hidden h-56 flex-1 rounded-2xl bg-muted/80 lg:block" />
					</div>
				) : null}

				<div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-linear-to-r from-background to-transparent lg:block" />
				<div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-linear-to-l from-background to-transparent lg:block" />

				<button
					type="button"
					onClick={() => scrollToIndex(activeIndex === 0 ? maxIndex : activeIndex - 1)}
					className="absolute left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-lg transition hover:border-primary hover:text-primary sm:inline-flex"
					aria-label="Show previous testimonials"
					disabled={isBusy}
				>
					<ChevronLeft className="h-4 w-4" />
				</button>

				<button
					type="button"
					onClick={() => scrollToIndex(activeIndex >= maxIndex ? 0 : activeIndex + 1)}
					className="absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-lg transition hover:border-primary hover:text-primary sm:inline-flex"
					aria-label="Show next testimonials"
					disabled={isBusy}
				>
					<ChevronRight className="h-4 w-4" />
				</button>

				<div
					ref={containerRef}
					onScroll={handleScroll}
					className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				>
					{displayTestimonials.map((testimonial, index) => {
						const image = testimonial.user.image || "";
						const fallbackInitial = getFallbackInitial(testimonial.user.name);
						const title = testimonial.title?.trim() || "Community feedback";
						const canManage = canManageTestimonial(testimonial);

						return (
							<div
								key={testimonial.id}
								ref={(node) => {
									cardRefs.current[index] = node;
								}}
								className="min-w-0 shrink-0 snap-start basis-full sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.75rem)]"
							>
								<div className="h-full rounded-2xl border border-border bg-card/70 p-5 transition duration-300 hover:-translate-y-1 hover:bg-card">
									<div className="flex h-full flex-col gap-4">
										<div className="flex items-start gap-3">
											<Avatar className="h-11 w-11 border border-border">
												<AvatarImage src={image} alt={testimonial.user.name} />
												<AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
													{fallbackInitial}
												</AvatarFallback>
											</Avatar>
											<div className="min-w-0 flex-1">
												<p className="truncate text-sm font-semibold text-foreground">{testimonial.user.name}</p>
												<p className="truncate text-xs text-muted-foreground">
													{getRoleLabel(testimonial.user.role)}
												</p>
											</div>
											<RatingStars rating={Number(testimonial.rating) || 0} />
										</div>

										<div className="space-y-2">
											<div className="flex items-center gap-2 text-primary">
												<Quote className="h-4 w-4" />
												<p className="text-xs font-semibold uppercase tracking-[0.16em]">Testimonial</p>
											</div>
											<h3 className="text-lg font-semibold leading-tight text-foreground">{title}</h3>
											<p className="text-sm leading-6 text-muted-foreground">{testimonial.content}</p>
										</div>

										<div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
											<div className="flex items-center gap-3">
												<span>{formatDate(testimonial.createdAt)}</span>
												<span>
													{index + 1} / {displayTestimonials.length}
												</span>
											</div>

											{canManage ? (
												<div className="flex items-center gap-1">
													<TestimonialFeedbackDialog
														mode="edit"
														testimonialId={testimonial.id}
														initialValues={{
															title: testimonial.title ?? "",
															content: testimonial.content,
															rating: Number(testimonial.rating) || 5,
														}}
														trigger={
															<Button
																type="button"
																size="icon"
																variant="ghost"
																className="h-8 w-8"
																aria-label="Edit testimonial"
																disabled={isBusy}
															>
																<PencilLine className="h-4 w-4" />
															</Button>
														}
														refreshOnSubmit={false}
														onSubmitted={refreshTestimonials}
													/>

													<Button
														type="button"
														size="icon"
														variant="ghost"
														className="h-8 w-8 text-destructive hover:text-destructive"
														onClick={() => void handleDelete(testimonial)}
														disabled={isBusy}
														aria-label="Delete testimonial"
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											) : null}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-2 pt-1">
				{paginationDots.map((index) => {
					const active = index === activeIndex;

					return (
						<button
							key={`testimonial-dot-${index}`}
							type="button"
							onClick={() => scrollToIndex(index)}
							disabled={isBusy}
							className={
								active
									? "h-2.5 w-8 rounded-full bg-primary transition"
									: "h-2.5 w-2.5 rounded-full bg-muted-foreground/30 transition hover:bg-primary/70"
							}
							aria-label={`Go to testimonial ${index + 1}`}
						/>
					);
				})}
			</div>
		</div>
	);
}