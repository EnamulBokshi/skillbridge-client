
import { LucideIcon } from "lucide-react"

export interface ServiceOption {
    cache?: RequestCache;
    revalidate?: number;
    tags?: string;
}

export type TResponse<T>={
    data:T;
    error: {message:string} | null;
};

export interface SearchParams{
    isFeatured?: boolean;
    search?: string;
    page?: string;
    slug?: string;
    startDate? : string;
    endDate?: string;
    date?: string;
}


export type Route = {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  
}