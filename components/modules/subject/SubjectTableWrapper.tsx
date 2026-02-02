"use client";

import { useState } from "react";
import { SubjectWithCategory } from "@/types/subject.type";
import SubjectsTable from "./SubjectTable";
import { SubjectEditDialog } from "./SubjectEditDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SubjectTableWrapperProps {
  subjects: SubjectWithCategory[];
}

export function SubjectTableWrapper({ subjects }: SubjectTableWrapperProps) {
  const [editingSubject, setEditingSubject] = useState<SubjectWithCategory | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const router = useRouter();

  const handleEdit = (subject: SubjectWithCategory) => {
    setEditingSubject(subject);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (updatedSubject: SubjectWithCategory) => {
    try {
      // TODO: Implement update subject action
      // await updateSubjectAction(updatedSubject);
      
      console.log("Update subject:", updatedSubject);
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (subjectId: string) => {
    try {
      // TODO: Implement delete subject action
      // await deleteSubjectAction(subjectId);
      
      console.log("Delete subject:", subjectId);
      toast.success("Subject deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete subject");
      throw error;
    }
  };

  return (
    <>
      <SubjectsTable
        subjects={subjects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SubjectEditDialog
        subject={editingSubject}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={handleUpdate}
      />
    </>
  );
}
