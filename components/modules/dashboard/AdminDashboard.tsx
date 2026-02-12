import { getAllUserAction, getDashboardStatsAction } from '@/action/admin.action'
import { AdminStatsCards } from '@/components/layout/AdminStatsCard';
import { BookingsStatusChart } from '@/components/layout/BookingStatusChart';
import { RevenueChart } from '@/components/layout/RevinueChart';

export default async function AdminDashboard({profile}:{profile:any}) {
  // const {data, error, message} = await getAllUserAction();

const {data: stats, error, message} = await getDashboardStatsAction();
// console.log("Dashboard stats data:", stats, error, message);
  // console.log("All users data:", data, error, message);
  return (
   <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview and key metrics
        </p>
      </div>

      <AdminStatsCards stats={stats? stats : {users: {total: 0, active: 0, banned: 0}, bookings: {total: 0, completed: 0, cancelled: 0, pending: 0, recent: 0}, revenue: {total: 0, lastThirtyDays: 0}, slots: {total: 0, booked: 0, free: 0, available: 0}, reviews: {total: 0, averageRating: 0}}} />

      <div className="grid gap-6 md:grid-cols-2">
        <BookingsStatusChart stats={stats? stats : {users: {total: 0, active: 0, banned: 0}, bookings: {total: 0, completed: 0, cancelled: 0, pending: 0, recent: 0}, revenue: {total: 0, lastThirtyDays: 0}, slots: {total: 0, booked: 0, free: 0, available: 0}, reviews: {total: 0, averageRating: 0}}} />
        <RevenueChart />
      </div>
    </div>
  )
}



