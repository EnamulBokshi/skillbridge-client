
import { getUserSession, healthCheck } from '@/action/user.action';
import React from 'react'

export default async function Home() {
// const session = await getUserSession();
// console.log(session)
// // const res = await healthCheck();
// // console.log(res)
  return (
    <div>
      <h1>Welcome to SkillBridge</h1>
      <h1>Todo List</h1>
      <ul className='list-disc ml-5 shadow-lg p-5'>

        <li>
          Implement User Authentication (Sign Up, Log In, Log Out) : Completed
        </li>
        <li>
          Create a dashboard for admin and users and implement role-based access control 
        </li>
        <li>Work on category creation and subject creation by admin</li>
        <li> Complete tutor profile creation as it has to show the categories on the profile</li>
        <></>
      </ul>
    </div>
  )
}
