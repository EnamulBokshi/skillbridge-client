"use client";

import { resendVerificationOtpAction, verifyEmailOtpAction } from "@/action/user.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const VERIFY_COOLDOWN_SECONDS = 60;

const formSchema = z.object({
  email: z.email("Please provide a valid email address"),
  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export default function VerifyEmailOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = useMemo(() => searchParams.get("email") ?? "", [searchParams]);

  const [formError, setFormError] = useState("");
  const [cooldown, setCooldown] = useState(VERIFY_COOLDOWN_SECONDS);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const form = useForm({
    defaultValues: {
      email: initialEmail,
      otp: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Verifying OTP...");
      setFormError("");

      try {
        const result = await verifyEmailOtpAction(value);
        if (result?.error) {
          setFormError(result?.message || result?.error?.message || "OTP verification failed.");
          toast.error(result?.message || "OTP verification failed.", { id: loading });
          return;
        }

        toast.success(result?.message || "Email verified successfully!", { id: loading });
        router.push("/complete-registration");
      } catch (error) {
        setFormError("An unexpected error occurred while verifying OTP.");
        toast.error("An unexpected error occurred while verifying OTP.", { id: loading });
        console.error("Verify OTP error:", error);
      } finally {
        toast.dismiss(loading);
      }
    },
  });

  const handleResend = async () => {
    const email = form.state.values.email?.trim().toLowerCase();
    if (!email) {
      setFormError("Email is required before resending OTP.");
      return;
    }

    const loading = toast.loading("Resending OTP...");
    try {
      const result = await resendVerificationOtpAction({ email });
      if (result?.error) {
        setFormError(result?.message || result?.error?.message || "Failed to resend OTP.");
        toast.error(result?.message || "Failed to resend OTP.", { id: loading });
        return;
      }

      setCooldown(VERIFY_COOLDOWN_SECONDS);
      toast.success(result?.message || "OTP sent again. Please check your email.", { id: loading });
    } catch (error) {
      setFormError("An unexpected error occurred while resending OTP.");
      toast.error("An unexpected error occurred while resending OTP.", { id: loading });
      console.error("Resend OTP error:", error);
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <Card className="border-border/40 bg-base-100/95 shadow-xl backdrop-blur">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the 6-digit OTP we sent to your email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="verify-otp-form"
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
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
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
                        field.handleChange(e.target.value);
                      }}
                      placeholder="you@example.com"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="otp"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>OTP</FieldLabel>
                    <InputOTP
                      id={field.name}
                      name={field.name}
                      maxLength={6}
                      pattern={"^\\d+$"}
                      value={field.state.value}
                      onChange={(value) => {
                        if (formError) setFormError("");
                        const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
                        field.handleChange(digitsOnly);
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              form="verify-otp-form"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>
          )}
        </form.Subscribe>

        {cooldown > 0 ? (
          <p className="text-sm text-muted-foreground">
            You can resend OTP in <span className="font-semibold">{cooldown}s</span>
          </p>
        ) : (
          <Button variant="outline" type="button" className="w-full" onClick={handleResend}>
            Resend OTP
          </Button>
        )}

        <p className="text-xs text-muted-foreground">
          Already verified? <Link href="/login" className="underline underline-offset-4">Login</Link>
        </p>
      </CardFooter>
    </Card>
  );
}