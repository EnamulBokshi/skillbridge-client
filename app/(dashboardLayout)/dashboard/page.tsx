// app/(dashboardLayout)/page.tsx
"use server"

import { Loading } from "@/components/common/Loading";
import AdminDashboard from "@/components/modules/dashboard/AdminDashboard";
import StudentDashboard from "@/components/modules/dashboard/StudentDashboard";
import TutorDashboard from "@/components/modules/dashboard/TutorDashboard";
import { USER_ROLES } from "@/constants";
import { userServices } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { data:userData, error } = await userServices.getSession();
  const user = userData?.user;
  if(!user){
    return <Loading />
  }
  const {data:profile} = await userServices.getUser(user.id)
 
  // console.log(profile)
  if (error || !user || !profile) {
    redirect("/login");
  }


  // Role-based rendering
  switch (user.role) {
    case USER_ROLES.ADMIN:
      return <AdminDashboard profile={profile} />;
    case USER_ROLES.STUDENT:
      return <StudentDashboard profile={profile} />;
    case USER_ROLES.TUTOR:
      return <TutorDashboard profile={profile} />;
    default:
      return <div>Invalid role</div>;
  }
}