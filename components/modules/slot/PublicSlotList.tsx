"use client";

import { SlotList } from "./SlotList";
import { ISlotResponse, SlotSearchParams } from "@/types/slot.type";
import { getSlotsAction } from "@/action/slot.action";
import { useEffect, useState, useCallback } from "react";
import { Loading } from "@/components/common/Loading";

interface PublicSlotListProps {
  initialData?: {
    slots: ISlotResponse[];
    pagination: {
      page: number;
      limit: number;
      totalRecords: number;
      totalPages: number;
    };
  };
  showFilter?: boolean;
}

export function PublicSlotList({ initialData, showFilter = true }: PublicSlotListProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);

  const fetchSlots = useCallback(async (filters?: SlotSearchParams) => {
    setIsLoading(true);
    try {
      const params: SlotSearchParams = {
        ...filters,
        sortBy: filters?.sortBy || "date",
        sortOrder: filters?.sortOrder || "asc",
      };
      
      // console.log("Fetching slots with params:", params);
      const result = await getSlotsAction(params);
      
      if (result.data) {
        setData({
          slots: result.data.data,
          pagination: result.data.pagination,
        });
      }
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialData) {
      fetchSlots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  if (isLoading || !data) {
    return (
      <Loading
        title="Loading available slots"
        description="Please wait while we fetch available tutoring sessions."
        sections={4}
        showFooter={false}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Available Tutoring Slots</h1>
        <p className="text-muted-foreground">
          Browse and book tutoring sessions with our expert tutors
        </p>
      </div>
      
      <SlotList
        initialSlots={data.slots}
        initialPagination={data.pagination}
        editable={false}
        showTutorFilter={false}
        onFiltersChange={fetchSlots}
        showFilter={showFilter}
      />
    </div>
  );
}
