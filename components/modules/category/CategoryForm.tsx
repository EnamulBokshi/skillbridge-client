"use client";

import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCategoryAction } from "@/action/category.action";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import generateSlug from "@/helper/generateSlug";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  slug: z.string().min(1, "Slug is required"),
});

interface CategoryFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function CategoryForm({ onSuccess, className }: CategoryFormProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Creating category...");
      try {
        const { data, error } = await createCategoryAction(value);

        if (error) {
          toast.error(error.message || "Failed to create category", {
            id: loading,
          });
          return;
        }

        toast.success("Category created successfully!", { id: loading });
        form.reset();
        onSuccess?.();
      } catch (error) {
        toast.error("Something went wrong!", { id: loading });
        console.error(error);
      }
    },
  });

  return (
    <div className={cn("space-y-5", className)}>
      <form
        id="category-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    placeholder="e.g., Web Development"
                    value={field.state.value}
                    onChange={(e) => {
                      const name = e.target.value;
                      field.handleChange(name);
                      const slug = generateSlug(name);
                      form.setFieldValue("slug", slug);
                    }}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="slug"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                  <CardDescription>
                    The slug is auto-generated from the category name and
                    cannot be edited
                  </CardDescription>

                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    placeholder="e.g., web-development"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    readOnly
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="description"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Description *</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Brief description about the subject"
                    rows={4}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>

      <Button type="submit" form="category-form" className="w-full">
        Create Category
      </Button>
    </div>
  );
}
