import Image from "next/image";

import { LoginForm } from "@/components/modules/authentication/Login-form";

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-base-200">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <Image
            src="/hero_section_primary.png"
            alt="Students learning together"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-base-300/85 via-primary/45 to-transparent" />
          <div className="absolute bottom-12 left-10 right-10 rounded-xl border border-base-100/20 bg-base-100/10 p-6 text-base-100 backdrop-blur-sm">
            <p className="text-sm font-medium text-base-100/85">SkillBridge</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight">
              Welcome back to your learning flow.
            </h2>
            <p className="mt-3 text-sm text-base-100/80">
              Continue sessions, manage bookings, and stay connected with your tutors.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md">
            <LoginForm className="border-border/40 bg-base-100/95 shadow-xl backdrop-blur" />
          </div>
        </div>
      </div>
    </section>
  );
}
