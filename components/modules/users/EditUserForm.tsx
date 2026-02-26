import { updateUserAction } from "@/action/admin.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { USER_ROLES } from "@/constants";
import { authClient } from "@/lib/auth-client";
import { IUser } from "@/types/user.type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.email("Invalid email address"),
  image: z.url("Image must be a valid URL"),
  status: z.enum(
    ["ACTIVE", "INACTIVE", "BANNED"],
    "Status must be one of ACTIVE, INACTIVE, or BANNED",
  ),
  role: z.enum(USER_ROLES, "Role must be one of TUTOR, STUDENT, or ADMIN"),
  isAssociate: z.boolean(),
});

export default function EditUserForm({
  initialValues,
  userId,
  role,
  open,
  onClose,
}: {
  initialValues: IUser;
  userId: string;
  role: USER_ROLES;
  open: boolean;
  onClose: () => void;
}) {
  const form = useForm({
    defaultValues: {
      name: initialValues.name,
      email: initialValues.email,
      role: initialValues.role,
      status: initialValues.status,
      isAssociate: initialValues.isAssociate,
      image: initialValues.image ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const loading = toast.loading("Please wait");

      const { data, error, message } = await updateUserAction(
        initialValues.id,
        value,
      );

      if (error) {
        toast.error(error.message, { id: loading });
        return;
      }
      toast.success("User updated successfully!!", { id: loading });
        form.reset();
        onClose?.();
    },
  });

  {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Enter your information below to update the user details
          </DialogDescription>
        </DialogHeader>
        <div>
          <form
            id="edit-user-form"
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
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Name"
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
                        placeholder="Email Address"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="image"
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
                name="role"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel>Role</FieldLabel>

                      <Select
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(value as USER_ROLES)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={field.state.value} />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="STUDENT">Student</SelectItem>
                          <SelectItem value="TUTOR">Tutor</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="status"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel>Status</FieldLabel>

                      <Select
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(
                            value as "ACTIVE" | "INACTIVE" | "BANNED",
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={field.state.value} />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="ACTIVE">🟢 Active</SelectItem>
                          <SelectItem value="INACTIVE">🟡 Inactive</SelectItem>
                          <SelectItem value="BANNED">🔴 Banned</SelectItem>
                        </SelectContent>
                      </Select>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="isAssociate"
                children={(field) => {
                  return (
                    <Field className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-1">
                        <FieldLabel className="mb-0">Associate User</FieldLabel>
                        <p className="text-sm text-muted-foreground">
                          Enable if this user is an associate member
                        </p>
                      </div>

                      <Switch
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(checked)
                        }
                      />
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </div>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="edit-user-form" 
            className="w-full sm:w-auto"
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
}
