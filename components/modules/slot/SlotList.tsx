"use client";

import { ISlotResponse, SlotSearchParams } from "@/types/slot.type";
import { SlotCard } from "./SlotCard";
import { useState, useCallback, useRef } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { CalendarOff } from "lucide-react";
import { SlotFilters } from "./SlotFilters";
import { useConfirm } from "../common/ConfirmDialog";

interface SlotListProps {
  initialSlots: ISlotResponse[];
  initialPagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
  };
  editable?: boolean;
  showTutorFilter?: boolean;
  tutorId?: string;
  showFilter?: boolean;
  onFiltersChange?: (filters: SlotSearchParams) => void;
}

export function SlotList({
  initialSlots,
  initialPagination,
  editable = false,
  showTutorFilter = true,
  showFilter = true,
  tutorId,
  onFiltersChange,
}: SlotListProps) {
  const [slots, setSlots] = useState<ISlotResponse[]>(initialSlots);
  const [pagination, setPagination] = useState(initialPagination);
  const [deleteSlotId, setDeleteSlotId] = useState<string | null>(null);
  const [editingSlot, setEditingSlot] = useState<ISlotResponse | null>(null);
  const [currentFilters, setCurrentFilters] = useState<SlotSearchParams>({});

  // Use ref to track debounce timer
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);


  // Handle search with debouncing
  const handleSearchChange = useCallback(
    (search: string) => {
      // Clear existing timer
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }

      // Set new debounce timer
      searchTimerRef.current = setTimeout(() => {
        const filters: SlotSearchParams = {
          ...currentFilters,
          search,
          page: "1", // Reset to page 1 on search
        };

        if (tutorId) {
          filters.tutorId = tutorId;
        }

        setCurrentFilters(filters);
        onFiltersChange?.(filters);
      }, 500);
    },
    [currentFilters, tutorId, onFiltersChange],
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filters: SlotSearchParams) => {
      const newFilters: SlotSearchParams = {
        ...filters,
        page: "1", // Reset to page 1 on filter change
      };

      if (tutorId) {
        newFilters.tutorId = tutorId;
      }

      setCurrentFilters(newFilters);
      onFiltersChange?.(newFilters);
    },
    [tutorId, onFiltersChange],
  );

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      const filters: SlotSearchParams = {
        ...currentFilters,
        page: String(page),
      };

      setCurrentFilters(filters);
      onFiltersChange?.(filters);
    },
    [currentFilters, onFiltersChange],
  );

  const handleDelete = async (slotId: string) => {
      const  {confirm} = useConfirm();
      const ok = await confirm({
        title: "Delete slot?",
        description: "Are you sure you want to delete this slot? This action cannot be undone.",
        confirmText: "Yes, Delete it",
        destructive: true,
      });
      if (!ok) {
        return;
      }
    try {
      // TODO: Implement delete action
      // await deleteSlotAction(slotId);

      toast.success("Slot deleted successfully");
      setSlots(slots.filter((slot) => slot.id !== slotId));
      setDeleteSlotId(null);

      // Refresh the list
      onFiltersChange?.(currentFilters);
    } catch (error) {
      toast.error("Failed to delete slot");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (slot: ISlotResponse) => {
    setEditingSlot(slot);
    // TODO: Open edit modal/dialog
    toast.info("Edit functionality coming soon");
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const { page, totalPages } = pagination;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={page === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (i === page - 2 || i === page + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    return items;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilter && (
        <SlotFilters
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          showTutorFilter={showTutorFilter}
          initialFilters={{ tutorId }}
        />
      )}

      {/* Stats */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {slots.length} of {pagination.totalRecords} slots
        </p>
        <p className="text-sm text-muted-foreground">
          Page {pagination.page} of {pagination.totalPages}
        </p>
      </div>

      {/* Slots Grid */}
      {slots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CalendarOff className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No slots found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              editable={editable}
              onEdit={handleEdit}
              onDelete={setDeleteSlotId}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  pagination.page > 1 && handlePageChange(pagination.page - 1)
                }
                className={
                  pagination.page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {generatePaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  pagination.page < pagination.totalPages &&
                  handlePageChange(pagination.page + 1)
                }
                className={
                  pagination.page === pagination.totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteSlotId !== null}
        onOpenChange={(open) => !open && setDeleteSlotId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Slot</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this slot? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteSlotId && handleDelete(deleteSlotId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
