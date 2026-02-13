import { getSlotsAction } from "@/action/slot.action"
import SlotTable from "./SlotTable"
import { SlotCard } from "./SlotCard"
import EmptyState from "@/components/ui/EmptyState"
import { ISlotResponse } from "@/types/slot.type"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightCircle } from "lucide-react"

export default async function HomeSlotList() {
    const {data:slots} = await getSlotsAction({isBookable:true,})
    const slotsList = Array.isArray(slots) ? slots : slots?.data || [];
  return (
    <div>
       
        {/* slots */}
                <div className="p-4">
                  {/* <SlotFilters
                    onFilterChange={onFilterChange}
                    onSearchChange={onSearchChange}
                  /> */}
                  {slotsList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {slotsList.map((slot:ISlotResponse) => (
                        <SlotCard
                          key={slot.id}
                          slot={slot}
                          />
                          
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No slots available at the moment"
                      caption="Please check back later for available teaching slots."
                    />
                  )}
                </div>
                <Button variant="link" >
                    <Link href="/sessions" className="text-sm hover:text-primary">
                        View All <ArrowRightCircle className="ml-1 h-4 w-4 inline" />
                    </Link>
                </Button>
    </div>
  )
}
