import { getPlatformStatsAction } from "@/action/platform-stats.action";
import { PlatformStats } from "@/types/platform-stats.type";
import { PlatformStatsSectionClient } from "./PlatformStatsSectionClient";

const defaultStats: PlatformStats = {
  students: 0,
  tutors: 0,
  slots: 0,
  subjects: 0,
};

export default async function PlatformStatsSection() {
  const result = await getPlatformStatsAction();
  const stats = result?.data ?? defaultStats;

  return <PlatformStatsSectionClient stats={stats} />;
}
