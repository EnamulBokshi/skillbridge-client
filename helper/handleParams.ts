import { SearchParams } from "@/types";

const handleParams = (url:URL,params: SearchParams) => {
    const currentUrl = url;
    Object.entries(params).forEach(([key, value]) => {
        if(value){
            currentUrl.searchParams.append(key,value)
        }
    })
    return currentUrl.toString();
}

export{handleParams};