"use client";

import { changePasswordAction } from "@/action/user.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  currentPassword: z.string().min(8, "At least 8 character required!!"),
  newPassword: z.string().min(8, "At least 8 character required!!"),
  confirmPassword: z.string().min(8, "At least 8 character required!!"),
  revokeOtherSessions: z.boolean(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ChangePasswordForm() {
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const showBackendMessage = (message?: string | null) =>
    message?.trim() || "Something went wrong. Please try again.";

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      revokeOtherSessions: true,
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Updating password...");
      setFormError("");

      try {
        const result = await changePasswordAction({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          confirmPassword: value.confirmPassword,
          revokeOtherSessions: value.revokeOtherSessions,
        });

        if (result?.error) {
          const backendMessage = showBackendMessage(result?.message || result?.error?.message);
          setFormError(`Could not change password. ${backendMessage}`);
          toast.error(backendMessage, { id: loading });
          return;
        }

        toast.success(
          result?.message ||
            "Password changed successfully. Please use your new password the next time you log in.",
          { id: loading },
        );
        router.push("/login");
      } catch (error) {
        setFormError("Could not change password. Your current password may be incorrect.");
        toast.error("Could not change password. Your current password may be incorrect.", { id: loading });
        console.error("Change password error:", error);
      } finally {
        toast.dismiss(loading);
      }
    },
  });

  return (
    <Card className="border-border/40 bg-base-100/95 shadow-xl backdrop-blur">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Change password</CardTitle>
            <CardDescription>
              Update your password from your account settings. Other sessions can be revoked automatically.
            </CardDescription>
          </div>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form
          id="change-password-form"
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

            <form.Field name="currentPassword" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                  <Input type="password" id={field.name} name={field.name} value={field.state.value} onChange={(e) => { if (formError) setFormError(""); field.handleChange(e.target.value); }} placeholder="Current password" />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }} />

            <form.Field name="newPassword" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                  <Input type="password" id={field.name} name={field.name} value={field.state.value} onChange={(e) => { if (formError) setFormError(""); field.handleChange(e.target.value); }} placeholder="New password" />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }} />

            <form.Field name="confirmPassword" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input type="password" id={field.name} name={field.name} value={field.state.value} onChange={(e) => { if (formError) setFormError(""); field.handleChange(e.target.value); }} placeholder="Confirm new password" />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }} />

            <form.Field name="revokeOtherSessions" children={(field) => (
              <Field>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FieldLabel htmlFor={field.name}>Revoke other sessions</FieldLabel>
                    <p className="text-xs text-muted-foreground">Sign out other devices after changing password.</p>
                  </div>
                  <Switch
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(checked)}
                  />
                </div>
              </Field>
            )} />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" form="change-password-form" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Change password"}
            </Button>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  );
}