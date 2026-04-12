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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useEffect, useState } from "react";
import { createTutorAction } from "@/action/tutor.action";
import { writeTutorBioAiAction } from "@/action/ai.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/category.type";
import { getCategoriesAction } from "@/action/category.action";
import { redirect } from "next/navigation";
import { Loading } from "@/components/common/Loading";

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required!"),
  lastName: z.string().min(1, "Last Name is required!"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  categoryId: z.string().min(1, "Category is required!"),
  phone: z.string().length(11, "Phone number must be 11 digit"),
  profilePicture: z
    .string()
    .trim()
    .refine(
      (v) => !v || z.url().safeParse(v).success,
      "Profile picture must be a valid URL or leave it empty",
    ),
  email: z.email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  zip: z.string().length(4, "Zip code must be 4 digits"),
  experienceYears: z
    .number()
    .min(0, "Experience years must be 0 or greater")
    .max(50, "Experience years seems too high"),
  cv: z
    .string()
    .trim()
    .refine(
      (v) => !v || z.url().safeParse(v).success,
      "CV must be a valid URL or leave it empty",
    ),
  expertiseAreas: z
    .array(z.string())
    .min(1, "At least one expertise area is required"),
});
export function TutorProfileForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expertiseInput, setExpertiseInput] = useState("");
  const [isBioPending, setIsBioPending] = useState(false);

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

  const handleGenerateBio = async () => {
    const values = form.state.values;
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const category = categories.find((item) => item.id === values.categoryId);

    if (!firstName || !lastName || !values.categoryId || !values.expertiseAreas.length) {
      toast.error(
        "Fill the name, expertise area, and category fields above before generating a bio.",
      );
      return;
    }

    const loading = toast.loading("Generating tutor bio...");
    setIsBioPending(true);

    try {
      const { data, error, message } = await writeTutorBioAiAction({
        firstName,
        lastName,
        experienceYears: values.experienceYears,
        expertiseAreas: values.expertiseAreas,
        categories: category ? [category.name] : undefined,
      });

      if (error || !data) {
        toast.error(error?.message || message || "Failed to generate tutor bio.", {
          id: loading,
        });
        return;
      }

      form.setFieldValue("bio", data.bio || "");
      toast.success("Tutor bio generated successfully.", { id: loading });
    } finally {
      setIsBioPending(false);
    }
  };

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      categoryId: "",
      phone: "",
      address: "",
      email: "",
      zip: "",
      profilePicture: "",
      experienceYears: 0,
      cv: "",
      expertiseAreas: [] as string[],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Profile creation in progress...");
    
        const { data, error } = await createTutorAction(value);
        // console.log("Server response:", data, error);

        if (error) {
          console.error("Error creating tutor profile:", error);
          toast.error(error.message || "Something went wrong!!", {
            id: loading,
          });
          return;
        }

        if (data) {
          toast.success("Profile created successfully!!", { id: loading });
          localStorage.setItem("tutor",JSON.stringify(data))
          redirect("/dashboard");
          
        }
      
    },
  });
  const canGenerateBio = Boolean(
    form.state.values.firstName.trim() &&
      form.state.values.lastName.trim() &&
      form.state.values.categoryId &&
      form.state.values.expertiseAreas.length,
  );
  if (isLoading) {
    return (
      <Loading
        title="Tutor Profile"
        description="Loading tutor profile form..."
        sections={4}
        showFooter={true}
        {...props}
      />
    );
  }
  return (
    <Card {...props}>
      <CardHeader className="p-4 ">
        <CardTitle>Tutor Profile</CardTitle>
        <CardDescription>
          Enter your information below to create your tutor profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="tutorProfile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Personal Information Section */}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="firstName"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          First Name *
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g., John, Enamul"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="lastName"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Last Name *
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g., Doe, Rahman"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

            </div>

            {/* User & Category Information Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Account & Category</h3>

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

            {/* Contact Information Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="phone"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          placeholder="018xxxxxxxx"
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          type="email"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="your.email@example.com"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="address"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Your full address"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="zip"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Zip Code (Postal Code)
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="e.g., 1234"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>

            {/* Professional Information Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">
                Professional Information
              </h3>

              <form.Field
                name="experienceYears"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Years of Experience *
                      </FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        min="0"
                        max="50"
                        placeholder="e.g., 5"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="cv"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        CV / Resume URL
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://example.com/cv.pdf"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="profilePicture"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Profile Picture URL
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://example.com/profile.jpg"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="expertiseAreas"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Expertise Areas *
                      </FieldLabel>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={expertiseInput}
                            onChange={(e) => setExpertiseInput(e.target.value)}
                            placeholder="e.g., Mathematics, Physics, Chemistry"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (expertiseInput.trim()) {
                                  field.handleChange([
                                    ...field.state.value,
                                    expertiseInput.trim(),
                                  ]);
                                  setExpertiseInput("");
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              if (expertiseInput.trim()) {
                                field.handleChange([
                                  ...field.state.value,
                                  expertiseInput.trim(),
                                ]);
                                setExpertiseInput("");
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
                                className="flex items-center gap-1 bg-secondary/15 border border-secondary/30 px-3 py-1 rounded-full text-sm"
                              >
                                <span>{area}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    field.handleChange(
                                      field.state.value.filter(
                                        (_, i) => i !== index,
                                      ),
                                    );
                                  }}
                                  className="text-accent hover:text-accent/80 font-bold ml-1"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <div className="space-y-3 rounded-lg border border-dashed border-border/70 bg-muted/20 p-4">
                <div className="space-y-1">
                  <h4 className="text-base font-semibold">AI Bio Assistant</h4>
                  <p className="text-sm text-muted-foreground">
                    After filling the fields above, generate a tutor bio draft and place it in the bio field.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleGenerateBio}
                  disabled={isBioPending || !canGenerateBio}
                  title={!canGenerateBio ? "Fill the required fields above first." : undefined}
                >
                  {isBioPending ? "Writing bio..." : "Write bio using AI"}
                </Button>

                <form.Field
                  name="bio"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Bio *</FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Tell us about yourself, your teaching philosophy, and experience..."
                          rows={4}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" form="tutorProfile-form" className="w-full">
          Create Tutor Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
