"use client";

import { Filter, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import { getSubjectsAction } from "@/action/subject.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OSubject } from "@/types/subject.type";

const parseBoolean = (value: string | null): boolean | undefined => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

type QuickFilterKey = "recent" | "trending" | "free" | "popular";
type QuickFilterSelect = "all" | QuickFilterKey;

export default function FilterController() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSubjectsLoading, setIsSubjectsLoading] = useState(false);
  const [subjects, setSubjects] = useState<OSubject[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [filters, setFilters] = useState<{
    isFree?: boolean;
    isFeatured?: boolean;
    date?: string;
    subjectId?: string;
    sortBy?: string;
    orderBy?: "asc" | "desc";
  }>({});

  const getSubjects = async () => {
    setIsSubjectsLoading(true);
    const { data, error } = await getSubjectsAction();
    setIsSubjectsLoading(false);

    if (!error && data) {
      setSubjects(data);
    }
  };

  useEffect(() => {
    setFilters({
      isFree: parseBoolean(searchParams.get("isFree")),
      isFeatured: parseBoolean(searchParams.get("isFeatured")),
      date: searchParams.get("date") || undefined,
      subjectId: searchParams.get("subjectId") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      orderBy: (searchParams.get("orderBy") as "asc" | "desc" | null) || undefined,
    });
  }, [searchParams]);

  useEffect(() => {
    getSubjects();
  }, []);

  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (key: keyof typeof filters, value?: string | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value as never }));
  };

  const applyFilters = () => {
    updateParams({
      isFree: filters.isFree === undefined ? undefined : String(filters.isFree),
      isFeatured:
        filters.isFeatured === undefined ? undefined : String(filters.isFeatured),
      date: filters.date,
      subjectId: filters.subjectId,
      sortBy: filters.sortBy,
      orderBy: filters.orderBy,
    });
    setIsFilterModalOpen(false);
  };

  const resetFilters = () => {
    updateParams({
      isFree: undefined,
      isFeatured: undefined,
      date: undefined,
      subjectId: undefined,
      sortBy: undefined,
      orderBy: undefined,
    });
  };

  const activeFilterCount = useMemo(
    () =>
      Object.values(filters).filter(
        (value) => value !== undefined && value !== "",
      ).length,
    [filters],
  );

  const activeQuickFilter = useMemo<QuickFilterSelect>(() => {
    if (filters.isFree === true) return "free";
    if (filters.isFeatured === true && filters.isFree === false) return "popular";
    if (filters.isFeatured === true) return "trending";
    if (filters.sortBy === "createdAt" && filters.orderBy === "desc") return "recent";
    return "all";
  }, [filters]);

  const applyQuickFilter = (key: QuickFilterSelect) => {
    if (key === "all") {
      updateParams({
        isFree: undefined,
        isFeatured: undefined,
        sortBy: undefined,
        orderBy: undefined,
      });
      return;
    }

    if (key === "recent") {
      updateParams({
        isFree: undefined,
        isFeatured: undefined,
        sortBy: "createdAt",
        orderBy: "desc",
      });
      return;
    }

    if (key === "trending") {
      updateParams({
        isFeatured: "true",
        isFree: undefined,
        sortBy: "createdAt",
        orderBy: "desc",
      });
      return;
    }

    if (key === "free") {
      updateParams({
        isFree: "true",
        isFeatured: undefined,
      });
      return;
    }

    updateParams({
      isFeatured: "true",
      isFree: "false",
      sortBy: "createdAt",
      orderBy: "desc",
    });
  };

  return (
    <div className="space-y-4 py-2">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-auto">
          <Select
            value={activeQuickFilter}
            onValueChange={(value) => applyQuickFilter(value as QuickFilterSelect)}
          >
            <SelectTrigger className="h-10 w-full rounded-xl md:w-52">
              <SelectValue placeholder="Quick filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sessions</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-full">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-full">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-160">
              <DialogHeader>
                <DialogTitle>Session Filters</DialogTitle>
                <DialogDescription>
                  Refine the tutor sessions list with compact advanced controls.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={filters.date || ""}
                    onChange={(e) => handleFilterChange("date", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select
                    value={filters.subjectId || "all"}
                    onValueChange={(value) =>
                      handleFilterChange("subjectId", value === "all" ? undefined : value)
                    }
                    disabled={isSubjectsLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Featured</Label>
                  <Select
                    value={
                      filters.isFeatured === undefined
                        ? "all"
                        : filters.isFeatured
                        ? "true"
                        : "false"
                    }
                    onValueChange={(value) =>
                      handleFilterChange(
                        "isFeatured",
                        value === "all" ? undefined : value === "true",
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="true">Featured</SelectItem>
                      <SelectItem value="false">Not featured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Pricing</Label>
                  <Select
                    value={
                      filters.isFree === undefined
                        ? "all"
                        : filters.isFree
                        ? "true"
                        : "false"
                    }
                    onValueChange={(value) =>
                      handleFilterChange(
                        "isFree",
                        value === "all" ? undefined : value === "true",
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="true">Free</SelectItem>
                      <SelectItem value="false">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetFilters}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
