import { LoginForm } from '@/components/modules/authentication/Login-form'


export default function LoginPage() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-base-200'>
        <div className='w-full max-w-md p-6 backdrop-blur-md transition bg-transparent rounded-lg shadow-md'>
            <LoginForm className='backdrop-blur-md bg-transparent'/>
        </div>
    </div>
  )
}
