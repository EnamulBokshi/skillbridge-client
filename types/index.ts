
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


export type SidebarRoute = {
  title: string;
  url: string;
  icon?: React.ComponentType<any>;
  items?: {
    title: string;
    url: string;
    icon?: React.ComponentType<any>;
    isActive?: boolean;
  }[];
};