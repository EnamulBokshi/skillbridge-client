import { getUserSession } from '@/action/user.action'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import React from 'react'

export const dynamic = 'force-dynamic';

export default async function CommonLayout({children}:{children:React.ReactNode}) {
  const {data, error} = await getUserSession();
  const user = data?.user;
//   console.log(user);
  const isLoggedIn = user??false;
  const isAssociate = user?.isAssociate??false;
  
  
    return (
    <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn = {isLoggedIn} isAssociate = {isAssociate}/>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
    </div>
  )
}
