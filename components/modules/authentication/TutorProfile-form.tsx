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
import {useForm} from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { useState } from "react"
import { tutorService } from "@/services/tutor.service"
import { createTutorAction } from "@/action/turor.action"

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required!"),
  lastName:  z.string().min(1, "Last Name is required!"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  categoryId: z.string().min(1, "Category is required!"),
  userId: z.string().min(1, "User ID is required!"),
  phone: z.string().length(11, 'Phone number must be 11 digit'),
  email: z.email(),
  address: z.string(),
  zip: z.string().length(4, 'Zip code must be 4 digits'),
  experienceYears: z.number().min(0, "Experience years must be 0 or greater").max(50, "Experience years seems too high"),
  cv: z.string(),
  expertiseAreas: z.array(z.string()).min(1, "At least one expertise area is required"),
})
export function TutorProfileForm({ ...props }: React.ComponentProps<typeof Card>) {

  const [expertiseInput, setExpertiseInput] = useState("")
 
  const form = useForm({
    defaultValues:{
        firstName: "",
        lastName: "",
        bio: "",
        categoryId: "",
        userId: "",
        phone: "",
        address: "",
        email: "",
        zip: "",
        experienceYears: 0,
        cv: "",
        expertiseAreas: [] as string[],
       
    },
    validators:{
      onSubmit: formSchema,
    },
    onSubmit: async({value} )=>{
      const loading = toast.loading("Profile creation in progress...")
      try {
        console.log("Form data to send:", value)
        // TODO: Send data to server
        // const response = await fetch('/api/tutor/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(value),
        // })
        const {data, error} = await createTutorAction(value)
        console.log("Server response:", data, error)
        if(error) {
          toast.error('', {id: loading})
          return;
        }
        if (!data.ok) throw new Error('Failed to create profile');

        
        toast.success("Profile created successfully!!", {id: loading})

      } catch (error) {
        toast.error("Something went wrong!!", {id: loading})
      }
    }
  })
  return (
    <Card {...props}>
      <CardHeader className="p-4 ">
        <CardTitle>Tutor Profile</CardTitle>
        <CardDescription>
          Enter your information below to create your tutor profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="tutorProfile-form" onSubmit={(e)=> {
          e.preventDefault()
          form.handleSubmit()
        }}>
         <FieldGroup>
            
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field 
                  name="firstName"
                  children={(field)=> {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return(
                      <Field>
                        <FieldLabel htmlFor={field.name}>First Name *</FieldLabel>
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
                        <FieldLabel htmlFor={field.name}>Last Name *</FieldLabel>
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
              </div>

              <form.Field 
                name="bio"
                children={(field)=> {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return(
                    <Field>
                      <FieldLabel htmlFor={field.name}>Bio *</FieldLabel>
                      <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e)=>field.handleChange(e.target.value)}
                      placeholder="Tell us about yourself, your teaching philosophy, and experience..."
                      rows={4}
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
            </div>

            {/* User & Category Information Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Account & Category</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field 
                  name="userId"
                  children={(field)=> {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return(
                      <Field>
                        <FieldLabel htmlFor={field.name}>User ID *</FieldLabel>
                        <Input 
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e)=>field.handleChange(e.target.value)}
                        placeholder="Your unique user ID"
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
                  name="categoryId"
                  children={(field)=> {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return(
                      <Field>
                        <FieldLabel htmlFor={field.name}>Category ID *</FieldLabel>
                        <Input 
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e)=>field.handleChange(e.target.value)}
                        placeholder="Teaching category"
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
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input 
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e)=>field.handleChange(e.target.value)}
                        placeholder="your.email@example.com"
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
              </div>

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
                      placeholder="Your full address"
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
                      <FieldLabel htmlFor={field.name}>Zip Code (Postal Code)</FieldLabel>
                      <Input 
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="e.g., 1234"
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
            </div>

            {/* Professional Information Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Professional Information</h3>
              
              <form.Field 
                name="experienceYears"
                children={(field)=> {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return(
                    <Field>
                      <FieldLabel htmlFor={field.name}>Years of Experience *</FieldLabel>
                      <Input 
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e)=>field.handleChange(Number(e.target.value))}
                      min="0"
                      max="50"
                      placeholder="e.g., 5"
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
                name="cv"
                children={(field)=> {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return(
                    <Field>
                      <FieldLabel htmlFor={field.name}>CV / Resume URL</FieldLabel>
                      <Input 
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e)=>field.handleChange(e.target.value)}
                      placeholder="https://example.com/cv.pdf"
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
                name="expertiseAreas"
                children={(field)=> {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return(
                    <Field>
                      <FieldLabel htmlFor={field.name}>Expertise Areas *</FieldLabel>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input 
                          type="text"
                          value={expertiseInput}
                          onChange={(e)=>setExpertiseInput(e.target.value)}
                          placeholder="e.g., Mathematics, Physics, Chemistry"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              if (expertiseInput.trim()) {
                                field.handleChange([...field.state.value, expertiseInput.trim()])
                                setExpertiseInput("")
                              }
                            }
                          }}
                          />
                          <Button 
                            type="button"
                            onClick={() => {
                              if (expertiseInput.trim()) {
                                field.handleChange([...field.state.value, expertiseInput.trim()])
                                setExpertiseInput("")
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        {field.state.value.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {field.state.value.map((area, index) => (
                              <div 
                                key={index} 
                                className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full text-sm"
                              >
                                <span>{area}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    field.handleChange(
                                      field.state.value.filter((_, i) => i !== index)
                                    )
                                  }}
                                  className="text-red-500 hover:text-red-700 font-bold ml-1"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {
                        isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )
                      }
                    </Field>
                  )
                }}
              />
            </div>

         </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" form="tutorProfile-form" className="w-full">Create Tutor Profile</Button>
        
      </CardFooter>
    </Card>
  )
}
