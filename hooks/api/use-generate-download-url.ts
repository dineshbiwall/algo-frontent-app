import apiClient from "@/api-client/client";
import { ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useGenerateDownloadUrl = (key?: string | null) => {
  return useQuery({
    queryKey: ["generate-download-url", key],
    queryFn: async () => {
      if (!key) throw new Error("Missing key");
      const res = await apiClient
        .get(`api/v1/utils/generate-download-url`, { searchParams: { key } })
        .json<ApiResponse<string>>();
      return res.data;
    },
    enabled: !!key,
    staleTime: 1000 * 60 * 5,
  });
};
