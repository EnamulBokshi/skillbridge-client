import { CategoryForm } from '@/components/modules/category/CategoryForm'
import { CategoryTable } from '@/components/modules/category/CategoryTable'
import React from 'react'

export default function CategoryPage() {
  return (
    <div>
      <CategoryTable />
      <CategoryForm />
    </div>
  )
}
