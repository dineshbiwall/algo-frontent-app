import apiClient from "@/api-client/client";
import { getQueryKey } from "@/lib/react-query";
import { type ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { UserPlan } from "../../types/entities/user-plan.entity";

export const useKiteUrlQuery = () => {
  const queryKey = getQueryKey("KITE_URL");

  const fetchKiteUrl = async () => {
    const { data } = await apiClient.get(`api/v1/user/kite`).json<
      ApiResponse<{
        loginUrl: string;
        hasTokens: boolean;
        configAdded: boolean;
        plan: UserPlan | null;
      }>
    >();

    return data;
  };

  return useQuery({
    queryKey: [queryKey],
    queryFn: fetchKiteUrl,
  });
};
