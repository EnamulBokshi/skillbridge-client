"use server"

import slotService from "@/services/slot.service";
import { ICreateSlotPayload, SlotSearchParams } from "@/types/slot.type";
import { updateTag } from "next/cache";

export const createSlotAction = async(payload: ICreateSlotPayload)=> {
    const result = await slotService.createSlot(payload);
    updateTag('slots');
    return result;
};

export const getSlotsAction = async(params?:SlotSearchParams) => {
    const result = await slotService.getSlots(params);
    return result;
}