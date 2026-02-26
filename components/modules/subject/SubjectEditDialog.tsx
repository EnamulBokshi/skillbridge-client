"use client";

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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { OSubject, SubjectWithCategory } from "@/types/subject.type";
import { Category } from "@/types/category.type";
import { useState, useEffect } from "react";
import generateSlug from "@/helper/generateSlug";
import { getCategoriesAction } from "@/action/category.action";

const formSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  description: z.string().min(1, "Description is required"),
  slug: z.string().min(1, "Slug is required"),
  creditHours: z.number().min(1, "Credit hours must be at least 1"),
  categoryId: z.string().min(1, "Category is required"),
});

interface SubjectEditDialogProps {
  subject: SubjectWithCategory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (subject: OSubject) => Promise<void>;
}

export function SubjectEditDialog({
  subject,
  open,
  onOpenChange,
  onUpdate,
}: SubjectEditDialogProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<OSubject | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const form = useForm({
    defaultValues: {
      name: subject?.name || "",
      description: subject?.description || "",
      slug: subject?.slug || "",
      creditHours: subject?.creditHours || 1,
      categoryId: subject?.category.id || "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // Store the pending values and show confirmation dialog
      setPendingValues({ ...subject, ...value, category: categories.find(cat => cat.id === value.categoryId) } as OSubject);
      setShowConfirmDialog(true);
    },
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const { data, error } = await getCategoriesAction();
        if (!error && data?.data) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  // Update form values when subject changes
  useEffect(() => {
    if (subject) {
      form.setFieldValue("name", subject.name);
      form.setFieldValue("description", subject.description);
      form.setFieldValue("slug", subject.slug);
      form.setFieldValue("creditHours", subject.creditHours);
      form.setFieldValue("categoryId", subject.category.id);
    }
  }, [subject]);

  const handleConfirmUpdate = async () => {
    if (!pendingValues) return;

    const loading = toast.loading("Updating subject...");
    try {
      await onUpdate(pendingValues);
      toast.success("Subject updated successfully!", { id: loading });
      setShowConfirmDialog(false);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to update subject", { id: loading });
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>
              Make changes to the subject. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form
            id="subject-edit-form"
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
                      <FieldLabel htmlFor={field.name}>
                        Subject Name
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        placeholder="e.g., Mathematics, Web Development"
                        value={field.state.value}
                        onChange={(e) => {
                          const name = e.target.value;
                          field.handleChange(name);
                          const slug = generateSlug(name);
                          form.setFieldValue("slug", slug);
                        }}
                        onBlur={field.handleBlur}
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
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        placeholder="e.g., mathematics"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        readOnly
                        className="bg-muted"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="categoryId"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                        disabled={isLoadingCategories}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id as string}
                            >
                              {category.name}
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

              <form.Field
                name="creditHours"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Credit Hours
                      </FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        min={1}
                        max={10}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        onBlur={field.handleBlur}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
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
                      <FieldLabel htmlFor={field.name}>
                        Description
                      </FieldLabel>
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" form="subject-edit-form">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update this subject? This will affect all
              related content and enrollments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmUpdate}>
              Confirm Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
