import { getSlotsAction } from '@/action/slot.action';
import { AdminSlotList } from '@/components/modules/slot'
import SlotTable from '@/components/modules/slot/SlotTable';
import { PaginationController } from '@/components/ui/pagination-controller';
import { SlotSearchParams } from '@/types/slot.type';
import React from 'react'
type SlotPageProps = {
  searchParams: Promise<SlotSearchParams>;
};
export default async function SlotPage({ searchParams }: SlotPageProps) {
  const params = await searchParams;
  const {data, error} = await getSlotsAction({...params, orderBy: "desc", sortBy: "createdAt"});
  const slots = data ? data.data.flat() : [];
  const pagination = data ? data.pagination : {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalRecords: 0,
  }
 
  return (
    <div>
      {/* <AdminSlotList  /> */}

      <SlotTable slots={slots} role={"ADMIN"} isEditable />
      <PaginationController pagination={pagination} />
    </div>
  )
}
