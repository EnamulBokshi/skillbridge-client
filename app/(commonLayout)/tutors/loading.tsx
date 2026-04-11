import { Skeleton } from "@/components/ui/skeleton";

export default function TutorsLoading() {
  return (
    <div className="min-h-screen space-y-8 px-4 py-8 md:px-6">
      <div className="container mx-auto space-y-4">
        <div className="rounded-3xl border p-6 md:p-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-3 h-10 w-3/4" />
          <Skeleton className="mt-3 h-5 w-2/3" />

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-2xl border p-4 space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
