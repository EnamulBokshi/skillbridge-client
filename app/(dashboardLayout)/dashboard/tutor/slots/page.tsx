import { getSubjectsAction } from "@/action/subject.action";
import { getUserSession } from "@/action/user.action";
import { TutorSlotList } from "@/components/modules/slot";
import { CreateSlotForm } from "@/components/modules/slot/CreateSlotForm";
import SlotTable from "@/components/modules/slot/SlotTable";
import React from "react";

export default async function Slots() {
  return (
    <div>
      <SlotTable />
      <CreateSlotForm/>
      <TutorSlotList />
    </div>
  );
}
