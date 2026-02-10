import { SessionSearchParams } from "@/types";
import { SlotSearchParams } from "@/types/slot.type";

const handleParams = (url:string, params?:  SlotSearchParams | SessionSearchParams)=> {
    if(!params) return url;
    console.log("Handling params for URL:", url, "with params:", params);
    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value])=> {
        if(value !== undefined && value !== null && value !== ''){
            urlObj.searchParams.append(key, value.toString());
        }
    });
    return urlObj.toString();
}

export default handleParams;