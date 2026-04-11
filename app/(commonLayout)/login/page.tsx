import Image from "next/image";

import { LoginForm } from "@/components/modules/authentication/Login-form";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ passwordReset?: string; email?: string; resetStatus?: string }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const resetRequested = resolvedSearchParams.passwordReset === "sent";
  const resetCompleted = resolvedSearchParams.passwordReset === "done";
  const resetInvalid = resolvedSearchParams.resetStatus === "invalid";
  const resetExpired = resolvedSearchParams.resetStatus === "expired";
  const resetMissing = resolvedSearchParams.resetStatus === "missing";
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
            {(resetRequested || resetCompleted || resetInvalid || resetExpired || resetMissing) && (
              <div className="mb-4 rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm text-primary shadow-sm">
                {resetRequested ? (
                  <>
                    Reset link sent. Check your email and use the link to set a new password.
                    {resolvedSearchParams.email ? (
                      <span className="block mt-1 text-primary/80">Email: {resolvedSearchParams.email}</span>
                    ) : null}
                  </>
                ) : resetCompleted ? (
                  <>
                    Password updated successfully. You can now log in with your new password.
                  </>
                ) : resetExpired ? (
                  <>
                    This password reset link has expired. Please request a new one.
                  </>
                ) : resetMissing ? (
                  <>
                    The reset link is incomplete or missing a token. Please request a new password reset link.
                  </>
                ) : (
                  <>
                    This password reset link is invalid. Please request a new one.
                  </>
                )}
                <div className="mt-2">
                  <Link href="/forgot-password" className="underline underline-offset-4">
                    Request new reset link
                  </Link>
                </div>
              </div>
            )}
            <LoginForm className="border-border/40 bg-base-100/95 shadow-xl backdrop-blur" />
          </div>
        </div>
      </div>
    </section>
  );
}
