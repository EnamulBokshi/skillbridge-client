"use server"

import { categoryService } from "@/services/category.service"
import { TResponse } from "@/types";
import { Category } from "@/types/category.type"

export const createCategoryAction =  async(data: Category) => {
    return await categoryService.createCategory(data);
}

export const getCategoriesAction =  async() => {
    return await categoryService.getAllCategories();
}
