import { logOutUserAction } from "@/action/user.action";
import { clearGuestSession } from "@/helper/guest-session";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
const logoutUser = async () => {

  try {
   
    const loading = toast.loading("Logging out...");
    await Promise.allSettled([authClient.signOut(), logOutUserAction()]);
    clearGuestSession();
    toast.success("Logged out successfully!", { id: loading });
    toast.dismiss(loading);
    // Optionally, you can refresh the page or redirect the user after logout
    window.location.assign("/");
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("Logout failed. Please try again.");
  }
};

export default logoutUser;
