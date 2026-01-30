import { AppSidebar } from '@/components/layout/AppSidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { USER_ROLES } from '@/constants';
import { authClient } from '@/lib/auth-client'
import { userServices } from '@/services/user.service';
import Link from 'next/link';
import React from 'react'

export default async function DashBoardLayout({
    children,
}:{
    children: React.ReactNode
}) {
    const {data, error} = await userServices.getSession();
    const user = data?.user;
    const userRole = user?.role;
    const isAssociate = user?.isAssociate;
    if(userRole !== USER_ROLES.ADMIN && !isAssociate){
        return (
            <div>
                <h1 className='text-center text-2xl font-bold mt-10'>Access Denied</h1>
                <p className='text-center mt-5'>You do not have permission to access this page.</p>
                <div className='text-sm text-center mt-2'>You may haven't verified your email or not completed you profile</div>
                <Button className='mt-5 mx-auto flex justify-center' variant={'outline'}>
                    <Link href={'/'}>Go Back</Link>
                </Button>
            </div>
        )
    }
    
  return (
     <SidebarProvider>
      <AppSidebar user={user}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
         {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
