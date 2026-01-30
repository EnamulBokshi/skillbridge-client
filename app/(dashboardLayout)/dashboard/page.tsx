// app/(dashboardLayout)/page.tsx
"use server"

import AdminDashboard from "@/components/layout/AdminDashboard";
import StudentDashboard from "@/components/layout/StudentDashboard";
import TutorDashboard from "@/components/layout/TutorDashboard";
import { USER_ROLES } from "@/constants";
import { userServices } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { data, error } = await userServices.getSession();
  const user = data?.user;

  if (error || !user) {
    redirect("/login");
  }

  // Role-based rendering
  switch (user.role) {
    case USER_ROLES.ADMIN:
      return <AdminDashboard user={user} />;
    case USER_ROLES.STUDENT:
      return <StudentDashboard user={user} />;
    case USER_ROLES.TUTOR:
      return <TutorDashboard user={user} />;
    default:
      return <div>Invalid role</div>;
  }
}