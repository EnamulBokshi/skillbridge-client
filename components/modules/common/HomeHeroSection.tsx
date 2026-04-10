"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

const contentContainer = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function HomeHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const bgY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const patternY = useTransform(scrollYProgress, [0, 1], [14, -14]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-secondary/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-20 top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: useTransform(scrollYProgress, [0, 1], [-15, 15]) }}
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: patternY }}
        className="pointer-events-none absolute inset-0 opacity-45"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in srgb, var(--color-primary) 26%, transparent) 1.2px, transparent 1.2px)",
            backgroundSize: "26px 26px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          }}
        />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          variants={contentContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-7"
        >
          <motion.p
            variants={contentItem}
            className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Start Your Learning Journey
          </motion.p>

          <motion.h1
            variants={contentItem}
            className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            An Online Education Platform for Global Learners
          </motion.h1>

          <motion.p
            variants={contentItem}
            className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            SkillBridge connects students with expert tutors for practical, goal-focused learning. Book personalized sessions, improve real-world skills, and build confidence with guidance that fits your pace.
          </motion.p>

          <motion.div variants={contentItem} className="grid gap-2 text-sm text-foreground sm:grid-cols-2">
            <p className="rounded-lg bg-card/70 px-3 py-2 border border-border">Verified Tutors & Structured Sessions</p>
            <p className="rounded-lg bg-card/70 px-3 py-2 border border-border">Flexible Schedules for Every Learner</p>
            <p className="rounded-lg bg-card/70 px-3 py-2 border border-border sm:col-span-2">Skill-focused roadmap: discover, practice, and grow</p>
          </motion.div>

          <motion.div variants={contentItem} className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="px-8">
              <Link href="/sessions">Explore Sessions</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/tutors">Find Tutors</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex min-h-96 items-center justify-center"
        >
          <motion.div
            style={{ y: imageY }}
            className="relative z-20 h-96 w-72 overflow-hidden rounded-[2.5rem] border-8 border-background bg-card shadow-2xl"
          >
            <Image
              src="/hero_section_primary.png"
              alt="SkillBridge learner"
              fill
              sizes="(max-width: 640px) 18rem, 18rem"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: badgeY }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute left-4 top-6 z-30 rounded-xl border border-border bg-background/95 px-4 py-3 shadow-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Active Students</p>
            <p className="text-lg font-bold text-primary">1000+</p>
          </motion.div>

          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute bottom-8 right-6 z-30 rounded-xl border border-border bg-background/95 px-4 py-3 shadow-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Expert Tutors</p>
            <p className="text-lg font-bold text-primary">28+</p>
          </motion.div>

          <div className="absolute h-72 w-72 rounded-full bg-primary/20" />
          <div className="absolute right-2 top-10 h-20 w-20 rounded-full bg-secondary/30" />
          <div className="absolute left-2 bottom-14 h-16 w-16 rounded-full bg-accent/40" />
        </motion.div>
      </div>
    </section>
  );
}
