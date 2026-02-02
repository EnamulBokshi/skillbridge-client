import { getCategoriesAction } from '@/action/category.action';
import { CategoryForm } from '@/components/modules/category/CategoryForm';
import { CategoryTableWrapper } from '@/components/modules/category/CategoryTableWrapper';
import { Category } from '@/types/category.type';
import React from 'react';

export default async function CategoryPage() {
  const { data, error } = await getCategoriesAction();
  
  const categories: Category[] = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your course categories
          </p>
        </div>
      </div>

      <CategoryTableWrapper categories={categories} />

      <CategoryForm />
    </div>
  );
}
