import { getUserSession } from '@/action/user.action';
import { USER_ROLES } from '@/constants';
import { GUEST_SESSION_COOKIE } from '@/helper/guest-session';
import { GuestAccessNotice } from '@/components/modules/dashboard/GuestAccessNotice';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic';

export default async function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isGuestMode = cookieStore.get(GUEST_SESSION_COOKIE)?.value === 'true';
    const {data, error} = await getUserSession();
  if (isGuestMode && !data?.user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Area</h1>
          <p className="text-muted-foreground">
            Guest users can preview the dashboard, but real student actions are locked.
          </p>
        </div>
        <GuestAccessNotice
          title="Student actions are locked"
          description="To book sessions, edit your profile, or use the AI assistant for real, create a student account first."
        />
      </div>
    )
  }
  if (error || !data?.user || data.user.role !== USER_ROLES.STUDENT) {
        redirect('/login')
    }
  return (
    <div>Student {children}</div>
  )
}
