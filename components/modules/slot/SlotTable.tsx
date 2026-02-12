"use client";

import {
  ISlotResponse,
  IUpdateSlotPayload,
  SlotSearchParams,
} from "@/types/slot.type";
import React from "react";
import { SlotCard } from "./SlotCard";
import { toast } from "sonner";
import { EditSlotForm } from "./EditSlotForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SlotFilters } from "./SlotFilters";
import { useRouter } from "next/navigation";
import { useConfirm } from "../common/ConfirmDialog";
import { deleteTutorSlotAction } from "@/action/tutor.action";

export default function SlotTable({
  slots,
  caption,
  role,
  tutorId,
}: {
  role: "TUTOR" | "STUDENT" | "ADMIN";
  slots: ISlotResponse[];
  caption?: string;
  tutorId: string;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingSlot, setEditingSlot] =
    React.useState<IUpdateSlotPayload | null>(null);
  const [slotId, setSlotId] = React.useState<string | null>(null);
  const router = useRouter();
  const { confirm } = useConfirm();
  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete Slot",
      description:
        "Are you sure you want to delete this slot? This action cannot be undone.",
      confirmText: "Delete",
    });
    if (!ok) return;
    const loadingToast = toast.loading("Deleting slot...");
    try {
      const { data, error, message } = await deleteTutorSlotAction(id);
      if (!error) {
        toast.success(message || "Slot deleted successfully");
        toast.dismiss(loadingToast);
        router.refresh();
      }
      toast.error(message || "Failed to delete slot. Please try again.");
      toast.dismiss(loadingToast);
    } catch (error) {
      console.log("Error deleting slot: ", error);
      toast.error("Failed to delete slot. Please try again.");
      toast.dismiss(loadingToast);
    }
  };
  const handleEdit = (slot: IUpdateSlotPayload, id: string) => {
    setEditingSlot(slot);
    setSlotId(id);
    setIsEditing(true);
    toast.info(`Editing slot`);
  };
  const onFilterChange = async (filters: SlotSearchParams) => {
    const query = new URLSearchParams(
      filters as Record<string, string>,
    ).toString();
    router.push(`/dashboard/tutor/slots?${query}`);

    console.log("Filters changed: ", filters);
  };
  const onSearchChange = async (searchTerm: string) => {
    const query = new URLSearchParams({ search: searchTerm }).toString();
    router.push(`/dashboard/tutor/slots?${query}`);
    console.log("Search term changed: ", searchTerm);
  };
  return (
    <>
      {/* Slots Container */}
      <div className="rounded-lg border bg-background shadow-sm">
        {caption && (
          <div className="border-b px-4 py-3">
            <h4 className="text-lg font-semibold">{caption}</h4>
            <p className="text-sm text-muted-foreground">
              Manage your available teaching slots
            </p>
          </div>
        )}
        {/* slots */}
        <div className="p-4">
          <SlotFilters
            onFilterChange={onFilterChange}
            onSearchChange={onSearchChange}
          />
          {slots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  editable
                  onEdit={() =>
                    handleEdit(
                      {
                        date: slot.date,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        isFeatured: slot.isFeatured,
                        isFree: slot.isFree,
                        subjectId: slot.subject?.id,
                        slotPrice: slot.slotPrice,
                      },
                      slot.id,
                    )
                  }
                  onDelete={() => handleDelete(slot.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No slots available"
              caption="You haven’t created any teaching slots yet. Create a slot so students can book sessions with you."
            />
          )}
        </div>
      </div>

      {/* Edit Slot Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Slot</DialogTitle>
            <DialogDescription>
              Update the details of your teaching slot.
            </DialogDescription>
          </DialogHeader>

          {editingSlot && slotId && (
            <div className="py-2">
              <EditSlotForm
                initialValues={editingSlot}
                slotId={slotId}
                role={role}
                tutorId={tutorId}
                onClose={() => setIsEditing(false)}
              />
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function EmptyState({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center border border-dashed rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}
