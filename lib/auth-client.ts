import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

const BACKEND_URL = env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000";

export const authClient = createAuthClient({

 fetchOptions: {
    credentials: "include",
  },
  baseURL: BACKEND_URL,
});
