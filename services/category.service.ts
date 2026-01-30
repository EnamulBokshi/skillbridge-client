import { ServiceOption, TResponse } from "@/types";
import { env } from "@/env";
import { cookies } from "next/headers";
import buildFetchConfig from "@/helper/buildFetchConfig";
import { Category } from "@/types/category.type";


const categoryService = {
    createCategory:async (data: any, options?: ServiceOption) => {
       try {
         const cookieStore = await cookies();
        console.log("Creating category with data:", data);
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(data),
            },
            
        );
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to create category');
        }
        const category = await res.json();
        return {data: category, error: null};
       } catch (error) {
        console.error("Error creating category:", error);
        return {data: null, error: {message: 'Category creation failed'}};
       }
    },
    getAllCategories: async (options?: ServiceOption):Promise<TResponse<Category[]|null>> => {
        try {
            const fetchConfig = buildFetchConfig(options);
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories`, fetchConfig);
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch categories');
            }
            const categories = await res.json();
            return {data:categories, error: null};
            
        } catch (error) {
            console.error("Error fetching categories:", error);
            return {data: null, error: {message: 'Failed to fetch categories'}};
        }
    },

    getCategoryBySlug: async (slug: string):Promise<TResponse<Category | null>> => {
        try {
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories/${slug}`);
            if(!res.ok){
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch category')
            }
            const category = await res.json();
            return {data: category, error: null}
        } catch (error) {
            console.error("Error fetching category by slug:", error);
            return {data: null, error: {message: 'Failed to fetch category'}};
        }
    }

}


export { categoryService };
