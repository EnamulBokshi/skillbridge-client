"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { CategoryForm } from "@/components/modules/category/CategoryForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CategoryCreateDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-lg">
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-160 border-white/15 bg-background/70 p-6 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Add a new skill category to your platform.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
