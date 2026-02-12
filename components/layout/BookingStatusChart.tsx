'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminDashboardStats } from "@/types/admin-dashboard.type";

export function BookingsStatusChart({
  stats,
}: {
  stats: AdminDashboardStats;
}) {
  const data = [
    { name: "Completed", value: stats.bookings.completed },
    { name: "Pending", value: stats.bookings.pending },
    { name: "Cancelled", value: stats.bookings.cancelled },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings by Status</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
