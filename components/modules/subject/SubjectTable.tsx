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
import { SubjectWithCategory } from "@/types/subject.type";
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


interface SubjectsTableProps {
  subjects: SubjectWithCategory[];
  onEdit?: (subject: SubjectWithCategory) => void;
  onDelete?: (subjectId: string) => void;
}

export default function SubjectsTable({
  subjects,
  onEdit,
  onDelete,
}: SubjectsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (subjectId: string) => {
    setDeletingId(subjectId);
    try {
      if (onDelete) {
        await onDelete(subjectId);
        toast.success("Subject deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete subject");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="rounded-2xl border bg-background shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[240px]">Subject</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-center">Credits</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-muted-foreground"
              >
                No subjects found
              </TableCell>
            </TableRow>
          )}

          {subjects.map((subject) => (
            <TableRow key={subject.id} className="hover:bg-muted/40">
              <TableCell className="font-medium">
                {subject.name}
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {subject.description}
                </div>
              </TableCell>

              <TableCell className="text-sm">
                <Badge variant="outline">
                  {subject.category.name}
                </Badge>
              </TableCell>

              <TableCell className="text-muted-foreground">
                {subject.slug}
              </TableCell>

              <TableCell className="text-center">
                {subject.creditHours}
              </TableCell>

              <TableCell>
                {subject.isActive ? (
                  <Badge>Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit && onEdit(subject)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        disabled={deletingId === subject.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the subject "{subject.name}".
                          This action cannot be undone and will affect all related content.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(subject.id)}
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
