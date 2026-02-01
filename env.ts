import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod"
export const env = createEnv({
    server: {
        API_URL: z.url(),
        AUTH_URL: z.url(),
    },
    client:{
        NEXT_PUBLIC_AUTH_URL: z.url(),
        NEXT_PUBLIC_API_URL: z.url(),
        NEXT_PUBLIC_APP_URL: z.url()
    },
    runtimeEnv: {
        API_URL: process.env.API_URL,
        AUTH_URL: process.env.AUTH_URL,
        NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
    }
})