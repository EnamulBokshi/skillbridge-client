"use client";

import { Filter, RefreshCw, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BookingStatus } from "@/types/student.type";
import { USER_ROLES } from "@/constants";

export default function BookingTableFilterController() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------------------- UI State ---------------------- */
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  /* -------------------- Filter State -------------------- */
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    role?:string;
    status?: string;
  }>({});

  /* ------------------ Sync from URL ------------------ */
  useEffect(() => {
    setSearch(searchParams.get("search") || "");

    setFilters({
      role: searchParams.get("role") || undefined,
      status: searchParams.get("status") || undefined 
    });
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
      ...filters,
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
            <CardTitle>User Filter Options</CardTitle>
            <CardDescription>
              Refine results using advanced filters
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            

             

              {/* status */}

              <div className="space-y-2">
                <Label>Status</Label>
                    <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)} >
                        <SelectTrigger className="w-full">
                            <SelectValue  placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent align="start" className="bg-background ">
                            <SelectGroup>
                                <SelectItem value = {BookingStatus.CANCELLED}>{BookingStatus.CANCELLED}</SelectItem>
                                <SelectItem value = {BookingStatus.COMPLETED}>{BookingStatus.COMPLETED}</SelectItem>
                                <SelectItem value = {BookingStatus.CONFIRMED}>{BookingStatus.CONFIRMED}</SelectItem>
                                <SelectItem value = {BookingStatus.PENDING}>{BookingStatus.PENDING}</SelectItem>
                            </SelectGroup>
                            </SelectContent>
                    </Select>
              </div>
              


              {/* Role */}

              <div className="space-y-2">
                <Label>Role</Label>
                <Select >
                    <SelectTrigger className="f-full">
                        <SelectValue placeholder="Select Role" />    
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={USER_ROLES.ADMIN}>
                            {USER_ROLES.ADMIN}
                            </SelectItem>
                            <SelectItem value={USER_ROLES.STUDENT}>
                            {USER_ROLES.STUDENT}
                            </SelectItem>
                            <SelectItem value={USER_ROLES.TUTOR}>
                            {USER_ROLES.TUTOR}
                            </SelectItem>
                            <SelectItem value="">
                            {'ALL'}
                            </SelectItem>
                        </SelectGroup>
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
