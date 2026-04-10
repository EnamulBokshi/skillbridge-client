"use server";

import platformStatsService from "@/services/platform-stats.service";

export const getPlatformStatsAction = async () => {
  const result = await platformStatsService.getPlatformStats();
  return result;
};
