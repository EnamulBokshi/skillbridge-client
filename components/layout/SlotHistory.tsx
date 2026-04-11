"use client";
import { ISlotResponse } from "@/types/slot.type";
import { Badge } from "@/components/ui/badge";
import { CalendarOff } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SlotCard } from "../modules/slot";

export default function SlotHistory({ data }: { data: ISlotResponse[] }) {
  const shouldReduceMotion = useReducedMotion();
  const visibleSlots = data.filter(
    (slot) => !slot.isBooked && new Date(slot.endTime) >= new Date(),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Available Sessions</h2>
          <p className="text-sm text-muted-foreground">
            Choose a session that matches your schedule and learning goal.
          </p>
        </div>

        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
          {visibleSlots.length} live result{visibleSlots.length === 1 ? "" : "s"}
        </Badge>
      </div>

      {visibleSlots.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed bg-muted/20 px-6 py-14 text-center">
          <CalendarOff className="mb-4 h-16 w-16 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No slots found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleSlots.map((slot, index) => (
            <motion.div
              key={slot.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: shouldReduceMotion ? 0 : index * 0.04 }}
            >
              <SlotCard slot={slot} editable={false} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
