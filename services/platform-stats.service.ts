import { env } from "@/env";
import { TResponse } from "@/types";
import { PlatformStats } from "@/types/platform-stats.type";

const platformStatsService = {
  getPlatformStats: async (): Promise<TResponse<PlatformStats>> => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 300, tags: ["platform-stats"] },
      });

      return (await response.json()) as TResponse<PlatformStats>;
    } catch (error: any) {
      console.error("Error fetching platform stats:", error);
      return {
        data: null,
        error: { message: error?.message || "Failed to fetch platform stats" },
      };
    }
  },
};

export default platformStatsService;
