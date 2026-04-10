import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TutorPromoSectionProps {
  className?: string;
}

const highlights = [
  "Best Curriculum",
  "Expert Team",
  "Highly Experienced",
  "350+ Quality Topics",
];

export default function TutorPromoSection({ className }: TutorPromoSectionProps) {
  return (
    <section className={`px-4 sm:px-6 lg:px-8 py-16 ${className ?? ""}`}>
      <div className="max-w-7xl mx-auto rounded-3xl bg-[#f2f4f7] border border-black/5 p-6 md:p-10 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative min-h-72.5 flex items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full bg-emerald-200/80" />

            <div className="absolute left-8 top-8 h-14 w-14 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
              <img
                src="/default-avatar.webp"
                alt="Tutor"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute right-10 bottom-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-rose-500 text-white shadow-lg">
              <span className="text-lg font-bold leading-none">95%</span>
              <span className="text-[10px] tracking-wide">SUCCESS</span>
            </div>

            <div className="absolute left-10 bottom-10 rounded-lg bg-white px-3 py-2 shadow-sm border border-black/5">
              <p className="text-xs font-semibold text-slate-900">12+ Years Experience</p>
            </div>

            <div className="relative z-10 h-72 w-56 rounded-[2rem] border-[6px] border-white bg-white shadow-xl overflow-hidden">
              <img
                src="/default-avatar.webp"
                alt="Lead tutor"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                About Our Tutors
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                We Have Best Tutors and Feels Like Real Classroom
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-xl">
                Learn from experienced mentors through practical, engaging sessions designed to improve confidence and outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button asChild className="rounded-md px-6">
              <Link href="/sessions">Start Enrollment</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
