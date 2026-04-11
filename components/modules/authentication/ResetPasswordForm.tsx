"use client";

import { resetPasswordAction } from "@/action/user.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  newPassword: z.string().min(8, "At least 8 character required!!"),
  confirmPassword: z.string().min(8, "At least 8 character required!!"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const [formError, setFormError] = useState("");

  const showBackendMessage = (message?: string | null) =>
    message?.trim() || "Something went wrong. Please try again.";

  const redirectToLoginWithResetStatus = (status: "invalid" | "expired" | "missing") => {
    router.push(`/login?resetStatus=${status}`);
  };

  const form = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      if (!token) {
        setFormError("Reset token is missing. Please open the password reset link from your email again.");
        redirectToLoginWithResetStatus("missing");
        return;
      }

      const loading = toast.loading("Resetting password...");
      setFormError("");
      try {
        const result = await resetPasswordAction({
          token,
          newPassword: value.newPassword,
          confirmPassword: value.confirmPassword,
        });

        if (result?.error) {
          const backendMessage = showBackendMessage(result?.message || result?.error?.message);
          setFormError(`Could not reset password. ${backendMessage}`);
          toast.error(backendMessage, { id: loading });

          const lowerMessage = backendMessage.toLowerCase();
          if (lowerMessage.includes("expired")) {
            redirectToLoginWithResetStatus("expired");
            return;
          }
          if (lowerMessage.includes("invalid") || lowerMessage.includes("token")) {
            redirectToLoginWithResetStatus("invalid");
            return;
          }

          return;
        }

        toast.success(
          result?.message ||
            "Password reset successfully. You can now log in with your new password.",
          { id: loading },
        );
        router.push("/login?passwordReset=done");
      } catch (error) {
        setFormError("Could not reset password. The reset link may be invalid or expired.");
        toast.error("Could not reset password. The reset link may be invalid or expired.", { id: loading });
        redirectToLoginWithResetStatus("expired");
        console.error("Reset password error:", error);
      } finally {
        toast.dismiss(loading);
      }
    },
  });

  return (
    <Card className="border-border/40 bg-base-100/95 shadow-xl backdrop-blur">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>
          Create a new password for your account using the reset link from your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="reset-password-form"
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

            <form.Field name="newPassword" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      if (formError) setFormError("");
                      field.handleChange(e.target.value);
                    }}
                    placeholder="New password"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }} />

            <form.Field name="confirmPassword" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      if (formError) setFormError("");
                      field.handleChange(e.target.value);
                    }}
                    placeholder="Confirm new password"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }} />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" form="reset-password-form" className="w-full" disabled={isSubmitting || !token}>
              {isSubmitting ? "Resetting..." : "Reset password"}
            </Button>
          )}
        </form.Subscribe>
        {!token && (
          <p className="text-xs text-destructive">
            Missing reset token. Open the password reset link from your email.
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          No token? <Link href="/login" className="underline underline-offset-4">Back to login</Link>
        </p>
      </CardFooter>
    </Card>
  );
}