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
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "https://skillbridge-client-dusky.vercel.app/dashboard",
      });
    } catch (error) {
      console.error("Google login error:", error);
      setFormError("Google login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
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

      try {
        const { error } = await authClient.signIn.email(value);

        if (error) {
          setFormError(error.message || "Unable to login. Please try again.");
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
              <Button
                type="submit"
                form="login-form"
                className="w-full"
                disabled={isSubmitting || isGoogleLoading}
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleGoogleLogin()}
                className="mt-3 w-full"
                disabled={isSubmitting || isGoogleLoading}
              >
                {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
                {!isGoogleLoading && <IconBrandGoogle className="inline" />}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handleGuestLogin}
                className="mt-3 w-full"
                disabled={isSubmitting || isGoogleLoading}
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
