import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminDashboardStats } from "@/types/admin-dashboard.type";
import { Users, BookOpen, DollarSign, Star, CalendarCheck } from "lucide-react";

export function AdminStatsCards({ stats }: { stats: AdminDashboardStats }) {
  const cards = [
    {
      title: "Total Users",
      value: stats.users.total,
      sub: `${stats.users.active} active`,
      icon: Users,
    },
    {
      title: "Total Bookings",
      value: stats.bookings.total,
      sub: `${stats.bookings.completed} completed`,
      icon: CalendarCheck,
    },
    {
      title: "Revenue",
      value: `$${stats.revenue.total.toFixed(2)}`,
      sub: `Last 30 days: $${stats.revenue.lastThirtyDays.toFixed(2)}`,
      icon: DollarSign,
    },
    {
      title: "Slots",
      value: stats.slots.total,
      sub: `${stats.slots.available} available`,
      icon: BookOpen,
    },
    {
      title: "Avg Rating",
      value: stats.reviews.averageRating.toFixed(1),
      sub: `${stats.reviews.total} reviews`,
      icon: Star,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
