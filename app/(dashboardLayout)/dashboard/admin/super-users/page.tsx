"use client"

import { useEffect, useState } from 'react';
import UserManagementTable from '@/components/modules/admin/UserManagementTable';
import { authClient } from '@/lib/auth-client';

export default function SuperAdminUsersPage() {
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user?.id) {
          setCurrentUserId(data.user.id);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage all users in your system. As a Super Admin, you can view, ban, unban, 
          and delete user accounts.
        </p>
      </div>

      <UserManagementTable currentUserId={currentUserId} />
    </div>
  );
}
