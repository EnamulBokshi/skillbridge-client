"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";
import { clearGuestSession, setGuestSession } from "@/helper/guest-session";
import { resendVerificationOtpAction } from "@/action/user.action";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "At least 8 character required!!"),
});
export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGuestLogin = () => {
    clearGuestSession();
    setGuestSession();
    toast.success("Guest demo mode enabled.");
    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setFormError("");
    setUnverifiedEmail("");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/dashboard`,
      });
    } catch (error) {
      console.error("Google login error:", error);
      setFormError("Google login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleVerifyEmailClick = async () => {
    if (!unverifiedEmail) return;

    const loading = toast.loading("Sending a fresh OTP to your email...");
    setIsResendingOtp(true);

    try {
      const result = await resendVerificationOtpAction({ email: unverifiedEmail });

      if (result?.error) {
        toast.error(result?.message || result?.error?.message || "Failed to send OTP.", {
          id: loading,
        });
        return;
      }

      toast.success(result?.message || "A new OTP has been sent to your email.", {
        id: loading,
      });
      router.push(`/verify-email?email=${encodeURIComponent(unverifiedEmail)}`);
    } catch (error) {
      console.error("Resend verification OTP from login failed:", error);
      toast.error("Failed to send OTP. Please try again.", { id: loading });
    } finally {
      toast.dismiss(loading);
      setIsResendingOtp(false);
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Please wait, signing in...");
      setFormError("");
      setUnverifiedEmail("");

      try {
        const { error } = await authClient.signIn.email(value);

        if (error) {
          const normalizedEmail = value.email.trim().toLowerCase();
          const errorMessage = error.message || "Unable to login. Please try again.";
          if (/email\s+not\s+verified/i.test(errorMessage)) {
            setFormError("Your email is not verified. Verify your email to continue.");
            setUnverifiedEmail(normalizedEmail);
            return;
          }

          setFormError(errorMessage);
          return;
        }

        const sessionResult = await authClient.getSession();
        const isVerified = Boolean(sessionResult?.data?.user?.emailVerified);

        clearGuestSession();
        if (!isVerified) {
          toast.success("Login successful. Please verify your email.", { id: loading });
          router.push(`/verify-email?email=${encodeURIComponent(value.email.toLowerCase())}`);
          return;
        }

        toast.success("Login successful!!", { id: loading });
        window.location.href = "/";
      } catch (error) {
        setFormError("An unexpected error occurred during login.");
        console.error("Login error:", error);
      } finally {
        toast.dismiss(loading);
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login to your SkillBridge account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {formError && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {formError}
              </p>
            )}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        if (formError) setFormError("");
                        if (unverifiedEmail) setUnverifiedEmail("");
                        field.handleChange(e.target.value);
                      }}
                      placeholder="Email Address"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        if (formError) setFormError("");
                        field.handleChange(e.target.value);
                      }}
                      placeholder="Password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <>
              {!!unverifiedEmail && (
                <div className="mb-3 space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleVerifyEmailClick}
                    disabled={isSubmitting || isGoogleLoading || isResendingOtp}
                  >
                    {isResendingOtp ? "Sending OTP..." : "Verify Email"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    We will send a fresh OTP first, then take you to email verification.
                  </p>
                </div>
              )}
              <Button
                type="submit"
                form="login-form"
                className="w-full"
                disabled={isSubmitting || isGoogleLoading || isResendingOtp}
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleGoogleLogin()}
                className="mt-3 w-full"
                disabled={isSubmitting || isGoogleLoading || isResendingOtp}
              >
                {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
                {!isGoogleLoading && <IconBrandGoogle className="inline" />}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handleGuestLogin}
                className="mt-3 w-full"
                disabled={isSubmitting || isGoogleLoading || isResendingOtp}
              >
                Continue as Guest
              </Button>
              <div className="mt-4 text-sm text-muted-foreground">
                <Link href="/forgot-password" className="underline underline-offset-4 hover:text-foreground">
                  Forgot password?
                </Link>
              </div>
            </>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  );
}
