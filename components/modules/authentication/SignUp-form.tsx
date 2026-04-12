"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { IconBrandGoogle } from "@tabler/icons-react"
import {useForm} from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import * as z from "zod"
import { clearGuestSession, setGuestSession } from "@/helper/guest-session"

const formSchema = z.object({
  name: z.string().min(1,"This field is required"),
  email: z.email(),
  password: z.string().min(8, "At least 8 character required!!")
})
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [formError, setFormError] = useState("")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const handleGoogleLogin = async ()=> {
    console.log("Initiating Google sign-up...");
    setIsGoogleLoading(true)
    setFormError("")
    const loading = toast.loading("Redirecting to Google sign-up...");
    try {
      const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin
    });
    
    if(data) {
      toast.success("Google sign-up successful!!", {id: loading});
      router.refresh();
      router.push("/");
    }
    
      
    } catch (error) {
      console.log("Google sign-up error:", error);
      setFormError("Google sign-up failed. Please try again.")
    }
    finally{
      toast.dismiss(loading);
      setIsGoogleLoading(false)
    }
  };

  const handleGuestLogin = () => {
    clearGuestSession();
    setGuestSession();
    toast.success("Guest demo mode enabled.");
    router.push("/dashboard");
  };

  const form = useForm({
    defaultValues:{
      name: "",
      email: "",
      password: ""
    },
    validators:{
      onSubmit: formSchema,
    },
    onSubmit: async({value} )=>{
      const loading = toast.loading("Please wait")
      setFormError("")
      
       try {
         const {error} = await authClient.signUp.email(value)

        if(error){
          setFormError(error.message || "Failed to create account. Please try again.")
          return;
        }
        clearGuestSession();
        toast.success("User created successfully!! Verify your email to continue.", {id: loading})
        router.push(`/verify-email?email=${encodeURIComponent(value.email.toLowerCase())}`);
       } catch (error) {
        console.error("Error during sign-up:", error);
        setFormError("An unexpected error occurred. Please try again.");
       } finally {
        toast.dismiss(loading);
       }

      
    }
  })
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={(e)=> {
          e.preventDefault()
          form.handleSubmit()
        }}>
         <FieldGroup>
            {formError && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {formError}
              </p>
            )}
            <form.Field 
              name="name"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return(
                  <Field data-invalid= {isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input 
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=> {
                      if (formError) setFormError("")
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field 
              name="email"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return(
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input 
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=> {
                      if (formError) setFormError("")
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Email Address"
                    />
                    {
                      isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )
                    }
                  </Field>
                )
              }}
            />
            <form.Field 
              name="password"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return(
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input 
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=> {
                      if (formError) setFormError("")
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Password"
                    />
                    {
                      isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )
                    }
                  </Field>
                )
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
                form="signup-form"
                className="w-full"
                disabled={isSubmitting || isGoogleLoading}
              >
                {isSubmitting ? "Creating account..." : "Register"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={()=> handleGoogleLogin()}
                className="mt-3 w-full"
                disabled={isSubmitting || isGoogleLoading}
              >
                {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
                {!isGoogleLoading && <IconBrandGoogle className="inline"/>}
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
            </>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  )
}
