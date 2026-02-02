"use client";

import { useState } from "react";
import { Category } from "@/types/category.type";
import { CategoryTable } from "./CategoryTable";
import { CategoryEditDialog } from "./CategoryEditDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoryTableWrapperProps {
  categories: Category[];
}

export function CategoryTableWrapper({ categories }: CategoryTableWrapperProps) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const router = useRouter();

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (updatedCategory: Category) => {
    try {
      // TODO: Implement update category action
      // await updateCategoryAction(updatedCategory);
      
      console.log("Update category:", updatedCategory);
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      // TODO: Implement delete category action
      // await deleteCategoryAction(categoryId);
      
      console.log("Delete category:", categoryId);
      toast.success("Category deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete category");
      throw error;
    }
  };

  return (
    <>
      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryEditDialog
        category={editingCategory}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={handleUpdate}
      />
    </>
  );
}
