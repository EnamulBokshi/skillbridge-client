import { getUserSession } from '@/action/user.action';
import { USER_ROLES } from '@/constants';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
    const {data, error} = await getUserSession();
    if (error || !data?.user || data.user.role !== USER_ROLES.STUDENT) {
        // toast.error('Please login to access the student dashboard');
        redirect('/login')
    }
  return (
    <div>Student {children}</div>
  )
}
