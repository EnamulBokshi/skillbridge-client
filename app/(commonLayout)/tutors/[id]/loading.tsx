import { Skeleton } from "@/components/ui/skeleton";

export default function TutorDetailsLoading() {
  return (
    <div className="min-h-screen px-4 py-8 md:px-6 md:py-10">
      <div className="container mx-auto space-y-6">
        <div className="rounded-3xl border p-4 md:p-6">
          <Skeleton className="h-72 w-full rounded-2xl" />
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border p-4 space-y-3">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-4/6" />
            </div>

            <div className="rounded-2xl border p-4 space-y-3">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border p-4 space-y-3">
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>

            <div className="rounded-2xl border p-4 space-y-2">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-36 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
