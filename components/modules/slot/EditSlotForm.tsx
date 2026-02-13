"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { getSubjectsAction } from "@/action/subject.action";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Loading } from "@/components/common/Loading";
import { IUpdateSlotPayload } from "@/types/slot.type";
import { updateSlotAction } from "@/action/tutor.action";
import {
  convertToISODateTime,
  formatDateForInput,
  formatTimeForInput,
} from "@/helper/dateFormatter";

//  zod schema
const today = new Date();
const todayISO = today.toISOString().split("T")[0];

const SlotSchema = z
  .object({
    subjectId: z.string().min(1, "Subject is required"),
    date: z
      .string()
      .min(1, "Date is required")
      .refine((d) => d >= todayISO, "Date cannot be in the past"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    slotPrice: z.number().min(0, "Price must be positive"),
    isFree: z.boolean(),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

// --------------------
// Types
// --------------------
type Subject = {
  id: string;
  name: string;
};

type EditSlotFormProps = {
  slotId: string;
  initialValues: IUpdateSlotPayload;
  tutorId: string;
  role: "TUTOR" | "STUDENT" | "ADMIN" | "VISITOR";
  onClose?: () => void;
};

// --------------------
export function EditSlotForm({
  slotId,
  initialValues,
  tutorId,
  role,
  onClose,

}: EditSlotFormProps) {
  const [subjects, setSubjects] = React.useState<Subject[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch subjects for the select dropdown
  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await getSubjectsAction();
      if (error) {
        toast.error("Failed to load subjects");
        setIsLoading(false);
        return;
      }
      setSubjects(data);
      setIsLoading(false);
    };
    fetchSubjects();
  }, []);

  const form = useForm({
    defaultValues: {
      subjectId: initialValues.subjectId || "",
      date: formatDateForInput(initialValues.date),
      startTime: formatTimeForInput(initialValues.startTime),
      endTime: formatTimeForInput(initialValues.endTime),
      slotPrice: initialValues.slotPrice || 0,
      isFree: initialValues.isFree || false,
    },
    validators: {
      onChange: SlotSchema,
      // onSubmit: createSlotSchema, --- IGNORE ---
    },
    onSubmit: async ({ value }) => {
      const loadingToast = toast.loading("Creating slot...");
      try {
        const dateISO =
          convertToISODateTime(value.date, value.startTime).split("T")[0] +
          "T00:00:00.000Z";
        const startTimeISO = convertToISODateTime(value.date, value.startTime);
        const endTimeISO = convertToISODateTime(value.date, value.endTime);

        const payload = {
          tutorId: tutorId,
          subjectId: value.subjectId,
          date: dateISO,
          startTime: startTimeISO,
          endTime: endTimeISO,
          slotPrice: value.slotPrice,
          isBooked: false,
          isFree: value.slotPrice === 0 ? true : false,
        };

        // console.log("CREATE SLOT", payload);

        const { data, error, message } = await updateSlotAction(
          slotId,
          payload,
        );
        if (error) {
          toast.error(message || "Failed to create slot. Please try again.", {
            id: loadingToast,
          });
          return;
        }
        toast.success("Slot created successfully!", { id: loadingToast });
        toast.dismiss(loadingToast);
        // console.log("Slot created:", data);
        // Reset form
        form.reset();
        onClose && onClose();

      } catch (error) {
        console.error("Failed to create slot:", error);
        toast.error("Failed to create slot. Please try again.", {
          id: loadingToast,
        });
      }
    },
  });

  if (isLoading) {
    return (
      <Loading
        title="Loading form"
        description="Please wait while we prepare the slot creation form."
        sections={4}
        showFooter={false}
      />
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Slot</CardTitle>
        <CardDescription>
          Define your availability, subject, and pricing for this session slot
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Subject */}
          <form.Field name="subjectId">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Subject *</FieldLabel>
                <FieldGroup>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue
                        placeholder={
                          subjects?.filter(
                            (sub) => sub.id === field.state.value,
                          )[0]?.name || "Select a subject"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects?.map((subject: Subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          {/* Date */}
          <form.Field name="date">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Date *</FieldLabel>
                <FieldGroup>
                  <Input
                    id={field.name}
                    type="date"
                    min={todayISO}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </FieldGroup>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          {/* Time Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="startTime">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Start Time *</FieldLabel>
                  <FieldGroup>
                    <Input
                      id={field.name}
                      type="time"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </FieldGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="endTime">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>End Time *</FieldLabel>
                  <FieldGroup>
                    <Input
                      id={field.name}
                      type="time"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </FieldGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </div>

          {/* Price */}
          <form.Field name="slotPrice">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Slot Price (৳) *</FieldLabel>
                <CardDescription>
                  Set the price for the slot. Set 0 for a free slot.
                </CardDescription>
                <FieldGroup>
                  <Input
                    id={field.name}
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </FieldGroup>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <CardFooter className="px-0">
            <Button
              type="submit"
              className="w-full"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting ? "Updating..." : "Update Slot"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
