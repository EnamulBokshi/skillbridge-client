"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCategoriesAction } from "@/action/category.action"
import { Category } from "@/types/category.type"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await getCategoriesAction();
      if (error) {
        toast.error(error.message || "Failed to fetch categories");
        return;
      }
        const categoriesData: Category[] = data['data']
      setCategories(categoriesData || [])
    } catch (error) {
      toast.error("Something went wrong while fetching categories")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
        // console.log("Fetched categories:", categories);

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Loading categories...</p>
      </div>
    )
  }
        // console.log("Fetched categories:", categories);

  return (
    <div className="w-full border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[180px]">Slug</TableHead>
            <TableHead className="w-[120px]">Slot Price</TableHead>
            <TableHead className="w-[180px]">Created At</TableHead>
            <TableHead className="w-[180px]">Updated At</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {category.slug}
                </TableCell>
                <TableCell className="font-semibold">
                  ${category.slotPrice}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {category.createdAt
                    ? formatDate(category.createdAt)
                    : "N/A"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {category.updatedAt
                    ? formatDate(category.updatedAt)
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        toast.info(`Edit ${category.name} - Coming soon`)
                      }
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                <p className="text-muted-foreground">
                  No categories found. Create one to get started.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
