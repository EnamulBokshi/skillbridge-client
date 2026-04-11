"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import SearchSuggestionInput from "@/components/modules/ai/SearchSuggestionInput";
import { Badge } from "@/components/ui/badge";

const tabs = ["Live Sessions", "Top Tutors", "Subjects", "Career Prep"];

export default function SessionsHeroSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const activeSearch = useMemo(() => search.trim(), [search]);

  const submitSearch = (submitted?: string) => {
    const nextValue = (submitted ?? search).trim();
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue) {
      params.set("search", nextValue);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-border/70 bg-linear-to-br from-background via-background to-primary/5 p-6 shadow-sm md:p-8">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab, index) => (
                <Badge
                  key={tab}
                  variant={index === 0 ? "default" : "outline"}
                  className="rounded-full px-3 py-1 text-xs"
                >
                  {tab}
                </Badge>
              ))}
            </div>

            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Discover Smart Tutor Sessions
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Search by topic, tutor, subject, or learning goal. AI suggestions help
                you find the right session faster, and your search is instantly synced
                to live results.
              </p>
            </div>

            <div className="space-y-3">
              <SearchSuggestionInput
                value={search}
                onChange={setSearch}
                onSubmit={submitSearch}
                context="all"
                placeholder="What do you want to learn today?"
                className="w-full"
                inputClassName="h-12 rounded-full border-border/60 bg-background/75"
                buttonClassName="h-12 rounded-full px-6"
                buttonLabel="Search"
              />

              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>Popular:</span>
                <button
                  type="button"
                  onClick={() => submitSearch("IELTS speaking")}
                  className="rounded-full border px-2.5 py-1 transition-colors hover:bg-muted"
                >
                  IELTS speaking
                </button>
                <button
                  type="button"
                  onClick={() => submitSearch("React fundamentals")}
                  className="rounded-full border px-2.5 py-1 transition-colors hover:bg-muted"
                >
                  React fundamentals
                </button>
                <button
                  type="button"
                  onClick={() => submitSearch("Machine learning")}
                  className="rounded-full border px-2.5 py-1 transition-colors hover:bg-muted"
                >
                  Machine learning
                </button>
              </div>

              {activeSearch && (
                <p className="text-xs text-muted-foreground">
                  Active search: <span className="font-medium text-foreground">{activeSearch}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/15" />
          <div className="relative h-full min-h-80 p-4">
            <div className="relative h-full overflow-hidden rounded-2xl bg-muted/50">
              <Image
                src="/hero_section_primary.png"
                alt="Learning sessions spotlight"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
