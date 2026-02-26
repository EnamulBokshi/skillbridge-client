"use client";

import { useState } from "react";
import { OSubject, SubjectWithCategory } from "@/types/subject.type";
import SubjectsTable from "./SubjectTable";
import { SubjectEditDialog } from "./SubjectEditDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteSubjectAction, updateSubjectAction } from "@/action/subject.action";
import { useConfirm } from "../common/ConfirmDialog";

interface SubjectTableWrapperProps {
  subjects: SubjectWithCategory[];
}

export function SubjectTableWrapper({ subjects }: SubjectTableWrapperProps) {
  const [editingSubject, setEditingSubject] = useState<SubjectWithCategory | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const router = useRouter();

  const {confirm} =  useConfirm();

  const handleEdit = (subject: SubjectWithCategory) => {
    setEditingSubject(subject);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (updatedSubject: OSubject) => {

    const ok = await confirm({
      title: "Confirm Update",
      description: "Are you sure you want to update this subject?",
      confirmText: "Yes, Update",
      cancelText: "Cancel",
    })
    if(!ok) return;

    const loading = toast.loading("Updating subject...");

    try {

      await updateSubjectAction(updatedSubject);
      
      // console.log("Update subject:", updatedSubject);
      toast.success("Subject updated successfully!", { id: loading });
      router.refresh();
    } catch (error) {
      toast.error("Failed to update subject", { id: loading });
      throw error;
    }
    finally{
      setIsEditDialogOpen(false);
      setEditingSubject(null);
      toast.dismiss(loading);
    }
  };

  const handleDelete = async (subjectId: string) => {

    const ok = await confirm({
      title: "Confirm Deletion",
      description: "Are you sure you want to delete this subject? This action cannot be undone.",
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
    })
    if(!ok) return;

    const loading = toast.loading("Deleting subject...");
    
    try {
      await deleteSubjectAction(subjectId);
      
      // console.log("Delete subject:", subjectId);
      toast.success("Subject deleted successfully", { id: loading });
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete subject", { id: loading });
      throw error;
    }
    finally{
      toast.dismiss(loading);
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
