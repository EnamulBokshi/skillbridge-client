"use client";

import { getCategoriesAction } from "@/action/category.action";
import { createSubjectAction } from "@/action/subject.action";
import { Loading } from "@/components/common/Loading";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/category.type";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  creditHours: z.number().min(1, "Credit hours must be at least 1"),
  categoryId: z.string().min(1, "Category ID is required"),
  description: z.string().min(1, "Description is required"),
    slug: z.string().min(1, "Slug is required"),
});
export function SubjectForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm({
    defaultValues: {
      name: "",
      creditHours: 0,
      categoryId: "",
      description: "",
      slug: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Please wait");
      try {
        const slug = value.name.toLowerCase().replace(/\s+/g, "-");
        value = { ...value, slug };
        const { data, error } = await createSubjectAction(value);

        if (error) {
          toast.error(error.message, { id: loading });
          return;
        }
        toast.success("Subject created successfully!!", { id: loading });
        redirect("/");
      } catch (error) {
        toast.error("Someting went wrong!!", { id: loading });
      }
    },
  });

  const slugify = (name: string) => {
    setSlug(
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
    );
    // return name.toLowerCase().replace(/\s+/g, "-");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await getCategoriesAction();
      if (error) {
        toast.error(error.message || "Failed to fetch categories");
        return;
      }
      const categoriesData: Category[] = data["data"];
      setCategories(categoriesData || []);
    } catch (error) {
      toast.error("Something went wrong while fetching categories");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Loading
        title="Loading Subject Form"
        description="Loading subject form..."
        sections={4}
        showFooter={true}
        {...props}
      />
    );
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create a subject</CardTitle>
        <CardDescription>
          Enter the information below to create a subject
        </CardDescription>
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
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        slugify(e.target.value);
                      }}
                      placeholder="e.g., Mathematics, Physics, Web Engineering"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field 
            name="slug"
            children={(field) => {
                return (
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={slug}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        slugify(e.target.value);
                      }}
                      placeholder="subject-slug"
                    />
                );
            }}
            />

            
            <form.Field
              name="creditHours"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Credit Hours</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      min={1}
                      max={10}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="Credit Hours"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Category section */}

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold"> Category</h3>

              <div className="w-full">
                <form.Field
                  name="categoryId"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Select your expertise area *
                        </FieldLabel>
                        <Select
                          onValueChange={(value) => field.handleChange(value)}
                        >
                          <SelectTrigger className="w-45">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id as string}
                              >
                                {category.name.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
            </div>

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
          Create Subject
        </Button>
      </CardFooter>
    </Card>
  );
}
