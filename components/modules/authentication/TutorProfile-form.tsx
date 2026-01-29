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
import { Textarea } from "@/components/ui/textarea"
import { authClient } from "@/lib/auth-client"
import {useForm} from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required!"),
  lastName:  z.string().min(1, "First Name is required!"),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
  phone: z.string().length(11, 'Phone number must be 11 digit'),
  email: z.email(),
  address: z.string().min(5, 'Address is required'),
  zip: z.string().length(4, 'Zip code must be 4 digits')

})
export function TutorProfileForm({ ...props }: React.ComponentProps<typeof Card>) {

 
  const form = useForm({
    defaultValues:{
        firstName: "",
        lastName: "",
        bio: "",
        phone: "",
        address: "",
        email: "",
        zip: ""
       
    },
    validators:{
      onSubmit: formSchema,
    },
    onSubmit: async({value} )=>{
      const loading = toast.loading("Profile creation in progress...")
      try {
        // const {data, error} = await authClient.signIn.email(value);

        // if(error){
        //   toast.error(error.message, {id: loading})
        //   return;
        // }
        toast.success("Profile created successfully!!", {id: loading})

      } catch (error) {
        toast.error("Someting went wrong!!", {id: loading})
      }
    }
  })
  return (
    <Card {...props}>
      <CardHeader className="p-4 ">
        <CardTitle>Tutor Profile</CardTitle>
        <CardDescription>
          Enter your information below to create your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="tutorProfile-form" onSubmit={(e)=> {
          e.preventDefault()
          form.handleSubmit()
        }}>
         <FieldGroup>
            
            <form.Field 
              name="firstName"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return(
                  <Field>
                    <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                    <Input 
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=>field.handleChange(e.target.value)}
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
              name="lastName"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return(
                  <Field>
                    <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                    <Input 
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=>field.handleChange(e.target.value)}
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
              name="bio"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return(
                  <Field>
                    <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                    <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=>field.handleChange(e.target.value)}
                    placeholder="Put your bio here..."
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
              name="phone"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return(
                  <Field>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                    <Input 
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="018xxxxxxxx"
                    onChange={(e)=>field.handleChange(e.target.value)}
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
              name="email"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return(
                  <Field>
                    <FieldLabel htmlFor={field.name}>email</FieldLabel>
                    <Input 
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=>field.handleChange(e.target.value)}
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
              name="address"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return(
                  <Field>
                    <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                    <Input 
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=>field.handleChange(e.target.value)}
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
              name="zip"
              children={(field)=> {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return(
                  <Field>
                    <FieldLabel htmlFor={field.name}>Zip Code (postal code)</FieldLabel>
                    <Input 
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="79**"
                    onChange={(e)=>field.handleChange(e.target.value)}
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
      <CardFooter className="flex justify-end">
        <Button type="submit" form="tutorProfile-form" className="w-full">Submit</Button>
        
      </CardFooter>
    </Card>
  )
}
