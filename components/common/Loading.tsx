import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  title?: string;
  description?: string;
  sections?: number;
  showFooter?: boolean;
  className?: string;
}

export function Loading({
  title = "Loading",
  description = "Please wait while we load the content...",
  sections = 4,
  showFooter = true,
  className = "",
}: LoadingProps) {
  return (
    <Card className={className}>
      <CardHeader className="p-4">
        <Skeleton className="h-7 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Array.from({ length: sections }).map((_, sectionIdx) => (
            <div key={sectionIdx} className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, fieldIdx) => (
                  <div key={fieldIdx} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {showFooter && (
        <CardFooter className="flex justify-end">
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      )}
    </Card>
  );
}
