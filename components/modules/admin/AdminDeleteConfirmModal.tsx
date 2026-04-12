"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AdminUser } from '@/types/admin.type';

interface AdminDeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: AdminUser;
  onConfirm: () => void;
}

export default function AdminDeleteConfirmModal({
  open,
  onOpenChange,
  admin,
  onConfirm,
}: AdminDeleteConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="backdrop-blur-sm bg-white/95 border border-white/20">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Admin</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{admin.name}</strong> ({admin.email})? 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex gap-3 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
