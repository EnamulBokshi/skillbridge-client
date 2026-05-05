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

const DEMO_ROLE_CREDENTIALS = {
  admin: {
    email: "enam.admin@skillbridge.com",
    password: "admin1234",
  },
  student: {
    email: "enamulbokshi@gmail.com",
    password: "enamulbokshi",
  },
  tutor: {
    email: "haque22205101946@diu.edu.bd",
    password: "haque22205101946",
  },
} as const

type DemoRole = keyof typeof DEMO_ROLE_CREDENTIALS

const formSchema = z.object({
  name: z.string().min(1,"This field is required"),
  email: z.email(),
  password: z.string().min(8, "At least 8 character required!!")
})
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [formError, setFormError] = useState("")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [roleLoginLoading, setRoleLoginLoading] = useState<DemoRole | null>(null)

  const handleDemoRoleLogin = async (role: DemoRole) => {
    const credentials = DEMO_ROLE_CREDENTIALS[role]
    const loading = toast.loading(`Signing in as ${role}...`)

    setRoleLoginLoading(role)
    setFormError("")

    try {
      const { error } = await authClient.signIn.email(credentials)

      if (error) {
        setFormError(error.message || `Unable to login as ${role}.`)
        return
      }

      clearGuestSession()
      toast.success(`Logged in as ${role}.`, { id: loading })
      window.location.href = "/"
    } catch (error) {
      console.error(`Demo ${role} login error:`, error)
      setFormError(`Failed to login as ${role}. Please try again.`)
    } finally {
      toast.dismiss(loading)
      setRoleLoginLoading(null)
    }
  }

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
                disabled={isSubmitting || isGoogleLoading || !!roleLoginLoading}
              >
                {isSubmitting ? "Creating account..." : "Register"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={()=> handleGoogleLogin()}
                className="mt-3 w-full"
                disabled={isSubmitting || isGoogleLoading || !!roleLoginLoading}
              >
                {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
                {!isGoogleLoading && <IconBrandGoogle className="inline"/>}
              </Button>
              <div className="mt-3 space-y-2">
                <p className="text-xs text-muted-foreground">Quick demo role login</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDemoRoleLogin("admin")}
                    disabled={isSubmitting || isGoogleLoading || !!roleLoginLoading}
                  >
                    {roleLoginLoading === "admin" ? "Signing in..." : "Login as Admin"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDemoRoleLogin("tutor")}
                    disabled={isSubmitting || isGoogleLoading || !!roleLoginLoading}
                  >
                    {roleLoginLoading === "tutor" ? "Signing in..." : "Login as Tutor"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDemoRoleLogin("student")}
                    disabled={isSubmitting || isGoogleLoading || !!roleLoginLoading}
                  >
                    {roleLoginLoading === "student" ? "Signing in..." : "Login as Student"}
                  </Button>
                </div>
              </div>
              <Button
                variant="secondary"
                type="button"
                onClick={handleGuestLogin}
                className="mt-3 w-full"
                disabled={isSubmitting || isGoogleLoading || !!roleLoginLoading}
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
