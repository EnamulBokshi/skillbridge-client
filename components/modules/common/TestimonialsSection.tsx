import { MessageSquareQuote } from "lucide-react";

import { getUserSession } from "@/action/user.action";
import TestimonialsCarousel from "@/components/modules/common/TestimonialsCarousel";
import { getHomeTestimonials } from "../../../services/testimonial.services";

export default async function TestimonialsSection() {
	const [{ data: session }, testimonials] = await Promise.all([
		getUserSession(),
		getHomeTestimonials(),
	]);
	const isLoggedIn = Boolean(session?.user?.id);
	const currentUserId = session?.user?.id ?? null;
	const currentUserRole = session?.user?.role ?? null;

	return (
		<section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/5 via-background to-secondary/5"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute left-1/2 top-4 h-52 w-136 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
			/>

			<div className="relative mx-auto w-full max-w-7xl">
				<div className="mx-auto max-w-4xl text-center">
					<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
						<MessageSquareQuote className="h-3.5 w-3.5 text-primary" />
						Community Spotlight
					</p>

					<h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
						<span className="bg-linear-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
							What People Say About Our Platform
						</span>
					</h2>

					<p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
						Real students and tutors, honest reactions, and short stories from the SkillBridge community.
					</p>
				</div>

				<div className="mt-10">
					<TestimonialsCarousel
						testimonials={testimonials}
						isLoggedIn={isLoggedIn}
						currentUserId={currentUserId}
						currentUserRole={currentUserRole}
					/>
				</div>
			</div>
		</section>
	);
}