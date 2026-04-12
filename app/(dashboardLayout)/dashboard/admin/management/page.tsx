"use client"

import { useEffect, useState } from 'react';
import AdminManagementTable from '@/components/modules/admin/AdminManagementTable';
import { authClient } from '@/lib/auth-client';

export default function AdminManagementPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Admin Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage all administrators in your system. As a Super Admin, you can create, 
          edit, and delete admin accounts.
        </p>
      </div>

      <AdminManagementTable currentUserId={currentUserId} />
    </div>
  );
}
