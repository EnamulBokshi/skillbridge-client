"use client";

import { createStudentAction } from "@/action/student.action";
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
import { useForm } from "@tanstack/react-form";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required!"),
  lastName: z.string().min(1, "Last Name is required!"),
  phone: z.string().length(11, "Phone number must be 11 digit"),
  email: z.email("Invalid Email Address"),
  profilePicture: z
    .string()
    .trim()
    .refine(
      (v) => !v || z.url().safeParse(v).success,
      "Profile picture must be a valid URL",
    )
    .transform((url) =>
      url === ""
        ? "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        : url,
    ),
  address: z.string().min(5, "Address is required"),
  zip: z.string().length(4, "Zip code must be 4 digits"),
});
export function StudentProfileForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      profilePicture: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      email: "",
      zip: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Profile creation in progress...");

      const { data, error } = await createStudentAction(value);

      if (error) {
        toast.error("Something went wrong!", { id: loading });
        return;
      }

      if (data) {
        toast.success("Profile created successfully!!", { id: loading });
        form.reset();
        redirect("/");
      }
    },
  });
  return (
    <Card {...props}>
      <CardHeader className="p-4 ">
        <CardTitle>Student Profile</CardTitle>
        <CardDescription>
          Enter your information below to create your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="studentProfile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="firstName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>First Name *</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="e.g., Rahim, Karim, Ahmed"
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
              name="lastName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Last Name *</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="e.g., Bokshi, Sardar, Chawdhuri"
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
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Phone *</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="e.g., 018xxxxxxxx"
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
                    <FieldLabel htmlFor={field.name}>Email *</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="e.g., example@example.com"
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
              name="address"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Address *</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="1234 Main St"
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
              name="zip"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Zip Code (postal code) *
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="e.g. 1207"
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
              name="profilePicture"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Profile Picture URL{" "}
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your profile picture URL"
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
      <CardFooter className="flex justify-end">
        <Button type="submit" form="studentProfile-form" className="w-full">
          Create Student Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
