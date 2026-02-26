"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Filter, RefreshCw, X, Search } from "lucide-react";
import { SlotSearchParams } from "@/types/slot.type";
import { useState, useCallback, useEffect } from "react";
import { getSubjectsAction } from "@/action/subject.action";
import { Loading } from "@/components/common/Loading";

interface SlotFiltersProps {
  onFilterChange: (filters: SlotSearchParams) => void;
  onSearchChange: (search: string) => void;
  showTutorFilter?: boolean;
  initialFilters?: SlotSearchParams;
}



export function SlotFilters({
  onFilterChange,
  onSearchChange,
  showTutorFilter = true,
  initialFilters = {},
}: SlotFiltersProps) {
  const [filters, setFilters] = useState<SlotSearchParams>(initialFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(initialFilters.search || "");

  // Handle search with debouncing manually
  const handleSearchInput = useCallback((value: string) => {
    setSearchValue(value);
    // Call the parent's search handler immediately
    onSearchChange(value);
  }, [onSearchChange]);

  const handleFilterChange = (key: keyof SlotSearchParams, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = async () => {
    onFilterChange(filters);
    // const {data, error} = await getSlotsAction(filters);  
    // updateTag('slots')
    // window.refresh()
    setIsOpen(false);
  };

  const resetFilters = () => {
    const emptyFilters: SlotSearchParams = {};
    setFilters(emptyFilters);
    setSearchValue("");
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = Object.keys(filters).filter(
    (key) => key !== "search" && filters[key as keyof SlotSearchParams] !== undefined
  ).length;



  // Subjects data for Subject filter
  const [isSubjectsLoading, setIsSubjectsLoading] = useState(false);
const [subjectsData, setSubjectsData] = useState<{ id: string; name: string }[]>([]);
const fetchSubjects = async()=> {
  setIsSubjectsLoading(true);
  const {data:subjects, error} =  await getSubjectsAction();
  if(!error && subjects){
    setSubjectsData(subjects);
  }
  
  setIsSubjectsLoading(false);
}  
useEffect(() => {
  fetchSubjects();
}, []);


  return (
    <div className="space-y-4 my-1 p-2">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by subject, tutor, or category..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9"
          />
          </div>
          <Button variant="outline" onClick={() => onSearchChange(searchValue)} className="absolute right-1 top-1/2 -translate-y-1/2 gap-2">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          {(activeFilterCount > 0 || searchValue) && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Slots</CardTitle>
            <CardDescription>
              Refine your search with advanced filters
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
                  onChange={(e) => handleFilterChange("date", e.target.value)}
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

              {/* Tutor ID - Only show for admin */}
              {showTutorFilter && (
                <div className="space-y-2">
                  <Label>Tutor ID</Label>
                  <Input
                    placeholder="Filter by tutor..."
                    value={filters.tutorId || ""}
                    onChange={(e) =>
                      handleFilterChange("tutorId", e.target.value)
                    }
                  />
                </div>
              )}

              {/* Subject ID */}
              <div className="space-y-2">
                <Label>Subject </Label>
                {/* <Input
                  placeholder="Filter by subject..."
                  value={filters.subjectId || ""}
                  onChange={(e) =>
                    handleFilterChange("subjectId", e.target.value)
                  }
                /> */}
                <Select
                  value={filters.subjectId || ""}
                  onValueChange={(value) =>
                    handleFilterChange("subjectId", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  {isSubjectsLoading? <>
                    <Loading />
                  </>:
                    <SelectContent>
                    {subjectsData?.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>}
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

              {/* Sort By */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select
                  value={filters.sortBy || "date"}
                  onValueChange={(value) => handleFilterChange("sortBy", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="slotPrice">Price</SelectItem>
                    <SelectItem value="createdAt">Created At</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Select
                  value={filters.orderBy || "asc"}
                  onValueChange={(value: "asc" | "desc") =>
                    handleFilterChange("orderBy", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Limit */}
              <div className="space-y-2">
                <Label>Items per page</Label>
                <Select
                  value={filters.limit || "10"}
                  onValueChange={(value) => handleFilterChange("limit", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button onClick={applyFilters} className="flex-1">
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



