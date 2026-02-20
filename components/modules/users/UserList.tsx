"use client";

import React from "react";
import { IUser } from "@/types/user.type";
import { UserCard } from "./UserCard";
import EditUserForm from "./EditUserForm";
import { toast } from "sonner";
import { updateUserAction } from "@/action/admin.action";
import { useConfirm } from "../common/ConfirmDialog";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

export default function UserList({ users }: { users: IUser[] }) {
  const { confirm } = useConfirm();

  const [userList, setUserList] = React.useState<IUser[]>(users);
  const [editingUser, setEditingUser] = React.useState<IUser | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const onClose = () => {
    setEditingUser(null);
    setIsEditing(false);
  };

  // Optimistic Update Helper
  const updateUserOptimistic = (userId: string, updates: Partial<IUser>) => {
    setUserList((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      )
    );
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

    const previousUsers = [...userList];

    // Optimistic Update
    updateUserOptimistic(userId, { status });

    setLoadingId(userId);
    const loadingToast = toast.loading(`${actionText} user...`);

    try {
      const { error, message } = await updateUserAction(userId, { status });

      toast.dismiss(loadingToast);

      if (error) {
        setUserList(previousUsers);
        toast.error(message || `Failed to ${actionText.toLowerCase()} user`);
        return;
      }

      toast.success(message || `User ${actionText.toLowerCase()} successfully`);
    } catch (err) {
      setUserList(previousUsers);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong");
    }

    setLoadingId(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userList.map((user) => (
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

      {/* Edit User Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
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
              // onSuccess={(updatedUser: IUser) => {
              //   updateUserOptimistic(updatedUser.id, updatedUser);
              //   toast.success("User updated successfully");
              //   onClose();
              // }}
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