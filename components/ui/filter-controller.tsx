"use client";

import { Filter, RefreshCw, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Label } from "./label";
import { getSubjectsAction } from "@/action/subject.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { OSubject } from "@/types/subject.type";



export default function FilterController() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSubjectsLoading, setIsSubjectsLoading] = useState(false);
  const [subjects, setSubjects] = useState<OSubject[]>([]);
  /* ---------------------- UI State ---------------------- */
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  /* -------------------- Filter State -------------------- */
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    isFree?: boolean | undefined| string;
    isFeatured?: boolean | undefined | string;
    date?: string;
    startDate?: string;
    endDate?: string;
    subjectId?: string;
  }>({});

  const getSubjects = async ()=> {
    setIsSubjectsLoading(true);
    const {data, error} = await getSubjectsAction();
    setIsSubjectsLoading(false);
    if(!error && data) {
      setSubjects(data);
    }
  }

  /* ------------------ Sync from URL ------------------ */
  useEffect(() => {
    setSearch(searchParams.get("search") || "");

    setFilters({
      isFree: (searchParams.get("isFree")) || undefined,
      isFeatured: searchParams.get("isFeatured") || undefined,
      date: searchParams.get("date") || undefined,
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      subjectId: searchParams.get("subjectId") || undefined,
    });
    getSubjects();
  }, [searchParams]);

  /* ------------------ URL Helper ------------------ */
  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    params.set("page", "1"); // reset pagination on filter change
    router.push(`?${params.toString()}`);
  };

  /* ------------------ Handlers ------------------ */
  const handleSearch = () => {
    updateParams({ search });
  };

  const handleFilterChange = (key: keyof typeof filters, value?: string | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    updateParams({
      search,
      isFree: filters.isFree === undefined ? undefined : String(filters.isFree),
      isFeatured: filters.isFeatured === undefined ? undefined : String(filters.isFeatured),
      date: filters.date,
      startDate: filters.startDate,
      endDate: filters.endDate,
      subjectId: filters.subjectId,
    });
  };

  const resetFilters = () => {
    router.push(window.location.pathname);
    setSearch("");
    setFilters({});
  };

  /* ------------------ Derived ------------------ */
  const activeFilterCount =
    Object.values(filters).filter(Boolean).length + (search ? 1 : 0);

  return (
    <div className="space-y-4 py-4">
      {/* Search & Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by subject, tutor, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsFilterPanelOpen((p) => !p)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary">{activeFilterCount}</Badge>
            )}
          </Button>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterPanelOpen && (
        <Card>
          <CardHeader>
            <CardTitle>Filter Slots</CardTitle>
            <CardDescription>
              Refine results using advanced filters
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Date */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={filters.date || ""}
                  onChange={(e) =>
                    handleFilterChange("date", e.target.value)
                  }
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={filters.startDate || ""}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={filters.endDate || ""}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select
                  value={filters.subjectId || ""}
                  onValueChange={(value) =>
                    handleFilterChange("subjectId", value)
                  }
                  disabled={isSubjectsLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Is Featured */}
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
                      value === "all" ? undefined : value === "true"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Featured</SelectItem>
                    <SelectItem value="false">Not Featured</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Is Free */}
              {/* Is Free */}
              <div className="space-y-2">
                <Label>Free Slots</Label>
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
                      value === "all" ? undefined : value === "true"
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

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button className="flex-1" onClick={applyFilters}>
                Apply Filters
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
