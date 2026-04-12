"use client"

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { updateAdminAction } from '@/action/admin.action';
import { AdminUser } from '@/types/admin.type';

interface AdminEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: AdminUser;
  onSuccess: () => void;
}

export default function AdminEditModal({
  open,
  onOpenChange,
  admin,
  onSuccess,
}: AdminEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: '',
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        status: admin.status,
      });
    }
  }, [admin, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.status) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const result = await updateAdminAction(admin.id, {
        name: formData.name,
        email: formData.email,
        status: formData.status,
      });

      if (result.error) {
        toast.error(result.message || "Failed to update admin");
      } else {
        toast.success("Admin updated successfully");
        onOpenChange(false);
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      toast.error("Failed to update admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="backdrop-blur-sm bg-white/95 border border-white/20">
        <DialogHeader>
          <DialogTitle>Edit Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              placeholder="Admin name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger id="edit-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Admin"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
