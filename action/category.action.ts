"use server"

import { categoryService } from "@/services/category.service"
import { Category } from "@/types/category.type"
import { updateTag } from "next/cache";

export const createCategoryAction =  async(data: Category) => {
    const result= await categoryService.createCategory(data);
    updateTag('categories');
    return result;
}

export const getCategoriesAction =  async() => {
    return await categoryService.getAllCategories();
}

export const getCategoryBySlugAction = async(slug: string) => {
    return await categoryService.getCategoryBySlug(slug);
}
export const updateCategoryAction = async( data: Partial<Category>) => {
    const result = await categoryService.updateCategory(data);
    updateTag('categories');
    return result;
}
export const deleteCategoryAction = async(categoryId: string) => {
    const result = await categoryService.deleteCategory(categoryId);
    updateTag('categories');
    return result;
}
