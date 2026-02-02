import { getUserSession } from '@/action/user.action'
import { USER_ROLES } from '@/constants';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function TutorDashboardLayout({ children }: { children: React.ReactNode }) {
    const {data, error} = await getUserSession();
    if (error || !data?.user || data.user.role != USER_ROLES.TUTOR) {
        redirect('/login')
    }
  return (
    <div>Tutor {children}</div>
  )
}
