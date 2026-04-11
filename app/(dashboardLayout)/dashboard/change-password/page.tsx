import ChangePasswordForm from "@/components/modules/authentication/ChangePasswordForm";
import { getUserSession } from "@/action/user.action";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ChangePasswordPage() {
  const { data, error } = await getUserSession();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Change Password</h1>
        <p className="text-muted-foreground">Update your account password securely.</p>
      </div>
      <ChangePasswordForm />
    </div>
  );
}