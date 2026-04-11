"use client";

import { forgotPasswordAction } from "@/action/user.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.email("Please provide a valid email address"),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const showBackendMessage = (message?: string | null) =>
    message?.trim() || "Something went wrong. Please try again.";

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Sending reset link...");
      setFormError("");

      try {
        const redirectTo = `${window.location.origin}/reset-password`;
        const result = await forgotPasswordAction({
          email: value.email.trim().toLowerCase(),
          redirectTo,
        });

        if (result?.error) {
          const backendMessage = showBackendMessage(result?.message || result?.error?.message);
          setFormError(`Could not send reset link. ${backendMessage}`);
          toast.error(backendMessage, { id: loading });
          return;
        }

        toast.success(
          result?.message ||
            "If the email exists, a password reset link has been sent. Please check your inbox and spam folder.",
          { id: loading },
        );
        router.push(`/login?passwordReset=sent&email=${encodeURIComponent(value.email.toLowerCase())}`);
      } catch (error) {
        setFormError("Could not send reset link. Please check the email and try again.");
        toast.error("Could not send reset link. Please check the email and try again.", { id: loading });
        console.error("Forgot password error:", error);
      } finally {
        toast.dismiss(loading);
      }
    },
  });

  return (
    <Card className="border-border/40 bg-base-100/95 shadow-xl backdrop-blur">
      <CardHeader>
        <CardTitle>Forgot password</CardTitle>
        <CardDescription>
          Enter your email and we’ll send a secure password reset link if the account exists.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="forgot-password-form"
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" form="forgot-password-form" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send reset link"}
            </Button>
          )}
        </form.Subscribe>
        <p className="text-xs text-muted-foreground">
          Remembered it? <Link href="/login" className="underline underline-offset-4">Back to login</Link>
        </p>
      </CardFooter>
    </Card>
  );
}