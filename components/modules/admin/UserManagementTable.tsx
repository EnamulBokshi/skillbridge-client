/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState, useCallback } from 'react';
import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Ban, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { 
  getAllUsersAction, 
  deleteUserAction, 
  banUserAction, 
  unbanUserAction 
} from '@/action/admin.action';
import { IUser } from '@/types/user.type';
import { ColumnDef } from '@tanstack/react-table';
import UserDeleteConfirmModal from './UserDeleteConfirmModal';

interface UserManagementTableProps {
  currentUserId: string;
}

export default function UserManagementTable({ currentUserId }: UserManagementTableProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllUsersAction({
        page,
        limit,
        search: debouncedSearch,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
      });
      
      if (response.data?.data) {
        setUsers(response.data.data);
        setTotalPages(response.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, roleFilter, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteClick = (user: IUser) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;

    try {
      const result = await deleteUserAction(deletingUser.id);
      
      if (result.error) {
        toast.error(result.message || "Failed to delete user");
      } else {
        toast.success("User deleted successfully");
        setShowDeleteModal(false);
        setDeletingUser(null);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleBan = async (user: IUser) => {
    try {
      const result = await banUserAction(user.id);
      
      if (result.error) {
        toast.error(result.message || "Failed to ban user");
      } else {
        toast.success("User banned successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error banning user:", error);
      toast.error("Failed to ban user");
    }
  };

  const handleUnban = async (user: IUser) => {
    try {
      const result = await unbanUserAction(user.id);
      
      if (result.error) {
        toast.error(result.message || "Failed to unban user");
      } else {
        toast.success("User unbanned successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error unbanning user:", error);
      toast.error("Failed to unban user");
    }
  };

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span className="capitalize px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
          {row.getValue("role")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span className={`capitalize px-2 py-1 rounded text-sm ${
            status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => new Date(row.getValue("createdAt") as string).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        const isBanned = user.status === 'banned';
        
        return (
          <div className="flex gap-2 flex-wrap">
            {isBanned ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnban(user)}
                className="gap-1"
              >
                <CheckCircle className="w-4 h-4" />
                Unban
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBan(user)}
                className="gap-1 text-orange-600 hover:text-orange-700"
              >
                <Ban className="w-4 h-4" />
                Ban
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteClick(user)}
              className="gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Glassmorphism Header with Search and Filters */}
      <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg p-4 shadow-lg">
        <div className="space-y-3">
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="backdrop-blur-sm bg-white/50 border-white/30"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 rounded-md border border-white/30 bg-white/50 backdrop-blur-sm text-sm"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="tutor">Tutor</option>
              <option value="student">Student</option>
              <option value="user">User</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 rounded-md border border-white/30 bg-white/50 backdrop-blur-sm text-sm"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Glassmorphism Table Container */}
      <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow-lg overflow-hidden">
        <DataTable 
          columns={columns} 
          data={users} 
          isLoading={loading}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <UserDeleteConfirmModal 
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          user={deletingUser}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
