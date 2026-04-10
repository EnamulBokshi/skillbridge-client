"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { BookOpen, CalendarClock, Search, UserRoundPlus } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type HowItWorksStep = {
  title: string;
  description: string;
  points?: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const defaultSteps: HowItWorksStep[] = [
  {
    title: "Become a Student",
    description:
      "Create your account in minutes and enter a learning space built around your goals.",
    points: ["Sign up with email", "Choose learning interests"],
    icon: UserRoundPlus,
  },
  {
    title: "Complete Your Profile",
    description:
      "Add your level, targets, and preferred schedule so recommendations match your path.",
    points: ["Set your goals", "Pick preferred time slots"],
    icon: CalendarClock,
  },
  {
    title: "Browse Tutors & Sessions",
    description:
      "Explore tutors, compare subjects, and shortlist a session that fits your progress plan.",
    points: ["Filter by subject and rating", "Review tutor profiles"],
    icon: Search,
  },
  {
    title: "Book the Session",
    description:
      "Secure your slot, join live, and start guided learning with practical outcomes.",
    points: ["Confirm booking", "Join and start learning"],
    icon: BookOpen,
  },
];

type HowItWorksTimelineProps = {
  title?: string;
  subtitle?: string;
  steps?: HowItWorksStep[];
  className?: string;
};

export default function HowItWorksTimeline({
  title = "How It Works",
  subtitle = "A clear step-by-step path from signup to your first live learning session.",
  steps = defaultSteps,
  className,
}: HowItWorksTimelineProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 25%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    const index = Math.floor(value * steps.length);
    setActiveIndex(Math.max(0, Math.min(steps.length - 1, index)));
  });

  const timelineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const pulseY = useTransform(smoothProgress, [0, 1], ["1.5rem", "calc(100% - 1.5rem)"]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative overflow-hidden bg-muted/35 px-4 py-20 sm:px-6 lg:px-8", className)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-12 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl py-6">
          <div className="pointer-events-none absolute bottom-6 left-6 top-6 w-px bg-border/80 md:left-1/2 md:-translate-x-1/2" />

          <motion.div
            aria-hidden
            style={{ height: timelineHeight }}
            className="pointer-events-none absolute left-6 top-6 w-px overflow-hidden md:left-1/2 md:-translate-x-1/2"
          >
            <motion.div
              animate={{
                opacity: [0.82, 1, 0.78],
                filter: ["brightness(0.85)", "brightness(1.45)", "brightness(0.9)"],
                backgroundPositionY: ["0%", "100%"],
              }}
              transition={{
                opacity: { duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                filter: { duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                backgroundPositionY: { duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
              className="h-full w-full"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, rgba(56, 189, 248, 0.95) 0 10px, rgba(14, 116, 144, 0.95) 10px 18px, rgba(125, 211, 252, 0.95) 18px 26px)",
                backgroundSize: "100% 38px",
                boxShadow:
                  "0 0 12px rgba(56, 189, 248, 0.95), 0 0 20px rgba(37, 99, 235, 0.75), 0 0 42px rgba(14, 116, 144, 0.55)",
              }}
            />
          </motion.div>

          <motion.div
            aria-hidden
            style={{ height: timelineHeight }}
            className="pointer-events-none absolute left-6 top-6 w-2 -translate-x-1/2 overflow-hidden md:left-1/2"
          >
            <motion.div
              className="h-8 w-full bg-linear-to-b from-white/80 via-cyan-200/50 to-transparent blur-[1px]"
              animate={{ y: ["-35%", "250%"] }}
              transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>

          <motion.div
            aria-hidden
            style={{ top: pulseY }}
            className="pointer-events-none absolute left-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full md:left-1/2"
            animate={{ scale: [1, 1.4, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 0.55, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="absolute inset-0 rounded-full bg-cyan-400" />
            <span className="absolute inset-0 rounded-full blur-sm bg-cyan-300" />
            <span className="absolute -inset-1 rounded-full border border-cyan-200/70" />
          </motion.div>

          <motion.div
            aria-hidden
            style={{ top: pulseY }}
            className="pointer-events-none absolute left-6 h-8 w-8 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
            animate={{ x: [-0.8, 0.9, -0.5, 0.7, -0.8], opacity: [0.55, 0.9, 0.65, 0.95, 0.55] }}
            transition={{ duration: 0.22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-cyan-200/70 blur-[0.3px]" />
            <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-cyan-200/70 blur-[0.3px]" />
            <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-cyan-200/70 blur-[0.3px]" />
            <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-cyan-200/70 blur-[0.3px]" />
          </motion.div>

          <div className="space-y-14 md:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24, x: index % 2 === 0 ? -64 : 64 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
                  className={cn(
                    "relative grid gap-4 pl-14 md:grid-cols-2 md:gap-10 md:pl-0",
                    index % 2 === 0 ? "md:[&>article]:col-start-1" : "md:[&>article]:col-start-2",
                  )}
                >
                  <motion.span
                    aria-hidden
                    className="absolute left-6 top-8 h-5 w-5 -translate-x-1/2 rounded-full border border-cyan-300/70 bg-background md:left-1/2"
                    animate={{
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        "0 0 0px rgba(34, 211, 238, 0)",
                        "0 0 14px rgba(34, 211, 238, 0.85)",
                        "0 0 0px rgba(34, 211, 238, 0)",
                      ],
                    }}
                    transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                  >
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full transition-opacity duration-300",
                        activeIndex >= index
                          ? "bg-cyan-300/95 opacity-100"
                          : "bg-cyan-300/25 opacity-35",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full blur-[2px] transition-opacity duration-300",
                        activeIndex >= index ? "bg-cyan-200/80 opacity-100" : "opacity-0",
                      )}
                    />

                    {activeIndex >= index ? (
                      <>
                        <motion.span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 h-px w-4 -translate-y-1/2 bg-cyan-200/70"
                          animate={{ rotate: [18, 34, 14, 28, 18], opacity: [0.55, 1, 0.7, 1, 0.55] }}
                          transition={{ duration: 0.38, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          style={{ transformOrigin: "left center" }}
                        />
                        <motion.span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 h-px w-3 -translate-y-1/2 bg-cyan-100/70"
                          animate={{ rotate: [-28, -10, -30, -14, -28], opacity: [0.45, 0.95, 0.6, 0.95, 0.45] }}
                          transition={{ duration: 0.32, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.08 }}
                          style={{ transformOrigin: "left center" }}
                        />
                      </>
                    ) : null}
                  </motion.span>

                  <motion.article
                    className={cn(
                      "relative rounded-2xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-300",
                      activeIndex === index &&
                        "border-cyan-300/65 shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_8px_28px_rgba(6,182,212,0.2)]",
                      index % 2 === 0 ? "md:mr-6" : "md:ml-6",
                    )}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <span
                      className={cn(
                        "pointer-events-none absolute top-8 hidden h-px w-7 bg-linear-to-r from-cyan-300/80 to-transparent md:block",
                        index % 2 === 0 ? "-right-7" : "-left-7 rotate-180",
                      )}
                    />
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      <Icon className="h-3.5 w-3.5" />
                      Step {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                    {step.points && step.points.length > 0 ? (
                      <ul className="mt-4 space-y-2">
                        {step.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm text-foreground/90">
                            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
