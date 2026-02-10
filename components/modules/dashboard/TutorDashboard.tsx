import { getTutorDashboardStatsAction } from "@/action/tutor.action"
import { UserProfileType } from "@/types";

export default async function TutorDashboard({profile}:{profile:UserProfileType}) {
  console.log("Tutor profile in dashboard:", profile);
  if(!profile.tutorProfile){
    return <div>Loading...</div>
  }
  const {data:dashboard, error:dashboardError, message} =  await getTutorDashboardStatsAction(profile.tutorProfile?.id as string);
  console.log("dashboard data",{dashboard, dashboardError, message})
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Tutor Dashboard, {profile.name}!</h1>
    </div>
  )
}
