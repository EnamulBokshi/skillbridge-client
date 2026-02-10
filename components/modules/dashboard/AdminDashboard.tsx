import { getAllUserAction } from '@/action/admin.action'

export default async function AdminDashboard({profile}:{profile:any}) {
  const {data, error, message} = await getAllUserAction();
  
  console.log("All users data:", data, error, message);
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Admin Dashboard, {profile.name}!</h1>
    </div>
  )
}
