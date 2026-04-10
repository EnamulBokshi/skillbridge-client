"use client";

import {
  BookOpenCheck,
  CalendarClock,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const features: Feature[] = [
  {
    title: "Expert Tutors",
    description:
      "Learn from verified professionals with strong teaching and subject experience.",
    icon: Users,
  },
  {
    title: "Flexible Scheduling",
    description:
      "Book sessions around your routine and learn at a pace that works for you.",
    icon: CalendarClock,
  },
  {
    title: "Quality Assured",
    description:
      "Tutors are vetted and continuously rated to keep learning quality high.",
    icon: ShieldCheck,
  },
  {
    title: "Skill-Focused Roadmaps",
    description:
      "Build practical outcomes through guided learning paths and milestones.",
    icon: Rocket,
  },
  {
    title: "Wide Subject Coverage",
    description:
      "From academics to professional skills, find support where you need it most.",
    icon: BookOpenCheck,
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const evenCardY = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const oddCardY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const highlightY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30 px-4 py-20 sm:px-6 lg:px-8"
    >
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
        className="pointer-events-none absolute right-0 top-32 h-64 w-64 rounded-full bg-secondary/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why Choose Us
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Built for Real Learning Outcomes
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            SkillBridge combines trusted tutors, practical learning paths, and flexible access so every learner can grow with clarity and confidence.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-12">
          <motion.article
            style={{ y: highlightY }}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/90 to-primary px-7 py-8 text-primary-foreground shadow-xl lg:col-span-5"
          >
            <div className="absolute right-4 top-4 rounded-full bg-white/15 p-2">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">
              Our Promise
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight">
              Personalized Learning, Measurable Progress
            </h3>
            <p className="mt-4 text-sm leading-7 text-primary-foreground/90">
              Every session on SkillBridge is designed around learner goals. We focus on practical understanding, not just content coverage, so progress is visible and motivating.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2">
                <p className="text-xs uppercase tracking-wide text-primary-foreground/80">
                  Live Sessions
                </p>
                <p className="text-xl font-bold">1:1</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2">
                <p className="text-xs uppercase tracking-wide text-primary-foreground/80">
                  Learning Path
                </p>
                <p className="text-xl font-bold">Goal-led</p>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  style={{ y: index % 2 === 0 ? evenCardY : oddCardY }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -6,
                    rotate: index % 2 === 0 ? -1.1 : 1.1,
                    transition: { duration: 0.22 },
                  }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                  className="group relative overflow-visible rounded-2xl border border-border bg-card/75 p-5 shadow-sm transition-colors hover:bg-card"
                >
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={
                      index % 2 === 0
                        ? "pointer-events-none absolute -right-5.5 top-1/2 hidden h-px w-6 origin-left bg-linear-to-r from-primary/60 to-transparent sm:block"
                        : "pointer-events-none absolute -left-5.5 top-1/2 hidden h-px w-6 origin-right bg-linear-to-l from-secondary/60 to-transparent sm:block"
                    }
                  />
                  <motion.span
                    aria-hidden
                    animate={{ opacity: [0.35, 0.9, 0.35] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: index * 0.2 }}
                    className={
                      index % 2 === 0
                        ? "pointer-events-none absolute -right-1 top-[calc(50%-3px)] hidden h-1.5 w-1.5 rounded-full bg-primary/70 sm:block"
                        : "pointer-events-none absolute -left-1 top-[calc(50%-3px)] hidden h-1.5 w-1.5 rounded-full bg-secondary/70 sm:block"
                    }
                  />
                  <div className="mb-4 inline-flex rounded-xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
