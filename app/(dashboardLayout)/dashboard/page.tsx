// app/(dashboardLayout)/page.tsx

import { Loading } from "@/components/common/Loading";
import AdminDashboard from "@/components/modules/dashboard/AdminDashboard";
import StudentDashboard from "@/components/modules/dashboard/StudentDashboard";
import TutorDashboard from "@/components/modules/dashboard/TutorDashboard";
import GuestDashboard from "@/components/modules/dashboard/GuestDashboard";
import { USER_ROLES } from "@/constants";
import { GUEST_SESSION_COOKIE } from "@/helper/guest-session";
import { userServices } from "@/services/user.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const isGuestMode = cookieStore.get(GUEST_SESSION_COOKIE)?.value === "true";
  const { data:userData, error } = await userServices.getSession();
  // const session = await authClient.getSession();
  const user = userData?.user;
  // const user = userData?.user;
  console.log("User in DashboardPage:", user);
  if (!user && isGuestMode) {
    return <GuestDashboard />;
  }
  if(!user){
    redirect("/login");
  }
  const {data:profile} = await userServices.getUser(user.id)
 console.log("Profile in DashboardPage:", profile);
  if (error || !user || !profile) {
    redirect("/login");
  }


  // Role-based rendering
  switch (profile.role) {
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