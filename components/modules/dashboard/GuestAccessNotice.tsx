import Link from "next/link";
import { AlertTriangle, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GuestAccessNotice({
  title = "Guest demo mode",
  description = "This area is read-only for guests. Become a student to access real bookings, profile edits, and AI tools.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Card className="border-dashed border-primary/30 bg-linear-to-r from-primary/5 via-background to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <AlertTriangle className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/signup" className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Become a Student
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard" className="inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Back to Demo Dashboard
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}