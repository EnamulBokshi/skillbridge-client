import { getAllUserAction } from '@/action/admin.action';
import UserFilterController from '@/components/modules/users/UserFIlterController';
import UserList from '@/components/modules/users/UserList';
import { PaginationController } from '@/components/ui/pagination-controller';
import { UserFilterParams } from '@/types/user.type';



export interface UserPageProps {
  searchParams: Promise<UserFilterParams>
}

export default async function UserPage({searchParams}:UserPageProps) {
  const params = await searchParams;
  const {search, role, status} = params;
  const {data, error} = await getAllUserAction({search, role, status});
  // console.log("All users data:", data, error);
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>All Users</h1>
      <div className='w-full bg-white  dark:bg-background rounded-lg shadow-md p-6'>
        <UserFilterController />
        {data && <UserList users={data.data} />}
        {!data && <p className='text-gray-500'>No users found.</p>}
        <PaginationController pagination={data?.pagination || { page: 1, totalPages: 1, totalRecords: 0 }} />
      </div>

    </div>
  )
}
