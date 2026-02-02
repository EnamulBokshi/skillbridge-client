"use client";

import { SlotList } from "./SlotList";
import { ISlotResponse, SlotSearchParams } from "@/types/slot.type";
import { getSlotsAction } from "@/action/slot.action";
import { useEffect, useState, useCallback } from "react";
import { Loading } from "@/components/common/Loading";

interface AdminSlotListProps {
  initialData?: {
    slots: ISlotResponse[];
    pagination: {
      page: number;
      limit: number;
      totalRecords: number;
      totalPages: number;
    };
  };
}

export function AdminSlotList({ initialData }: AdminSlotListProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);

  const fetchSlots = useCallback(async (filters?: SlotSearchParams) => {
    setIsLoading(true);
    try {
      const result = await getSlotsAction(filters);
      
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
        title="Loading slots"
        description="Please wait while we fetch the slots data."
        sections={6}
        showFooter={false}
      />
    );
  }

  return (
    <SlotList
      initialSlots={data.slots}
      initialPagination={data.pagination}
      editable={true}
      showTutorFilter={true}
      onFiltersChange={fetchSlots}
      
    />
  );
}
