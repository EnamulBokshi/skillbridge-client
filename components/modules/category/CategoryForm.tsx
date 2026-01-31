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
import { createCategoryAction } from "@/action/category.action"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
//   slotPrice: z.coerce.number().min(0, "Slot price must be a positive number"),
    slotPrice: z.string().refine((val) => {
    const numberVal = parseFloat(val);
    return !isNaN(numberVal) && numberVal >= 0;
  }, {
    message: "Slot price must be a positive number",
  }),
})

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function CategoryForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      slotPrice: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Creating category...")
      try {
        const slug = generateSlug(value.name)
        const categoryData = {
          name: value.name,
          slug: slug,
          slotPrice: Number(value.slotPrice),
        }

        const { data, error } = await createCategoryAction(categoryData)

        if (error) {
          toast.error(error.message || "Failed to create category", {
            id: loading,
          })
          return
        }

        toast.success("Category created successfully!", { id: loading })
        form.reset()
      } catch (error) {
        toast.error("Something went wrong!", { id: loading })
        console.error(error)
      }
    },
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
        <CardDescription>
          Add a new skill category to your platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Category Name
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      placeholder="e.g., Web Development"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="slotPrice"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Slot Price
                    </FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="category-form" className="w-full">
          Create Category
        </Button>
      </CardFooter>
    </Card>
  )
}
