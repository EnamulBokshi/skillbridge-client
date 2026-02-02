import { SlotSearchParams } from "@/types/slot.type";

const handleParams = (url:string, params?:  SlotSearchParams)=> {
    if(!params) return url;

    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value])=> {
        if(value !== undefined && value !== null && value !== ''){
            urlObj.searchParams.append(key, value.toString());
        }
    });
    return urlObj.toString();
}

export default handleParams;