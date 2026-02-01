import { getUserSession } from '@/action/user.action'
import CompleteRegistrationLayout from '@/components/layout/CompleteRegistrationLayout'
import {  redirect} from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CompleteRegistrationPage() {
  const {data, error} = await getUserSession();
 
  if (error || !data?.user) {
      redirect('/login')
  } 
  if(data.user.isAssociate){
    redirect('/');
  }
  return (
    <div className='max-w-3xl mx-auto '>
        <CompleteRegistrationLayout />
    </div>
  )
}
