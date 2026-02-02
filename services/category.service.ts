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
    getAllCategories: async (options?: ServiceOption) => {
        try {
            const fetchConfig = buildFetchConfig(options);
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories`, {
                next: {tags: ['categories']},
            });
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
    },

    updateCategory: async (data: Partial<Category>): Promise<TResponse<Category | null>> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories/${data.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });
             if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to update category');
            }
            const updatedCategory = await res.json();
            return {data: updatedCategory, error: null};
        } catch (error) {
            console.error("Error updating category:", error);
            return {data: null, error: {message: 'Failed to update category'}};
        }
    },

    deleteCategory: async(categoryId:string)=>{
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString(),
                }
            });
             if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to delete category');
            }
            const deletedCategory = await res.json();
            return {data: deletedCategory, error: null};
        } catch (error) {
            console.error("Error deleting category:", error);
            return {data: null, error: {message: 'Failed to delete category'}};
        }
    }

}


export { categoryService };
