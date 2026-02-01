import { getUserSession } from '@/action/user.action';
import { USER_ROLES } from '@/constants';
import { redirect } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({children}:{children:React.ReactNode} ) {
    const {data, error} = await getUserSession();
    const userRole = data?.user?.role;
    if(userRole !== USER_ROLES.ADMIN){
        toast.error('Access Denied: Admins Only');
        redirect('/')
    }
  return (
    <div>Admin {children}</div>
  )
}
