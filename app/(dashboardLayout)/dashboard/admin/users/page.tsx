import { getAllUserAction } from '@/action/admin.action';
import React from 'react'

export default async function UserPage() {
  const {data, error} = await getAllUserAction();
  // console.log("All users data:", data, error);
  return (
    <div>UserPage</div>
  )
}
