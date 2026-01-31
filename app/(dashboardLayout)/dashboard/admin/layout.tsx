import { getUserSession } from '@/action/user.action';
import { USER_ROLES } from '@/constants';
import { redirect } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export default async function AdminLayout({children}:{children:React.ReactNode} ) {
    const userSession = await getUserSession();
    const userRole = userSession?.data.user?.role;
    if(userRole !== USER_ROLES.ADMIN){
        toast.error('Access Denied: Admins Only');
        redirect('/')
    }
  return (
    <div>Admin {children}</div>
  )
}
