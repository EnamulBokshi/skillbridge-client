"use client";

import { Filter, RefreshCw, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { getSubjectsAction } from "@/action/subject.action";

import { OSubject } from "@/types/subject.type";
import { GetTutorsParams } from "@/types/tutor.type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategoriesAction } from "@/action/category.action";
import { Category } from "@/types/category.type";
import { Switch } from "@/components/ui/switch";

export default function TutorFilterController() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSubjectsLoading, setIsSubjectsLoading] = useState(false);
  const [subjects, setSubjects] = useState<OSubject[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  /* ---------------------- UI State ---------------------- */
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  /* -------------------- Filter State -------------------- */
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<GetTutorsParams>({});

  const getSubjects = async () => {
    setIsSubjectsLoading(true);
    const { data, error } = await getSubjectsAction();
    setIsSubjectsLoading(false);
    if (!error && data) {
      setSubjects(data);
    }
  };

  const getCategories = async () => {
    // setIsSubjectsLoading(true);
    const { data, error } = await getCategoriesAction();
    if (!error && data) {
      setCategories(data.data || []);
    }
  };
  /* ------------------ Sync from URL ------------------ */
  useEffect(() => {
    setSearch(searchParams.get("search") || "");

    setFilters({
      isFeatured: searchParams.get("isFeatured")
        ? searchParams.get("isFeatured") === "true"
        : undefined,

      subjectId: searchParams.get("subjectId") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      slug: searchParams.get("slug") || undefined,

      minRating: searchParams.get("minRating")
        ? Number(searchParams.get("minRating"))
        : undefined,
      maxRating: searchParams.get("maxRating")
        ? Number(searchParams.get("maxRating"))
        : undefined,
      minExperience: searchParams.get("minExperience")
        ? Number(searchParams.get("minExperience"))
        : undefined,
      maxExperience: searchParams.get("maxExperience")
        ? Number(searchParams.get("maxExperience"))
        : undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      orderBy: (searchParams.get("orderBy") as "asc" | "desc") || undefined,
    });
    getSubjects();
    getCategories();
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

  const handleFilterChange = (key: keyof typeof filters, value?: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    updateParams({
      search,
      ...Object.fromEntries(
        Object.entries(filters).map(([key, value]) => [
          key,
          value !== undefined ? String(value) : undefined,
        ]),
      ),
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
        <Card className="border shadow-lg rounded-2xl">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Refine Tutors
            </CardTitle>
            <CardDescription>
              Narrow down tutors based on your preferences
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Top Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40">
                <div>
                  <Label className="text-sm font-medium">Featured Only</Label>
                  <p className="text-xs text-muted-foreground">
                    Show top rated tutors
                  </p>
                </div>
                <Switch
                  checked={filters.isFeatured === true}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      "isFeatured",
                      checked ? "true" : undefined,
                    )
                  }
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Category</Label>
                <Select
                  value={filters.categoryId || ""}
                  onValueChange={(value) =>
                    handleFilterChange("categoryId", value)
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id as string}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Subject</Label>
                <Select
                  value={filters.subjectId || ""}
                  onValueChange={(value) =>
                    handleFilterChange("subjectId", value)
                  }
                  disabled={isSubjectsLoading}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id as string}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rating Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Minimum Rating</Label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  placeholder="0"
                  value={filters.minRating || ""}
                  onChange={(e) =>
                    handleFilterChange("minRating", e.target.value)
                  }
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Maximum Rating</Label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  placeholder="5"
                  value={filters.maxRating || ""}
                  onChange={(e) =>
                    handleFilterChange("maxRating", e.target.value)
                  }
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t pt-6 flex flex-col sm:flex-row gap-3">
              <Button onClick={applyFilters} className="flex-1 rounded-xl">
                Apply Filters
              </Button>

              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex-1 rounded-xl"
              >
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
