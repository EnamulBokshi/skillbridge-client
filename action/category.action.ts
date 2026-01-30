"use server"

import { categoryService } from "@/services/category.service"
import { TResponse } from "@/types";
import { Category } from "@/types/category.type"

export const createCategoryAction =  async(data: Category):Promise<TResponse<Category|null>> => {
    return await categoryService.createCategory(data);
}

export const getCategoriesAction =  async():Promise<TResponse<Category[]|null>> => {
    return await categoryService.getAllCategories();
}
