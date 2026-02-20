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
import { IconBrandGoogle } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { env } from "@/env";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "At least 8 character required!!"),
});
export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  
  const router = useRouter();
  
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: 'https://skillbridge-client-dusky.vercel.app',
    });
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
     
        try {
          const { data, error } = await authClient.signIn.email(value);
          
  
          if (error) {
            toast.error(error.message, { id: loading });
            return;
          }
  
          toast.success("Login successful!!", { id: loading });
          router.refresh();
          router.push("/");
        } catch (error) {
          toast.error("An unexpected error occurred during login.", { id: loading });
          console.error("Login error:", error);
        }
        finally{
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
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
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
                      onChange={(e) => field.handleChange(e.target.value)}
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
                      onChange={(e) => field.handleChange(e.target.value)}
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
        <Button type="submit" form="signup-form" className="w-full">
          Login
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => handleGoogleLogin()}
          className="w-full mt-3"
        >
          {" "}
          Continue with Google <IconBrandGoogle className="inlin" />
        </Button>
      </CardFooter>
    </Card>
  );
}
