/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getAllAdminsAction, deleteAdminAction } from '@/action/admin.action';
import { AdminUser } from '@/types/admin.type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AdminCreateModal from './AdminCreateModal';
import AdminEditModal from './AdminEditModal';
import AdminDeleteConfirmModal from './AdminDeleteConfirmModal';

interface AdminManagementTableProps {
  currentUserId: string;
}

export default function AdminManagementTable({ currentUserId }: AdminManagementTableProps) {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<AdminUser | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch admins
  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllAdminsAction(page, limit);
      
      if (response.data?.data) {
        // Filter admins by search query on client side for now
        let filtered = response.data.data;
        if (debouncedSearch) {
          filtered = filtered.filter(admin =>
            admin.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            admin.name.toLowerCase().includes(debouncedSearch.toLowerCase())
          );
        }
        // Transform dates to strings to match AdminUser type
        const transformedAdmins: AdminUser[] = filtered.map(admin => ({
          ...admin,
          createdAt: typeof admin.createdAt === 'string' ? admin.createdAt : admin.createdAt.toISOString(),
          updatedAt: typeof admin.updatedAt === 'string' ? admin.updatedAt : admin.updatedAt.toISOString(),
        }));
        setAdmins(transformedAdmins);
        setTotalPages(response.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleEdit = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setShowEditModal(true);
  };

  const handleDeleteClick = (admin: AdminUser) => {
    setDeletingAdmin(admin);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingAdmin) return;

    try {
      const result = await deleteAdminAction(deletingAdmin.id);
      
      if (result.error) {
        toast.error(result.message || "Failed to delete admin");
      } else {
        toast.success("Admin deleted successfully");
        setShowDeleteModal(false);
        setDeletingAdmin(null);
        fetchAdmins();
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error("Failed to delete admin");
    }
  };

  return (
    <div className="space-y-4">
      {/* Glassmorphism Header with Search and Create Button */}
      <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg p-4 shadow-lg">
        <div className="flex gap-3 flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="backdrop-blur-sm bg-white/50 border-white/30"
            />
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Admin
          </Button>
        </div>
      </div>

      {/* Glassmorphism Table Container */}
      <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading admins...</p>
          </div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No admins found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <span className="capitalize px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {admin.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`capitalize px-2 py-1 rounded text-sm ${
                      admin.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(admin.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(admin)}
                        className="gap-1"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(admin)}
                        disabled={admin.id === currentUserId}
                        className="gap-1"
                        title={admin.id === currentUserId ? "Cannot delete yourself" : ""}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Modals */}
      <AdminCreateModal 
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={fetchAdmins}
      />
      
      {editingAdmin && (
        <AdminEditModal 
          open={showEditModal}
          onOpenChange={setShowEditModal}
          admin={editingAdmin}
          onSuccess={fetchAdmins}
        />
      )}
      
      {deletingAdmin && (
        <AdminDeleteConfirmModal 
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          admin={deletingAdmin}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
