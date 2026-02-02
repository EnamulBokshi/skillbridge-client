"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Category } from "@/types/category.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { deleteCategoryAction } from "@/action/category.action";

interface CategoryTableProps {
  categories: Category[];
  onEdit?: (category: Category) => void;
  onDelete?: (categoryId: string) => void;
}

export function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // const handleDelete = async (categoryId: string) => {
  //   setDeletingId(categoryId);
  //   try {
  //     if (onDelete) {
  //       await onDelete(categoryId);
  //       toast.success("Category deleted successfully");
  //     }
  //   } catch (error) {
  //     toast.error("Failed to delete category");
  //   } finally {
  //     setDeletingId(null);
  //   }
  // };
  const handleDelete = async (categoryId: string) => {
    try {
      const loading = toast.loading("Deleting category...");
      const {data, error} = await deleteCategoryAction(categoryId);
      if(error){
        toast.error(error.message || "Failed to delete category");
      } else {
        toast.success("Category deleted successfully");
      }
      toast.dismiss(loading);
    } catch (error) {
      toast.error("Failed to delete category");
    }
  }

  return (
    <div className="rounded-2xl border bg-background shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[240px]">Category</TableHead>
            <TableHead>Slug</TableHead>
            {/* <TableHead>Status</TableHead> */}
            <TableHead>Created At</TableHead>
            <TableHead>Last Modified</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-muted-foreground"
              >
                No categories found. Create one to get started.
              </TableCell>
            </TableRow>
          )}

          {categories.map((category) => (
            <TableRow key={category.id} className="hover:bg-muted/40">
              <TableCell className="font-medium">
                {category.name}
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {category.description}
                </div>
              </TableCell>

              <TableCell className="text-muted-foreground">
                {category.slug}
              </TableCell>

              {/* <TableCell>
                <Badge>Active</Badge>
              </TableCell> */}
              <TableCell className="text-muted-foreground">
                {category.createdAt
                  ? new Date(category.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {category.updatedAt
                  ? new Date(category.updatedAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit && onEdit(category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        disabled={deletingId === category.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the category "{category.name}".
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(category.id as string)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
