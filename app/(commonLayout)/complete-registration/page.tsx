import { getUserSession } from '@/action/user.action'
import CompleteRegistrationLayout from '@/components/layout/CompleteRegistrationLayout'
import {  redirect} from 'next/navigation';

export default async function CompleteRegistrationPage() {
  const {data, error} = await getUserSession();
 
  if (error || !data?.user) {
      redirect('/login')
  } 
  return (
    <div className='max-w-3xl mx-auto '>
        <CompleteRegistrationLayout />
    </div>
  )
}
