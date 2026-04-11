import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Bot, CalendarClock } from "lucide-react";

const demoStats = [
  { label: "Demo Sessions", value: 12 },
  { label: "Upcoming Demos", value: 3 },
  { label: "Completed Demos", value: 9 },
];

const demoBookings = [
  {
    tutor: "Sarah Khan",
    subject: "Mathematics",
    status: "UPCOMING",
    time: "Today · 04:00 PM",
  },
  {
    tutor: "Arian Paul",
    subject: "Physics",
    status: "COMPLETED",
    time: "Yesterday · 02:30 PM",
  },
  {
    tutor: "Maya Rahman",
    subject: "Programming",
    status: "CANCELLED",
    time: "2 days ago",
  },
];

export default function GuestDashboard() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-linear-to-r from-primary/10 via-background to-secondary/10 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="w-fit gap-2 px-3 py-1">
              <Lock className="h-3.5 w-3.5" />
              Guest Demo Mode
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, Guest User 👋
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Explore the dashboard with sample data. Real bookings, profile
              edits, and AI actions are disabled until you become a student.
            </p>
          </div>

          <Button asChild className="w-fit">
            <Link href="/signup">Become a Student</Link>
          </Button>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Demo Stats</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demoStats.map((stat) => (
            <Card key={stat.label} className="transition hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card className="border border-border bg-linear-to-r from-primary/10 via-background to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Bot className="h-5 w-5 text-primary" />
              AI Assistant Preview
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Demo-only access. Upgrade to a student account to ask real
              questions and get personalized suggestions.
            </p>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>
              Guest demo only
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Sample Bookings</h2>
        </div>

        <div className="space-y-4">
          {demoBookings.map((booking) => (
            <Card key={`${booking.tutor}-${booking.time}`} className="border transition hover:shadow-md">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Session with <span className="text-primary">{booking.tutor}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">{booking.subject}</p>
                  </div>

                  <Badge variant="outline" className="capitalize">
                    {booking.status.toLowerCase()}
                  </Badge>
                </div>

                <div className="border-t" />

                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground">When</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Access</p>
                    <p className="font-medium">Available in student accounts only</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Want to do real operations?</h3>
            <p className="text-sm text-muted-foreground">
              Create a student account to book sessions, manage your profile,
              and use platform tools for real.
            </p>
          </div>
          <Button asChild>
            <Link href="/signup">Upgrade to Student</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}