"use client";

import { useEffect, useMemo, useRef, useState } from "react";
interface PlatformStats {
  students: number;
  tutors: number;
  slots: number;
  subjects: number;
}

type StatKey = "students" | "tutors" | "slots" | "subjects";

interface PlatformStatsSectionClientProps {
  stats: PlatformStats;
}

const STAT_CONFIG: Array<{
  key: StatKey;
  label: string;
  caption: string;
  suffix?: string;
}> = [
  {
    key: "students",
    label: "Students",
    caption: "Active learners growing with SkillBridge.",
    suffix: "+",
  },
  {
    key: "tutors",
    label: "Tutors",
    caption: "Verified mentors ready to guide sessions.",
    suffix: "+",
  },
  {
    key: "slots",
    label: "Slots",
    caption: "Bookable learning slots listed on the platform.",
    suffix: "+",
  },
  {
    key: "subjects",
    label: "Subjects",
    caption: "Topics available for personalized tutoring.",
  },
];

export function PlatformStatsSectionClient({ stats }: PlatformStatsSectionClientProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValues, setDisplayValues] = useState<PlatformStats>({
    students: 0,
    tutors: 0,
    slots: 0,
    subjects: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1400;
    const start = performance.now();
    let frameId = 0;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValues({
        students: Math.round(stats.students * eased),
        tutors: Math.round(stats.tutors * eased),
        slots: Math.round(stats.slots * eased),
        subjects: Math.round(stats.subjects * eased),
      });

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [hasAnimated, stats]);

  const isAllZero = useMemo(() => {
    return Object.values(stats).every((value) => value === 0);
  }, [stats]);

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary/90">
            Live Platform Numbers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">SkillBridge Impact</h2>
        </div>

        <div className="border border-border/60 bg-background">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_CONFIG.map((item) => {
              const value = displayValues[item.key];
              const separators =
                "border-b border-dashed border-border/70 lg:border-b-0 lg:border-r last:lg:border-r-0";

              return (
                <div key={item.key} className={`px-6 py-8 text-center ${separators}`}>
                  <div className="flex items-start justify-center">
                    <p className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground tabular-nums">
                      {value.toLocaleString()}
                    </p>
                    {item.suffix ? (
                      <span className="ml-1 mt-1 text-xl font-medium text-foreground/85">
                        {item.suffix}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-68 mx-auto">
                    {item.caption}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {isAllZero && (
          <p className="text-center text-xs text-muted-foreground">
            Stats are temporarily unavailable.
          </p>
        )}
      </div>
    </section>
  );
}
