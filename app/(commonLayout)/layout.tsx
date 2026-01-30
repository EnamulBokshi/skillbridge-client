import { getUserSession } from '@/action/user.action'
import { Navbar } from '@/components/layout/Navbar'
import React from 'react'

export default async function CommonLayout({children}:{children:React.ReactNode}) {
  const {data, error} = await getUserSession();
  const user = data?.user;
//   console.log(user);
  const isLoggedIn = user??false;
  const isAssociate = user?.isAssociate??false;
  
    return (
    <div>
        <Navbar isLoggedIn = {isLoggedIn} isAssociate = {isAssociate}/>
        {children}
    </div>
  )
}
