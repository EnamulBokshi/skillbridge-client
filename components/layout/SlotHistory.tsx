"use client";
import { ISlotResponse } from "@/types/slot.type";
import { CalendarOff } from "lucide-react";
import { SlotCard } from "../modules/slot";

export default function SlotHistory({ data }: { data: ISlotResponse[] }) {
  // console.log({ data }, { depth: true });

  const editable = false;
  const handleEdit = () => {
    console.log("Handle edit clicked!!");
  };
  const setDeleteSlotId = () => {
    console.log("set delete slot id");
  };
  return (
    <div>
      {data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CalendarOff className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No slots found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((slot) => (
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
    </div>
  );
}
