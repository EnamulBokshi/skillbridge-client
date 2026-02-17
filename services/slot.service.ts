import { env } from "@/env";
import handleParams from "@/helper/handleSearchParams";
import { PaginatedData, PaginatedResponse, ServerResponse } from "@/types";
import { ICreateSlotPayload, ISlotResponse, SlotSearchParams } from "@/types/slot.type";
import { cookies } from "next/headers";

const slotService = {
  createSlot: async (payload: ICreateSlotPayload) => {
    try {
        const cookieStore = cookies();
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
        const result: ServerResponse = await response.json();
        return {data: result.data, error: result.error, success: result.success, message: result.message};
    } catch (error) {
      console.error("Error creating slot:", error);
      return {
        data: null,
        error,
        success: false,
        message: "Failed to create slot",
      };
    }
  },
  getSlots: async(params?: SlotSearchParams):Promise<PaginatedResponse<ISlotResponse>> => {
    try {
        const cookieStore = cookies();
        const base = `${env.NEXT_PUBLIC_API_URL}/slots`;
        const url = handleParams(base, params);
        console.log("Fetch slots with URL:", url);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
            next: {tags: ['slots']}
        });
        return (await response.json()) as PaginatedResponse<ISlotResponse>;
        
    } catch (error) {
        console.error("Error fetching slots:", error);
        return {
            data: {
              data:[],
              pagination: {
                page: 1,
                limit: 10,
                totalRecords: 0,
                totalPages: 0,
            }
            },
            error,
            success: false,
            message: "Failed to fetch slots",
            
            
        };
    }
  }
};

export default slotService;
