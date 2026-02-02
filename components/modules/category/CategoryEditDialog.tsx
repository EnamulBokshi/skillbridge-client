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
import { Switch } from "@/components/ui/switch";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { Category } from "@/types/category.type";
import { useState, useEffect } from "react";
import generateSlug from "@/helper/generateSlug";
import { updateCategoryAction } from "@/action/category.action";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  slug: z.string().min(1, "Slug is required"),
});

interface CategoryEditDialogProps {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (category: Category) => Promise<void>;
}

export function CategoryEditDialog({
  category,
  open,
  onOpenChange,
  onUpdate,
}: CategoryEditDialogProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<Category | null>(null);

  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      slug: category?.slug || "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // Store the pending values and show confirmation dialog
      setPendingValues({ ...category, ...value } as Category);
      setShowConfirmDialog(true);
    },
  });

  // Update form values when category changes
  useEffect(() => {
    if (category) {
      form.setFieldValue("name", category.name);
      form.setFieldValue("description", category.description);
      form.setFieldValue("slug", category.slug);
    }
  }, [category]);

//   const handleConfirmUpdate = async () => {
//     if (!pendingValues) return;

//     const loading = toast.loading("Updating category...");
//     try {
//       await onUpdate(pendingValues);
//       toast.success("Category updated successfully!", { id: loading });
//       setShowConfirmDialog(false);
//       onOpenChange(false);
//       form.reset();
//     } catch (error) {
//       toast.error("Failed to update category", { id: loading });
//       console.error(error);
//     }
//   };
    const handleConfirmUpdate = async () => {
    if (!pendingValues) return;
    const loading = toast.loading("Updating category...");
    try {
        const {data, error} = await updateCategoryAction(pendingValues);
        if(error){
            toast.error(error.message || "Failed to update category", { id: loading });
        } else {
            toast.success("Category updated successfully!", { id: loading });
            setShowConfirmDialog(false);
            onOpenChange(false);
            form.reset();
        }
    }
    catch(error){
        console.error("Failed to update category: ",error);
        toast.error("Failed to update category", { id: loading });
    }
    }
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to the category. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form
            id="category-edit-form"
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
                        Category Name
                      </FieldLabel>
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
                        placeholder="e.g., web-development"
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

              {/* <form.Field 
                name="isActive"
                children={(field) => {
                  return (
                    <Field>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                          <div className="text-sm text-muted-foreground">
                            {field.state.value ? "Category is active" : "Category is inactive"}
                          </div>
                        </div>
                        <Switch
                          id={field.name}
                          checked={field.state.value}
                          onCheckedChange={field.handleChange}
                        />
                      </div>
                    </Field>
                  );
                }}
              /> */}

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
                        placeholder="Brief description about the category"
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
            <Button type="submit" form="category-edit-form">
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
              Are you sure you want to update this category? This will affect all
              related subjects and content.
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
