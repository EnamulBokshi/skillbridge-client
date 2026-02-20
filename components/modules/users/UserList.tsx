"use client";

import { IUser } from "@/types/user.type";
import { UserCard } from "./UserCard";
import React from "react";
import { Button } from "@/components/ui/button";
import EditUserForm from "./EditUserForm";
import { toast } from "sonner";
import { updateUserAction } from "@/action/admin.action";
import { useConfirm } from "../common/ConfirmDialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

export default function UserList({ users }: { users: IUser[] }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<IUser | null>(null);
  const { confirm } = useConfirm();

  const onClose = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleAction = async (
    userId: string,
    status: "ACTIVE" | "BANNED" | "INACTIVE",
    actionText: string
  ) => {
    const ok = await confirm({
      title: `${actionText} User`,
      description: `Are you sure you want to ${actionText.toLowerCase()} this user?`,
      confirmText: actionText,
    });

    if (!ok) return;

    const loadingToast = toast.loading(`${actionText} user...`);

    const { error, message } = await updateUserAction(userId, {
      status,
    });

    toast.dismiss(loadingToast);

    if (error) {
      toast.error(message || `Failed to ${actionText.toLowerCase()} user`);
      return;
    }

    toast.success(message || `User ${actionText.toLowerCase()} successfully`);
    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => {
              setEditingUser(user);
              setIsEditing(true);
            }}
            onDelete={(id) => handleAction(id, "INACTIVE", "Delete")}
            onBan={(id) => handleAction(id, "BANNED", "Ban")}
            onUnban={(id) => handleAction(id, "ACTIVE", "Unban")}
          />
        ))}
      </div>

      {/* Proper Center Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information below.
            </DialogDescription>
          </DialogHeader>

          {editingUser && (
            <EditUserForm
              initialValues={editingUser}
              role={editingUser.role}
              userId={editingUser.id}
              onClose={onClose}
            />
          )}

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}