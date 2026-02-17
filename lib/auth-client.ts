import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

// const BACKEND_URL = env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const authClient = createAuthClient({

 fetchOptions: {
    credentials: "include",
  },
baseURL: process.env.NEXT_PUBLIC_APP_URL + "/api/auth"
});
