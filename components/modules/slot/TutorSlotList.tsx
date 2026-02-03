"use client";

import { SlotList } from "./SlotList";
import { ISlotResponse, SlotSearchParams } from "@/types/slot.type";
import { getSlotsAction } from "@/action/slot.action";
import { useEffect, useState, useCallback } from "react";
import { Loading } from "@/components/common/Loading";

interface TutorSlotListProps {
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

export function TutorSlotList({ initialData }: TutorSlotListProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);
  const tutor = localStorage.getItem('tutor');
  const tutorId = tutor ? JSON.parse(tutor).id : null;

  const fetchSlots = useCallback(async (filters?: SlotSearchParams) => {
    setIsLoading(true);
    try {
      const params: SlotSearchParams = {
        ...filters,
        tutorId, // Always include tutorId for tutor's own slots
      };

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
  }, [tutorId]);

  useEffect(() => {
    if (!initialData) {
      fetchSlots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  if (isLoading || !data) {
    return (
      <Loading
        title="Loading your slots"
        description="Please wait while we fetch your slots data."
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
      showTutorFilter={false} // Hide tutor filter for tutors
      tutorId={tutorId}
      onFiltersChange={fetchSlots}
    />
  );
}
