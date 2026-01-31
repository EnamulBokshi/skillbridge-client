import { logOutUserAction } from "@/action/user.action";
import { toast } from "sonner";

const logoutUser = async () => {
  try {
    const loading = toast.loading("Logging out...");
    await logOutUserAction();
    toast.success("Logged out successfully!");
    toast.dismiss(loading);
    // Optionally, you can refresh the page or redirect the user after logout
    window.location.href = "/";
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export default logoutUser;