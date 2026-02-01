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
import { env } from "@/env"
import { authClient } from "@/lib/auth-client"
import { IconBrandGoogle } from "@tabler/icons-react"
import {useForm} from "@tanstack/react-form"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1,"This field is required"),
  email: z.email(),
  password: z.string().min(8, "At least 8 character required!!")
})
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const handleGoogleLogin = async ()=> {
    
    try {
      const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_APP_URL
    });
    
    if(data) {
      toast.success("Google sign-up successful!!");
      // redirect("/");
      redirect("/");
    }
    
      
    } catch (error) {
      console.log("Google sign-up error:", error);
      toast.error("Google sign-up failed. Please try again.");
    }
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
      
        const {data, error} = await authClient.signUp.email(value)

        if(error){
          toast.error(error.message, {id: loading})
          return;
        }
        toast.success("User created successfully!!", {id: loading})
        redirect("/");

      
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
                    onChange={(e)=>field.handleChange(e.target.value)}
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
                    onChange={(e)=>field.handleChange(e.target.value)}
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
                    onChange={(e)=>field.handleChange(e.target.value)}
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
        <Button type="submit" form="signup-form" className="w-full">Register</Button>
        <Button variant="outline" type="button" onClick={()=> handleGoogleLogin()} className="w-full mt-3" > Continue with Google <IconBrandGoogle className="inline"/></Button>
      </CardFooter>
    </Card>
  )
}
