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
import { IUser } from '@/types/user.type';

interface UserDeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser;
  onConfirm: () => void;
}

export default function UserDeleteConfirmModal({
  open,
  onOpenChange,
  user,
  onConfirm,
}: UserDeleteConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="backdrop-blur-sm bg-white/95 border border-white/20">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{user.name}</strong> ({user.email})? 
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
