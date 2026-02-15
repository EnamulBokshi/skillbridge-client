import { getUserSession } from '@/action/user.action';
import { USER_ROLES } from '@/constants';
import { redirect } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic';

export default async function AdminLayout({children}:{children:React.ReactNode} ) {
    const {data, error} = await getUserSession();
    const userRole = data?.user?.role;
    if(userRole !== USER_ROLES.ADMIN){
        redirect('/login')
    }
  return (
    <div>
      
      {/* <div className='py-1 shadow border-2 border-white/50 '></div> */}

      <div className='mt-5'>
        {children}
      </div>
    </div>
  )
}
