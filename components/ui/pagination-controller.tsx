"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

export function PaginationController({
  pagination,
}: {
  pagination: PaginationType;
}) {
  const { page, limit, totalPages, totalRecords } = pagination;
  const currentPage = Number(page);
  const pages = Number(totalPages);
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`?${params.toString()}`);
  };

  const handleNavigation = (nextPage: number) => {
    if (nextPage < 1 || nextPage > pages) return;
    updateParams({ page: nextPage.toString() });
  };

  const handleLimitChange = (value: string) => {
    updateParams({
      limit: value,
      page: "1", // reset page when limit changes
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      {/* Rows per page */}
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Items per page</FieldLabel>
        <Select value={String(limit)} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {/* Pagination */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handleNavigation(currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          <PaginationItem className="px-2 text-sm text-muted-foreground">
            Page {currentPage} of {totalPages} ({totalRecords} records)
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => handleNavigation(currentPage + 1)}
              aria-disabled={currentPage === pages}
              className={
                currentPage === pages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
