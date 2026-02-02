import { getSlotsAction } from '@/action/slot.action'
import React from 'react'

export default async function SlotTable() {
    const {data, error, message} = await getSlotsAction({
        isFeatured: true,
        page: "1",

    })
    console.log("Slots data:", data, error, message);
  return (
    <div>SlotTable</div>
  )
}
