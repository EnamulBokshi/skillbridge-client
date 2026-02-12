"use client"
import { IUser } from '@/types/user.type'
import { UserCard } from './UserCard'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import React from 'react'
import { Button } from '@/components/ui/button'
import EditUserForm from './EditUserForm'
import { toast } from 'sonner'
import { useConfirm } from '../common/ConfirmDialog'
import { updateUserAction } from '@/action/admin.action'


export default function UserList({users}: {users:IUser[]}) {

    const [isEditing, setIsEditing] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<IUser | null>(null);
       const {confirm} = useConfirm();
    const onClose = ()=> {
        setIsEditing(false);
        setEditingUser(null);
    }

    const onDelete = async (userId: string) => {
       

        const ok = confirm({
            title: "Delete User",
            description: "Are you sure you want to delete this user? This action cannot be undone.",
            confirmText: "Delete",
        })
        if(!ok) {
            return;
        }
        const reOk = confirm({
            title: "Confirm Deletion",
            description: "This is your last chance to cancel. Do you really want to delete this user?",
            confirmText: "Yes, Delete",
        })
        if(!reOk) {
            return;
        }
        const loadingToast = toast.loading("Deleting user...");
        const {data, error, message} = await updateUserAction(userId, {status: "INACTIVE"});
        if(!error) {
            toast.success(message || "User deleted successfully");
            onClose();
        }
        toast.error(message || "Failed to delete user. Please try again.");
        toast.dismiss(loadingToast);
        onClose();
        window.location.reload();
    }
    const onBan = async (userId: string) => {
       

        const ok = confirm({
            title: "Ban User",
            description: "Are you sure you want to ban this user? This action can be undone from the user details page.",
            confirmText: "Ban",
        })
        if(!ok) {
            return;
        }
        const reOk = confirm({
            title: "Confirm Ban",
            description: "Do you really want to ban this user?",
            confirmText: "Yes, Ban",
        })
        if(!reOk) {
            return;
        }
        const loadingToast = toast.loading("Banning user...");
        const {data, error, message} = await updateUserAction(userId, {status: "BANNED"});
        if(!error) {
            toast.success(message || "User banned successfully");
            onClose();
        }
        toast.error(message || "Failed to ban user. Please try again.");
        toast.dismiss(loadingToast);
        onClose();
        window.location.reload();
    }
    const onUnban = async (userId: string) => {
     

        const ok = confirm({
            title: "Unban User",
            description: "Are you sure you want to unban this user?",
            confirmText: "Unban",
        })
        if(!ok) {
            return;
        }
        const loadingToast = toast.loading("Unbanning user...");
        const {data, error, message} = await updateUserAction(userId, {status: "ACTIVE"});
        if(!error) {
            toast.success(message || "User unbanned successfully");
            onClose();
        }
        toast.error(message || "Failed to unban user. Please try again.");
        toast.dismiss(loadingToast);
        onClose();
        window.location.reload();
    }
  return (
    <div>
        <h2 className='text-xl font-semibold mb-4'>User List</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {users.map((user) => (
            <UserCard key={user.id} user={user} onEdit={() => { setEditingUser(user); setIsEditing(true); }} onDelete={onDelete} onBan={onBan} onUnban={onUnban}/>
        ))}
    </div>
    
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>

            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update the details of your user.
            </DialogDescription>
          </DialogHeader>

          {editingUser && (
            <div className="py-2">
               
              <EditUserForm
                initialValues={editingUser}
                role={editingUser.role}
                userId={editingUser.id}
                onClose={onClose}
              />
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    
  )
}
